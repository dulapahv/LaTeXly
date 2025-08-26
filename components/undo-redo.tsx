"use client";

import { Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEquationStore } from "@/store/equation-store";

export function UndoRedo() {
  const { undo, redo, historyIndex, history } = useEquationStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = () => {
    const editor = document.getElementById("editor") as HTMLTextAreaElement;
    if (editor) {
      editor.focus();
      undo();
    }
  };

  const handleRedo = () => {
    const editor = document.getElementById("editor") as HTMLTextAreaElement;
    if (editor) {
      editor.focus();
      redo();
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleUndo}
            size="icon"
            variant="ghost"
            aria-label="Undo"
            disabled={!canUndo}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleRedo}
            size="icon"
            variant="ghost"
            aria-label="Redo"
            disabled={!canRedo}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
      </Tooltip>
    </>
  );
}
