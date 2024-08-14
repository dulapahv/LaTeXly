export function insertToEditor(
  value: string,
  moveCaret: boolean = true,
  caretPosition: number = 0,
) {
  const editor = document.getElementById("editor") as HTMLTextAreaElement;
  if (!editor) return;

  editor.focus();

  const start = editor.selectionStart;
  // const end = editor.selectionEnd;
  // const textBefore = editor.value.substring(0, start);
  // const textAfter = editor.value.substring(end, editor.value.length);
  // editor.value = textBefore + value + textAfter;

  if (moveCaret && caretPosition === 0) caretPosition = value.length;

  document.execCommand("insertText", false, value);

  editor.selectionStart = start + caretPosition;
  editor.selectionEnd = start + caretPosition;
}
