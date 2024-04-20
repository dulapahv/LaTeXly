/**
 * Button component for inserting symbols into the editor
 *
 * References:
 * https://stackoverflow.com/a/34968263/17302377
 */

import { BlockMath, InlineMath } from 'react-katex';

import { useEditor } from '@/context';
import { Button } from '@nextui-org/react';

interface SymBtnProps {
  text: string;
  value: string;
  caretPosition?: number;
  isBlockMath?: boolean;
}

const SymBtn = ({
  text,
  value,
  caretPosition = value.length,
  isBlockMath = false,
}: SymBtnProps) => {
  const { setEquation: setExpression } = useEditor();

  return (
    <Button
      isIconOnly
      size="sm"
      variant="light"
      aria-label={text}
      className="text-base"
      onClick={() => {
        const editor = document.getElementById('editor') as HTMLTextAreaElement;
        if (!editor) return;
        editor.focus();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const textBefore = editor.value.substring(0, start);
        const textAfter = editor.value.substring(end, editor.value.length);
        editor.value = textBefore + value + textAfter;
        setExpression(editor.value);
        editor.selectionStart = start + caretPosition;
        editor.selectionEnd = start + caretPosition;
      }}
    >
      {isBlockMath ? <BlockMath math={text} /> : <InlineMath math={text} />}
    </Button>
  );
};

export default SymBtn;
