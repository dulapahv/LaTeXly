/**
 * Button component for inserting symbols into the editor
 *
 * References:
 * https://codepen.io/Fantantonio/pen/oNdreeB
 * https://stackoverflow.com/a/34968263/17302377
 */

import { Button, Tooltip } from '@heroui/react';
import { BlockMath, InlineMath } from 'react-katex';

import { cn } from '@/utils/cn';
import { insertToEditor } from '@/utils/insert-to-editor';

interface SymbolButtonProps {
  name: string;
  lbl: string;
  val: string;
  caretPos?: number;
  isBlkMath?: boolean;
  sqBtn?: boolean;
}

export function SymbolButton({
  name,
  lbl,
  val,
  caretPos = val.length,
  isBlkMath = false,
  sqBtn = true,
}: SymbolButtonProps) {
  return (
    <Tooltip
      disableAnimation
      closeDelay={0}
      content={
        <>
          <span className="text-xs font-semibold">{name}</span>
          <span className="text-xs">{val}</span>
        </>
      }
      className="rounded-md"
    >
      <Button
        onPress={() => insertToEditor(val, true, caretPos)}
        className={cn(
          'rounded text-base',
          !sqBtn && 'h-full px-0 py-1 text-sm',
        )}
        isIconOnly={sqBtn}
        size="sm"
        variant="light"
        aria-label={name}
      >
        {isBlkMath ? <BlockMath math={lbl} /> : <InlineMath math={lbl} />}
      </Button>
    </Tooltip>
  );
}
