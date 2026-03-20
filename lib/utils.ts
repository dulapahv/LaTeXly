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

type MonacoEditor = import("monaco-editor").editor.IStandaloneCodeEditor;
type Monaco = typeof import("monaco-editor");

let monacoRef: Monaco | undefined;

export function registerMonaco(monaco: Monaco) {
  monacoRef = monaco;
}

function getActiveEditor(): MonacoEditor | undefined {
  if (!monacoRef) return undefined;
  const editors = monacoRef.editor.getEditors();
  return editors.find((e) => e.hasWidgetFocus()) ?? editors[0];
}

function toSnippet(value: string): string | null {
  const hasBraces = value.includes("{}");
  const hasDoubleSpace = !hasBraces && value.includes("  ");
  if (!hasBraces && !hasDoubleSpace) return null;

  let tabStop = 1;

  // Escape snippet special characters
  let snippet = value
    .replace(/\\/g, "\\\\")
    .replace(/\$/g, "\\$");

  if (hasBraces) {
    snippet = snippet.replace(/\{\}/g, () => `{\${${tabStop++}}}`);
  } else {
    snippet = snippet.replace(/  /g, () => ` \${${tabStop++}} `);
  }

  return snippet;
}

export function insertToEditor(
  value: string,
  moveCaret: boolean = true,
  caretPos: number = 0,
) {
  const monacoEditor = getActiveEditor();
  if (monacoEditor) {
    monacoEditor.focus();

    // Use snippet insertion for values with empty {} pairs
    const snippet = moveCaret ? toSnippet(value) : null;
    if (snippet) {
      const snippetController = monacoEditor.getContribution("snippetController2") as
        { insert(snippet: string): void } | null;
      if (snippetController) {
        snippetController.insert(snippet);
        return;
      }
    }

    const selection = monacoEditor.getSelection();
    if (selection) {
      const model = monacoEditor.getModel();
      const id = { major: 1, minor: 1 };
      const op = {
        identifier: id,
        range: selection,
        text: value,
        forceMoveMarkers: true,
      };

      if (moveCaret && model) {
        const startOffset = model.getOffsetAt(selection.getStartPosition());
        const targetOffset = startOffset + (caretPos || value.length);
        monacoEditor.executeEdits("insertToEditor", [op]);
        const newPos = model.getPositionAt(targetOffset);
        monacoEditor.setPosition(newPos);
      } else {
        monacoEditor.executeEdits("insertToEditor", [op]);
      }
    }
    return;
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
