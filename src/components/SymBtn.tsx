/**
 * Button component for inserting symbols into the editor
 *
 * References:
 * https://codepen.io/Fantantonio/pen/oNdreeB
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
  const { setEquation } = useEditor();

  const handleInsert = (value: string) => {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    if (!editor) return;

    editor.focus();

    // Insert the symbol at the caret position
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const textBefore = editor.value.substring(0, start);
    const textAfter = editor.value.substring(end, editor.value.length);

    // Update the editor value
    editor.value = textBefore + value + textAfter;
    setEquation(editor.value);

    // Move the caret to the caretPosition
    editor.selectionStart = start + caretPosition;
    editor.selectionEnd = start + caretPosition;
  };

  return (
    <Button
      onPress={() => handleInsert(text)}
      className="text-base"
      isIconOnly
      size="sm"
      variant="light"
      aria-label={text}
    >
      {isBlockMath ? <BlockMath math={text} /> : <InlineMath math={text} />}
    </Button>
  );
};

export default SymBtn;
