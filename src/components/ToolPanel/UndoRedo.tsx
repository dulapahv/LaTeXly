import { Button, Tooltip } from "@nextui-org/react";
import { FaRedo, FaUndo } from "react-icons/fa";

const UndoRedo = () => {
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
          <FaUndo />
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
          <FaRedo />
        </Button>
      </Tooltip>
    </div>
  );
};

export default UndoRedo;
