/**
 * Button component for inserting symbols into the editor
 *
 * References:
 * https://codepen.io/Fantantonio/pen/oNdreeB
 * https://stackoverflow.com/a/34968263/17302377
 */

import { Button, Tooltip } from "@nextui-org/react";
import { BlockMath, InlineMath } from "react-katex";

import { cn } from "@/utils/cn";
import { insertToEditor } from "@/utils/insert-to-editor";

interface SymbolButtonProps {
  name: string;
  text: string;
  value: string;
  caretPosition?: number;
  isBlockMath?: boolean;
  squareButton?: boolean;
}

export function SymbolButton({
  name,
  text,
  value,
  caretPosition = value.length,
  isBlockMath = false,
  squareButton = true,
}: SymbolButtonProps) {
  return (
    <Tooltip
      disableAnimation
      closeDelay={0}
      content={
        <>
          <span className="text-xs font-semibold">{name}</span>
          <span className="text-xs">{value}</span>
        </>
      }
      className="rounded-md"
    >
      <Button
        onPress={() => insertToEditor(value, true, caretPosition)}
        className={cn(
          "rounded text-base",
          !squareButton && "h-full px-0 py-1 text-sm",
        )}
        isIconOnly={squareButton}
        size="sm"
        variant="light"
        aria-label={name}
      >
        {isBlockMath ? <BlockMath math={text} /> : <InlineMath math={text} />}
      </Button>
    </Tooltip>
  );
}
