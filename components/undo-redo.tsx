import { Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEquationStore } from "@/store/equation-store";

function focusEditor() {
  try {
    const { getMonacoEditor } = require("@/components/editor-panel") as {
      getMonacoEditor: () => unknown;
    };
    const monacoEditor = getMonacoEditor() as
      | { focus: () => void }
      | undefined;
    monacoEditor?.focus();
  } catch {
    // Monaco not available
  }
}

export function UndoRedo() {
  const { undo, redo, historyIndex, history } = useEquationStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              focusEditor();
              undo();
            }}
            size="icon"
            variant="ghost"
            aria-label="Undo"
            disabled={!canUndo}
          >
            <Undo2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              focusEditor();
              redo();
            }}
            size="icon"
            variant="ghost"
            aria-label="Redo"
            disabled={!canRedo}
          >
            <Redo2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
      </Tooltip>
    </>
  );
}
