import type { languages, editor, Position, IRange } from "monaco-editor";
import * as allSymbols from "@/lib/constants/latex";

interface SymbolEntry {
  name: string;
  lbl: string;
  val: string;
  caretPos?: number;
}

interface SymbolGroup {
  title: string;
  symbols: SymbolEntry[];
}

let cachedCompletions: languages.CompletionItem[] | undefined;

function buildCompletions(
  range: IRange,
): languages.CompletionItem[] {
  if (cachedCompletions) {
    return cachedCompletions.map((item) => ({ ...item, range }));
  }

  const items: languages.CompletionItem[] = [];
  const seen = new Set<string>();

  const {
    accents,
    arrows,
    common_symbols,
    delimiters,
    environments,
    layout,
    lettersAndUnicode,
    logicAndSetTheory,
    macros,
    operators,
    relations,
    specialNotation,
    styleColorSizeAndFont,
    symbolsAndPunctuation,
  } = allSymbols;

  const groups: SymbolGroup[] = [
    common_symbols,
    accents.accents,
    accents.accent_functions,
    arrows.arrows,
    arrows.extensible_arrows,
    delimiters.delimiters,
    environments.matrices,
    layout.annotation,
    layout.overlap,
    layout.spacing,
    layout.vertical_layout,
    lettersAndUnicode.uppercase_greek_letters,
    lettersAndUnicode.lowercase_greek_letters,
    lettersAndUnicode.other_letters,
    logicAndSetTheory.logic_and_set_theory,
    macros.macros,
    operators.big_operators,
    operators.binary_operators,
    operators.binomials,
    operators.fractions,
    operators.math_operators,
    relations.relations,
    relations.negated_relations,
    specialNotation.bra_ket_notation,
    styleColorSizeAndFont.math_alphabets,
    styleColorSizeAndFont.sizes,
    styleColorSizeAndFont.colors,
    styleColorSizeAndFont.colored_boxes,
    symbolsAndPunctuation.symbols_and_punctuation,
  ];

  for (const group of groups) {
    for (const symbol of group.symbols) {
      const val = symbol.val.trim();
      if (!val || seen.has(val)) continue;
      seen.add(val);

      // Convert empty {} pairs to snippet tab stops for cursor positioning
      let insertText = val;
      let insertTextRules: number | undefined;
      if (val.includes("{}")) {
        let tabStop = 1;
        insertText = val.replace(/\{\}/g, () => `{\${${tabStop++}}}`);
        insertTextRules = 4; // InsertAsSnippet
      }

      items.push({
        label: val,
        kind: 1,
        detail: `${symbol.name} (${group.title})`,
        insertText,
        insertTextRules,
        range,
      });
    }
  }

  // Add common snippet completions
  const snippets: Array<{
    label: string;
    detail: string;
    insertText: string;
    insertTextRules: number;
  }> = [
    {
      label: "\\begin{}...\\end{}",
      detail: "Environment block",
      insertText: "\\begin{${1:env}}\n\t$0\n\\end{${1:env}}",
      insertTextRules: 4, // InsertAsSnippet
    },
    {
      label: "\\frac{}{}",
      detail: "Fraction",
      insertText: "\\frac{${1:num}}{${2:den}}",
      insertTextRules: 4,
    },
    {
      label: "\\sqrt{}",
      detail: "Square root",
      insertText: "\\sqrt{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\sqrt[]{}",
      detail: "Nth root",
      insertText: "\\sqrt[${1:n}]{${2:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\sum_{}^{}",
      detail: "Summation",
      insertText: "\\sum_{${1:i=0}}^{${2:n}}",
      insertTextRules: 4,
    },
    {
      label: "\\int_{}^{}",
      detail: "Integral",
      insertText: "\\int_{${1:a}}^{${2:b}}",
      insertTextRules: 4,
    },
    {
      label: "\\lim_{}",
      detail: "Limit",
      insertText: "\\lim_{${1:x \\to \\infty}}",
      insertTextRules: 4,
    },
    {
      label: "\\left( \\right)",
      detail: "Left/right parentheses",
      insertText: "\\left( ${1} \\right)",
      insertTextRules: 4,
    },
    {
      label: "\\left[ \\right]",
      detail: "Left/right brackets",
      insertText: "\\left[ ${1} \\right]",
      insertTextRules: 4,
    },
    {
      label: "\\left\\{ \\right\\}",
      detail: "Left/right braces",
      insertText: "\\left\\\\{ ${1} \\right\\\\}",
      insertTextRules: 4,
    },
    {
      label: "\\binom{}{}",
      detail: "Binomial coefficient",
      insertText: "\\binom{${1:n}}{${2:k}}",
      insertTextRules: 4,
    },
    {
      label: "\\overline{}",
      detail: "Overline",
      insertText: "\\overline{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\underline{}",
      detail: "Underline",
      insertText: "\\underline{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\hat{}",
      detail: "Hat accent",
      insertText: "\\hat{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\vec{}",
      detail: "Vector accent",
      insertText: "\\vec{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\dot{}",
      detail: "Dot accent",
      insertText: "\\dot{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\ddot{}",
      detail: "Double dot accent",
      insertText: "\\ddot{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\matrix",
      detail: "Matrix environment",
      insertText:
        "\\begin{${1|pmatrix,bmatrix,vmatrix,Bmatrix,Vmatrix,matrix|}}\n\t${2:a} & ${3:b} \\\\\\\\\n\t${4:c} & ${5:d}\n\\end{${1}}",
      insertTextRules: 4,
    },
    {
      label: "\\cases",
      detail: "Cases environment",
      insertText:
        "\\begin{cases}\n\t${1:expr1} & ${2:cond1} \\\\\\\\\n\t${3:expr2} & ${4:cond2}\n\\end{cases}",
      insertTextRules: 4,
    },
    {
      label: "\\cancel{}",
      detail: "Cancel (strikethrough)",
      insertText: "\\cancel{${1:x}}",
      insertTextRules: 4,
    },
    {
      label: "\\ce{}",
      detail: "Chemical equation (mhchem)",
      insertText: "\\ce{${1:H2O}}",
      insertTextRules: 4,
    },
    {
      label: "\\bra{}",
      detail: "Bra notation (braket)",
      insertText: "\\bra{${1:\\psi}}",
      insertTextRules: 4,
    },
    {
      label: "\\ket{}",
      detail: "Ket notation (braket)",
      insertText: "\\ket{${1:\\psi}}",
      insertTextRules: 4,
    },
    {
      label: "\\braket{}{}",
      detail: "Braket notation",
      insertText: "\\braket{${1:\\phi}}{${2:\\psi}}",
      insertTextRules: 4,
    },
    {
      label: "\\color{}{}",
      detail: "Colored text",
      insertText: "{\\color{${1:red}} ${2:text}}",
      insertTextRules: 4,
    },
    {
      label: "\\boxed{}",
      detail: "Boxed expression",
      insertText: "\\boxed{${1:expr}}",
      insertTextRules: 4,
    },
    {
      label: "\\text{}",
      detail: "Text in math mode",
      insertText: "\\text{${1:text}}",
      insertTextRules: 4,
    },
    {
      label: "\\textbf{}",
      detail: "Bold text",
      insertText: "\\textbf{${1:text}}",
      insertTextRules: 4,
    },
    {
      label: "\\textit{}",
      detail: "Italic text",
      insertText: "\\textit{${1:text}}",
      insertTextRules: 4,
    },
    {
      label: "\\mathbb{}",
      detail: "Blackboard bold",
      insertText: "\\mathbb{${1:R}}",
      insertTextRules: 4,
    },
    {
      label: "\\mathcal{}",
      detail: "Calligraphic",
      insertText: "\\mathcal{${1:L}}",
      insertTextRules: 4,
    },
    {
      label: "\\mathrm{}",
      detail: "Roman (upright) math",
      insertText: "\\mathrm{${1:text}}",
      insertTextRules: 4,
    },
  ];

  for (const snippet of snippets) {
    if (seen.has(snippet.label)) continue;
    items.push({
      ...snippet,
      kind: 27, // CompletionItemKind.Snippet
      range,
    });
  }

  cachedCompletions = items;
  return items.map((item) => ({ ...item, range }));
}

export function createCompletionProvider(): languages.CompletionItemProvider {
  return {
    triggerCharacters: ["\\"],
    provideCompletionItems(
      model: editor.ITextModel,
      position: Position,
    ): languages.CompletionList {
      const word = model.getWordUntilPosition(position);
      const lineContent = model.getLineContent(position.lineNumber);

      // Find the start of the command (look back for \)
      let startColumn = word.startColumn;
      const textBefore = lineContent.substring(0, position.column - 1);
      const backslashIndex = textBefore.lastIndexOf("\\");

      if (backslashIndex >= 0) {
        startColumn = backslashIndex + 1;
      }

      const range: IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn,
        endColumn: position.column,
      };

      return {
        suggestions: buildCompletions(range),
      };
    },
  };
}
