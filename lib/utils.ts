import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: Parameters<T>) => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
  return debounced as T & { cancel: () => void };
}

export function insertToEditor(
  value: string,
  moveCaret: boolean = true,
  caretPos: number = 0,
) {
  try {
    const { getMonacoEditor } = require("@/components/editor-panel") as {
      getMonacoEditor: () =>
        | import("monaco-editor").editor.IStandaloneCodeEditor
        | undefined;
    };
    const monacoEditor = getMonacoEditor();
    if (monacoEditor) {
      monacoEditor.focus();
      const selection = monacoEditor.getSelection();
      if (selection) {
        const id = { major: 1, minor: 1 };
        const op = {
          identifier: id,
          range: selection,
          text: value,
          forceMoveMarkers: true,
        };
        monacoEditor.executeEdits("insertToEditor", [op]);

        if (moveCaret) {
          const model = monacoEditor.getModel();
          if (model) {
            const insertedText = value.substring(0, caretPos || value.length);
            const newPos = model.getPositionAt(
              model.getOffsetAt(selection.getStartPosition()) +
                insertedText.length,
            );
            monacoEditor.setPosition(newPos);
          }
        }
      }
      return;
    }
  } catch {
    // Monaco not available, fall through to textarea
  }

  const editor = document.getElementById("editor") as HTMLTextAreaElement;
  if (!editor) return;

  editor.focus();
  const start = editor.selectionStart;
  if (moveCaret && caretPos === 0) caretPos = value.length;
  document.execCommand("insertText", false, value);
  editor.selectionStart = start + caretPos;
  editor.selectionEnd = start + caretPos;
}
