/**
 * Text editor panel for entering LaTeX equations.
 *
 * References:
 * https://github.com/react-simple-code-editor/react-simple-code-editor
 * https://github.com/react-simple-code-editor/react-simple-code-editor/blob/main/example/App.tsx
 * https://codesandbox.io/p/sandbox/react-simple-editor-linenumbers-wy240?file=%2Fsrc%2Findex.js
 */

import { RefObject, useEffect, useState } from "react";
import { Grammar, highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";

import { latexPanelRef } from "@/ui/latex-panel";

import { processPattern } from "./process-pattern";

import "katex/dist/katex.min.css";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-latex";

interface EditorPanelProps {
  latexPanelRef: RefObject<latexPanelRef>;
}

export function EditorPanel({ latexPanelRef }: EditorPanelProps) {
  const [equation, setEquation] = useState("");

  useEffect(() => {
    latexPanelRef.current?.setEquation(equation);
  }, [equation]);

  const highlightWithLineNumbers = (
    text: string,
    grammar: Grammar,
    language: string,
  ) =>
    highlight(text, grammar, language)
      .split("\n")
      .map(
        (line, i) =>
          `<span style='position:absolute;left:0px;color:#cccccc;text-align:right;width:40px'>${i + 1}</span>${line}`,
      )
      .join("\n");

  return (
    <div className="h-full overflow-y-auto border-r-1.5">
      <Editor
        // The placeholder equation below is provided by the first contributor
        // of the project and to honor their contribution, it is kept as it is.
        placeholder="Enter a LaTeX equation... e.g. e^{i\theta} = \cos(\theta) + i\sin(\theta)"
        className="min-h-full font-mono text-sm sm:text-base"
        preClassName="!pl-12 !outline-none"
        textareaClassName="!pl-12 !outline-none"
        value={equation}
        onKeyDown={(e) => processPattern({ keyboardEvent: e, equation })}
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
