/**
 * Text editor panel for entering LaTeX equations.
 *
 * References:
 * https://github.com/react-simple-code-editor/react-simple-code-editor
 * https://github.com/react-simple-code-editor/react-simple-code-editor/blob/main/example/App.tsx
 * https://codesandbox.io/p/sandbox/react-simple-editor-linenumbers-wy240?file=%2Fsrc%2Findex.js
 */

import { KeyboardEvent, RefObject, useEffect, useState } from 'react';

import Editor from 'react-simple-code-editor';
import { Grammar, highlight, languages } from 'prismjs';

import { LaTeXPanelRef } from '@/components';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/components/prism-latex';

interface EditorPanelProps {
  latexPanelRef: RefObject<LaTeXPanelRef>;
}

const bracketPairs: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '|': '|',
  '/': '/',
  '<': '>',
};

const EditorPanel = ({ latexPanelRef }: EditorPanelProps) => {
  const [equation, setEquation] = useState('');

  useEffect(() => {
    latexPanelRef.current?.setEquation(equation);
  }, [equation]);

  const insertCharacter = (char: string) => {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const textBefore = editor.value.substring(0, start);
    const textAfter = editor.value.substring(end, editor.value.length);

    editor.value = textBefore + char + textAfter;

    editor.selectionStart = start;
    editor.selectionEnd = start;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    if (!editor) return;

    const textBeforeCaret = equation.substring(0, editor.selectionStart);

    if (e.key === '{') {
      // \begin{ -> \begin{} \end{} - the last 'else' will handle the closing bracket for the first bracket
      const pattern1 = textBeforeCaret.endsWith('\\begin');
      if (pattern1) {
        insertCharacter(` \\end{}`);
      }

      // \frac{ -> \frac{}{} - the last 'else' will handle the closing bracket for the first bracket
      const pattern2 = textBeforeCaret.endsWith('\\frac');
      if (pattern2) {
        insertCharacter(`{}`);
      }
    }

    if (Object.keys(bracketPairs).includes(e.key)) {
      // \left( -> \left( \right)
      const pattern3 = textBeforeCaret.endsWith('\\left');
      if (pattern3) {
        insertCharacter(` \\right${bracketPairs[e.key]}`);
      } else {
        // (), [], {}
        insertCharacter(
          e.key === '(' ? ')' : e.key === '[' ? ']' : e.key === '{' ? '}' : ''
        );
      }
    }
  };

  const highlightWithLineNumbers = (
    text: string,
    grammar: Grammar,
    language: string
  ) =>
    highlight(text, grammar, language)
      .split('\n')
      .map(
        (line, i) =>
          `<span style='position:absolute;left:0px;color:#cccccc;text-align:right;width:40px'>${i + 1}</span>${line}`
      )
      .join('\n');

  return (
    <div className="h-full overflow-y-auto border-r-1.5">
      <Editor
        placeholder="Enter a LaTeX equation... e.g. x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
        className="min-h-full font-mono text-sm sm:text-base"
        preClassName="!pl-12 !outline-none"
        textareaClassName="!pl-12 !outline-none"
        value={equation}
        onKeyDown={onKeyDown}
        onValueChange={setEquation}
        highlight={(code) =>
          highlightWithLineNumbers(code, languages.latex!, 'latex')
        }
        padding={10}
        autoFocus
        textareaId="editor"
      />
    </div>
  );
};

export default EditorPanel;
