import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function insertToEditor(
  value: string,
  moveCaret: boolean = true,
  caretPos: number = 0
) {
  const editor = document.getElementById("editor") as HTMLTextAreaElement;
  if (!editor) return;

  editor.focus();

  const start = editor.selectionStart;

  if (moveCaret && caretPos === 0) caretPos = value.length;

  document.execCommand("insertText", false, value);

  editor.selectionStart = start + caretPos;
  editor.selectionEnd = start + caretPos;
}
