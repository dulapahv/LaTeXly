export type SymbolsGroup = {
  title: string;
  displayLength?: number;
  symbols: {
    name: string;
    text: string;
    value: string;
    caretPosition?: number;
    isBlockMath?: boolean;
  }[];
};
