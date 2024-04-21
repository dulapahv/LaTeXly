/**
 * List of all the symbols for users to choose from.
 *
 * References:
 * https://www.math.uci.edu/~xiangwen/pdf/LaTeX-Math-Symbols.pdf
 * https://stackoverflow.com/a/74445912/17302377
 */

import { ScrollShadow } from '@nextui-org/react';
import { TbArrowDownRight } from 'react-icons/tb';
import {
  ams_arrows,
  ams_binary_operators,
  ams_binary_relations,
  ams_delimiters,
  ams_greek_and_hebrew,
  ams_miscellaneous,
  ams_negated_binary_relations_and_arrows,
  arrows,
  big_operators,
  binary_operators,
  binary_relations,
  common_symbols,
  delimiters,
  lowercase_greek_letters,
  math_alphabets,
  math_mode_accents,
  miscellaneous_symbols,
  non_mathematical_symbols,
  SymbolsGroup,
  uppercase_greek_letters,
} from '@/constants';

import { SymbolButton } from '.';

const ToolPanel = () => {
  const symbolsGroups: SymbolsGroup[] = [
    common_symbols,
    math_mode_accents,
    lowercase_greek_letters,
    uppercase_greek_letters,
    binary_relations,
    binary_operators,
    big_operators,
    arrows,
    delimiters,
    miscellaneous_symbols,
    non_mathematical_symbols,
    ams_delimiters,
    ams_greek_and_hebrew,
    ams_binary_relations,
    ams_arrows,
    ams_negated_binary_relations_and_arrows,
    ams_binary_operators,
    ams_miscellaneous,
    math_alphabets,
  ];

  return (
    <ScrollShadow className="flex h-full flex-row flex-wrap content-start overflow-y-scroll p-2 [&>*:not(:last-child)]:border-r">
      {symbolsGroups.map((symbolsGroup) => {
        const { title, symbols, displayLength } = symbolsGroup;
        const shouldDisplayOverflow = symbols.length > displayLength;
        const pinnedSymbols = symbols.slice(0, displayLength);

        return (
          <div
            key={title}
            className={`relative size-fit ${shouldDisplayOverflow ? 'group hover:rounded-t-lg hover:shadow-small' : ''}`}
          >
            {pinnedSymbols.map((symbol) => (
              <SymbolButton key={symbol.text} {...symbol} />
            ))}
            {shouldDisplayOverflow && (
              <div
                className="absolute z-10 hidden rounded-b-lg border-b-1 bg-white shadow-lg group-hover:grid"
                style={{
                  gridTemplateColumns: `repeat(${displayLength}, minmax(0, 1fr))`,
                }}
              >
                {symbols.slice(displayLength).map((symbol) => (
                  <SymbolButton key={symbol.text} {...symbol} />
                ))}
              </div>
            )}
            <p className="relative flex w-full justify-center [font-size:11px]">
              {title}
              {shouldDisplayOverflow && (
                <TbArrowDownRight className="absolute bottom-0.5 right-0" />
              )}
            </p>
          </div>
        );
      })}
    </ScrollShadow>
  );
};

export default ToolPanel;
