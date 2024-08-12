/**
 * Button component for inserting symbols into the editor
 *
 * References:
 * https://codepen.io/Fantantonio/pen/oNdreeB
 * https://stackoverflow.com/a/34968263/17302377
 */

import { Button, Tooltip } from "@nextui-org/react";
import { BlockMath, InlineMath } from "react-katex";

interface SymbolButtonProps {
  name: string;
  text: string;
  value: string;
  caretPosition?: number;
  isBlockMath?: boolean;
}

const SymbolButton = ({
  name,
  text,
  value,
  caretPosition = value.length,
  isBlockMath = false,
}: SymbolButtonProps) => {
  const handleInsert = (value: string) => {
    const editor = document.getElementById("editor") as HTMLTextAreaElement;
    if (!editor) return;

    editor.focus();

    // Insert the symbol at the caret position
    const start = editor.selectionStart;
    // const end = editor.selectionEnd;
    // const textBefore = editor.value.substring(0, start);
    // const textAfter = editor.value.substring(end, editor.value.length);

    // Update the editor value
    // editor.value = textBefore + value + textAfter;
    // setEquation(editor.value);

    // Add value to the browser undo/redo stack
    document.execCommand("insertText", false, value); // TODO: Change to non-deprecated method

    // Move the caret to the caretPosition
    editor.selectionStart = start + caretPosition;
    editor.selectionEnd = start + caretPosition;
  };

  return (
    <Tooltip
      disableAnimation
      closeDelay={0}
      content={
        <>
          <span className="text-xs font-semibold">{name}</span>
          <span className="text-xs">{text}</span>
        </>
      }
    >
      <Button
        onPress={() => handleInsert(value)}
        className="text-base"
        isIconOnly
        size="sm"
        variant="light"
        aria-label={text}
      >
        {isBlockMath ? <BlockMath math={text} /> : <InlineMath math={text} />}
      </Button>
    </Tooltip>
  );
};

export default SymbolButton;
