/**
 * Text editor panel for entering LaTeX equations.
 *
 * References:
 * https://github.com/react-simple-code-editor/react-simple-code-editor
 * https://github.com/react-simple-code-editor/react-simple-code-editor/blob/main/example/App.tsx
 * https://codesandbox.io/p/sandbox/react-simple-editor-linenumbers-wy240?file=%2Fsrc%2Findex.js
 */

import Editor from 'react-simple-code-editor';
import { Grammar, highlight, languages } from 'prismjs';

import { useEditor } from '@/context';
import { sample_equations } from '@/constants';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/components/prism-latex';

const EditorPanel = () => {
  const { equation, setEquation } = useEditor();

  const hightlightWithLineNumbers = (
    text: string,
    grammar: Grammar,
    language: string
  ): string =>
    highlight(text, grammar, language)
      .split('\n')
      .map(
        (line, i) =>
          `<span style='position:absolute;left:0px;color:#cccccc;text-align:right;width:40px'>${i + 1}</span>${line}`
      )
      .join('\n');

  const getRandomEquation = () => {
    const randomIndex = new Date().getSeconds() % sample_equations.length;
    return sample_equations[randomIndex].latex;
  };

  return (
    <div className="h-full overflow-y-auto border-r-1.5">
      <Editor
        placeholder={`Enter a LaTeX equation... e.g. ${getRandomEquation()}`}
        className="min-h-full font-mono text-sm sm:text-base"
        preClassName="!pl-12 !outline-none"
        textareaClassName="!pl-12 !outline-none"
        value={equation}
        onValueChange={(code) => setEquation(code)}
        highlight={(code) =>
          hightlightWithLineNumbers(code, languages.latex!, 'latex')
        }
        padding={10}
        autoFocus
        textareaId="editor"
      />
    </div>
  );
};

export default EditorPanel;
