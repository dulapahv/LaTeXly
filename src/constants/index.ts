export { default as sample_equations } from './sample_equations.json';
export { default as common_symbols } from './common_symbols.json';
export { default as math_mode_accents } from './math_mode_accents.json';
export { default as lowercase_greek_letters } from './lowercase_greek_letters.json';
export { default as uppercase_greek_letters } from './uppercase_greek_letters.json';
export { default as binary_relations } from './binary_relations.json';
export { default as binary_operators } from './binary_operators.json';
export { default as big_operators } from './big_operators.json';
export { default as arrows } from './arrows.json';
export { default as delimiters } from './delimiters.json';
export { default as miscellaneous_symbols } from './miscellaneous_symbols.json';
export { default as non_mathematical_symbols } from './non_mathematical_symbols.json';
export { default as ams_delimiters } from './ams_delimiters.json';
export { default as ams_greek_and_hebrew } from './ams_greek_and_hebrew.json';
export { default as ams_binary_relations } from './ams_binary_relations.json';
export { default as ams_arrows } from './ams_arrows.json';
export { default as ams_negated_binary_relations_and_arrows } from './ams_negated_binary_relations_and_arrows.json';
export { default as ams_binary_operators } from './ams_binary_operators.json';
export { default as ams_miscellaneous } from './ams_miscellaneous.json';
export { default as math_alphabets } from './math_alphabets.json';
export { default as logarithms } from './functions/logarithms.json';
export { default as trigonometry } from './functions/trigonometry.json';
export { default as inverse_trigonometry } from './functions/inverse_trigonometry.json';
export { default as limits } from './functions/limits.json';
export { default as operators } from './functions/operators.json';

export interface SymbolsGroup {
  title: string;
  displayLength?: number;
  symbols: {
    name: string;
    text: string;
    value: string;
    caretPosition?: number;
    isBlockMath?: boolean;
  }[];
}
