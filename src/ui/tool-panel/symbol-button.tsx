/**
 * Button component for inserting symbols into the editor
 *
 * References:
 * https://codepen.io/Fantantonio/pen/oNdreeB
 * https://stackoverflow.com/a/34968263/17302377
 */

import { Button, Tooltip } from "@nextui-org/react";
import { BlockMath, InlineMath } from "react-katex";

import { insertToEditor } from "@/utils/insert-to-editor";

interface SymbolButtonProps {
  name: string;
  text: string;
  value: string;
  caretPosition?: number;
  isBlockMath?: boolean;
}

export function SymbolButton({
  name,
  text,
  value,
  caretPosition = value.length,
  isBlockMath = false,
}: SymbolButtonProps) {
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
      className="rounded-md"
    >
      <Button
        onPress={() => insertToEditor(value, true, caretPosition)}
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
}
