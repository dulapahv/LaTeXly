import type { editor } from "monaco-editor";

export const LIGHT_THEME = "latex-light";
export const DARK_THEME = "latex-dark";

export const lightTheme: editor.IStandaloneThemeData = {
  base: "vs",
  inherit: true,
  rules: [
    { token: "comment", foreground: "6a737d", fontStyle: "italic" },
    { token: "keyword", foreground: "0550ae" },
    { token: "keyword.math", foreground: "8250df" },
    { token: "string.environment", foreground: "0a3069" },
    { token: "number", foreground: "cf222e" },
    { token: "operator", foreground: "953800" },
    { token: "delimiter.curly", foreground: "0550ae" },
    { token: "delimiter.square", foreground: "0550ae" },
    { token: "delimiter.parenthesis", foreground: "0550ae" },
  ],
  colors: {
    "editor.background": "#ffffff",
    "editor.foreground": "#1f2328",
    "editor.lineHighlightBackground": "#ffffff",
    "editorLineNumber.foreground": "#8c959f",
    "editorLineNumber.activeForeground": "#1f2328",
    "editor.selectionBackground": "#0969da33",
    "editorCursor.foreground": "#1f2328",
  },
};

export const darkTheme: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "6a737d", fontStyle: "italic" },
    { token: "keyword", foreground: "79c0ff" },
    { token: "keyword.math", foreground: "d2a8ff" },
    { token: "string.environment", foreground: "a5d6ff" },
    { token: "number", foreground: "f97316" },
    { token: "operator", foreground: "f59e0b" },
    { token: "delimiter.curly", foreground: "79c0ff" },
    { token: "delimiter.square", foreground: "79c0ff" },
    { token: "delimiter.parenthesis", foreground: "79c0ff" },
  ],
  colors: {
    "editor.background": "#0a0a0a",
    "editor.foreground": "#e6edf3",
    "editor.lineHighlightBackground": "#0a0a0a",
    "editorLineNumber.foreground": "#6e7681",
    "editorLineNumber.activeForeground": "#e6edf3",
    "editor.selectionBackground": "#388bfd33",
    "editorCursor.foreground": "#e6edf3",
  },
};
