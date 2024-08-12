import { Button, Tooltip } from "@nextui-org/react";
import { Redo2, Undo2 } from "lucide-react";

export function UndoRedo() {
  return (
    <div className="flex items-center pr-1.5">
      <Tooltip
        disableAnimation
        closeDelay={0}
        className="text-xs"
        content="Undo"
      >
        <Button
          onPress={() => {
            const editor = document.getElementById(
              "editor",
            ) as HTMLTextAreaElement;
            if (!editor) return;

            editor.focus();
            document.execCommand("undo");
          }}
          className="text-base"
          isIconOnly
          size="sm"
          variant="light"
          aria-label="Undo"
        >
          <Undo2 />
        </Button>
      </Tooltip>
      <Tooltip
        disableAnimation
        closeDelay={0}
        className="text-xs"
        content="Redo"
      >
        <Button
          onPress={() => {
            const editor = document.getElementById(
              "editor",
            ) as HTMLTextAreaElement;
            if (!editor) return;

            editor.focus();
            document.execCommand("redo");
          }}
          className="text-base"
          isIconOnly
          size="sm"
          variant="light"
          aria-label="Redo"
        >
          <Redo2 />
        </Button>
      </Tooltip>
    </div>
  );
}
