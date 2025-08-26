// components/editor-panel.tsx
"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { useEquationStore } from "@/store/equation-store";
import { processPattern } from "@/lib/process-pattern";
import debounce from "lodash/debounce";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-latex";

const EDITOR_PLACEHOLDER = "Enter a LaTeX equation... e.g. e^{i\\theta} = \\cos(\\theta) + i\\sin(\\theta)";

export function EditorPanel() {
  const { equation, setEquation } = useEquationStore();
  const [localEquation, setLocalEquation] = useState(equation);
  const highlightCache = useRef<Map<string, string>>(new Map());

  // Debounced store update to reduce re-renders
  const debouncedSetEquation = useMemo(
    () => debounce((value: string) => {
      setEquation(value);
    }, 100),
    [setEquation]
  );

  // Memoized highlight function with caching
  const highlightWithLineNumbers = useCallback((code: string) => {
    // Check cache first
    if (highlightCache.current.has(code)) {
      return highlightCache.current.get(code)!;
    }

    // Simple line numbers without heavy processing
    const highlighted = highlight(code, languages.latex!, "latex");
    const lines = highlighted.split("\n");
    const result = lines
      .map((line, i) => {
        const lineNum = `<span style='position:absolute;left:0;color:#999;text-align:right;width:40px;user-select:none'>${i + 1}</span>`;
        return lineNum + line;
      })
      .join("\n");

    // Cache the result (limit cache size)
    if (highlightCache.current.size > 100) {
      const firstKey = highlightCache.current.keys().next().value;
      highlightCache.current.delete(firstKey);
    }
    highlightCache.current.set(code, result);

    return result;
  }, []);

  const handleValueChange = useCallback((value: string) => {
    setLocalEquation(value);
    debouncedSetEquation(value);
  }, [debouncedSetEquation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    processPattern({ keyboardEvent: e, equation: localEquation });
  }, [localEquation]);

  return (
    <div className="h-full overflow-y-auto border-r border-border">
      <Editor
        value={localEquation}
        onValueChange={handleValueChange}
        onKeyDown={handleKeyDown}
        highlight={highlightWithLineNumbers}
        padding={10}
        className="min-h-full font-mono text-sm sm:text-base"
        textareaClassName="!pl-12 !outline-none"
        preClassName="!pl-12 !outline-none"
        placeholder={EDITOR_PLACEHOLDER}
        autoFocus
        textareaId="editor"
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
        }}
      />
    </div>
  );
}