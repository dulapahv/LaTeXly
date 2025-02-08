import { KeyboardEvent } from 'react';

import { BRACKET_PAIRS } from '@/lib/constants/pattern';
import { insertToEditor } from '@/utils/insert-to-editor';

interface ProcessPatternProps {
  keyboardEvent: KeyboardEvent<HTMLElement>;
  equation: string;
}

export function processPattern({
  keyboardEvent: e,
  equation,
}: ProcessPatternProps) {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (!editor) return;

  const textBeforeCaret = equation.substring(0, editor.selectionStart);

  if (e.key === '{') {
    // \begin{ -> \begin{} \end{} - the last 'else' will handle the closing bracket for the first bracket
    const pattern1 = textBeforeCaret.endsWith('\\begin');
    if (pattern1) {
      insertToEditor(` \\end{}`, false);
    }

    // \frac{ -> \frac{}{} - the last 'else' will handle the closing bracket for the first bracket
    const pattern2 = textBeforeCaret.endsWith('\\frac');
    if (pattern2) {
      insertToEditor(`{}`, false);
    }
  }

  if (Object.keys(BRACKET_PAIRS).includes(e.key)) {
    // \left( -> \left( \right)
    const pattern3 = textBeforeCaret.endsWith('\\left');
    if (pattern3) {
      insertToEditor(` \\right${BRACKET_PAIRS[e.key]}`, false);
    } else {
      // (), [], {}
      insertToEditor(
        e.key === '(' ? ')' : e.key === '[' ? ']' : e.key === '{' ? '}' : '',
        false,
      );
    }
  }
}
