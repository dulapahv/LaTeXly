export type Symbol = {
  name: string;
  text: string;
  value: string;
  caretPosition?: number;
  isBlockMath?: boolean;
};

export type SymbolsGroup = {
  title: string;
  displayLength?: number;
  symbols: Symbol[];
  squareButton?: boolean;
};
