import type { languages } from "monaco-editor";

export const LATEX_LANGUAGE_ID = "latex";

export const languageConfiguration: languages.LanguageConfiguration = {
  comments: {
    lineComment: "%",
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "$", close: "$" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "$", close: "$" },
  ],
};

export const monarchTokensProvider: languages.IMonarchLanguage = {
  defaultToken: "",
  tokenPostfix: ".latex",

  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
  ],

  tokenizer: {
    root: [
      // Comments
      [/%.*$/, "comment"],

      // Math delimiters
      [/\$\$/, "keyword.math"],
      [/\$/, "keyword.math"],
      [/\\\[/, "keyword.math"],
      [/\\\]/, "keyword.math"],
      [/\\\(/, "keyword.math"],
      [/\\\)/, "keyword.math"],

      // Begin/end environments
      [
        /\\(begin|end)\{/,
        { token: "keyword", next: "@environment" },
      ],

      // Commands
      [/\\[a-zA-Z@]+/, "keyword"],
      [/\\[^a-zA-Z]/, "keyword"],

      // Numbers
      [/\d+(\.\d+)?/, "number"],

      // Brackets
      [/[{}]/, "delimiter.curly"],
      [/[[\]]/, "delimiter.square"],
      [/[()]/, "delimiter.parenthesis"],

      // Operators
      [/[=+\-*/^_&|<>!~]/, "operator"],
    ],

    environment: [
      [/[a-zA-Z*]+/, "string.environment"],
      [/\}/, { token: "keyword", next: "@pop" }],
    ],
  },
};
