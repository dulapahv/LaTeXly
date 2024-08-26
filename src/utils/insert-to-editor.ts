export function insertToEditor(
  value: string,
  moveCaret: boolean = true,
  caretPos: number = 0,
) {
  const editor = document.getElementById("editor") as HTMLTextAreaElement;
  if (!editor) return;

  editor.focus();

  const start = editor.selectionStart;
  // const end = editor.selectionEnd;
  // const textBefore = editor.value.substring(0, start);
  // const textAfter = editor.value.substring(end, editor.value.length);
  // editor.value = textBefore + value + textAfter;

  if (moveCaret && caretPos === 0) caretPos = value.length;

  document.execCommand("insertText", false, value);

  editor.selectionStart = start + caretPos;
  editor.selectionEnd = start + caretPos;
}
