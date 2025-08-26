// src/components/editor-panel.tsx
"use client";

import { useCallback, useEffect, useRef } from "react";
import { Grammar, highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import { useEquationStore } from "@/store/equation-store";
import { EDITOR_PLACEHOLDER } from "@/lib/constants/constants";
import { processPattern } from "@/lib/process-pattern";

import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-latex";

export function EditorPanel() {
  const { equation, setEquation } = useEquationStore();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const editor = document.getElementById("editor") as HTMLTextAreaElement;
    if (editor) {
      editorRef.current = editor;
    }
  }, []);

  const highlightWithLineNumbers = useCallback(
    (text: string, grammar: Grammar, language: string) =>
      highlight(text, grammar, language)
        .split("\n")
        .map(
          (line, i) =>
            `<span class='absolute left-0 text-muted-foreground text-right w-10'>${
              i + 1
            }</span>${line}`
        )
        .join("\n"),
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      processPattern({ keyboardEvent: e, equation });
    },
    [equation]
  );

  return (
    <div className="h-full overflow-y-auto bg-background">
      <Editor
        placeholder={EDITOR_PLACEHOLDER}
        className="min-h-full font-mono text-sm sm:text-base"
        preClassName="!pl-12 !outline-none"
        textareaClassName="!pl-12 !outline-none"
        value={equation}
        onKeyDown={handleKeyDown}
        onValueChange={setEquation}
        highlight={(code) =>
          highlightWithLineNumbers(code, languages.latex!, "latex")
        }
        padding={10}
        autoFocus
        textareaId="editor"
      />
    </div>
  );
}
