export type Symbol = {
  name: string;
  lbl: string;
  val: string;
  caretPos?: number;
  isBlkMath?: boolean;
};

export type SymbolsGroup = {
  title: string;
  dispLen?: number;
  symbols: Symbol[];
  sqBtn?: boolean;
};
