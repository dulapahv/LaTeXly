/**
 * List of all the symbols for users to choose from.
 *
 * References:
 * https://www.math.uci.edu/~xiangwen/pdf/LaTeX-Math-Symbols.pdf
 * https://stackoverflow.com/a/77560380/17302377
 * https://stackoverflow.com/a/74445912/17302377
 * https://stackoverflow.com/a/73693601/17302377
 */

import { ScrollShadow } from '@nextui-org/react';
import { TbArrowDownRight } from 'react-icons/tb';
import {
  ams_arrows,
  ams_binary_relations,
  ams_delimiters,
  ams_greek_and_hebrew,
  arrows,
  big_operators,
  binary_operators,
  binary_relations,
  common_symbols,
  delimiters,
  lowercase_greek_letters,
  math_mode_accents,
  miscellaneous_symbols,
  non_mathematical_symbols,
  Symbols,
  uppercase_greek_letters,
} from '@/constants';

import { SymBtn } from '.';

const ToolPanel = () => {
  const allSymbols: Symbols[] = [
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
  ];

  return (
    <ScrollShadow className="flex h-full flex-row flex-wrap content-start overflow-y-scroll p-2 *:relative *:size-fit hover:[&>*:not(&_.group\/no-drawer)]:rounded-t-lg hover:[&>*:not(&_.group\/no-drawer)]:shadow-small [&>*:not(:last-child)]:border-r [&>div>div]:absolute [&>div>div]:z-10 [&>div>div]:hidden [&>div>div]:rounded-b-lg [&>div>div]:border-b-1 [&>div>div]:bg-white [&>div>div]:shadow-lg [&>div>p]:relative [&>div>p]:flex [&>div>p]:w-full [&>div>p]:justify-center [&>div>p]:[font-size:11px]">
      {allSymbols.map((symbols) => (
        <div
          key={symbols.title}
          className={
            symbols.symbols.length > symbols.displayLength
              ? 'group'
              : 'group/no-drawer'
          }
        >
          {symbols.symbols.slice(0, symbols.displayLength).map((symbol) => (
            <SymBtn key={symbol.text} {...symbol} />
          ))}
          {symbols.symbols.length > symbols.displayLength ? (
            <div
              className="group-hover:grid"
              style={{
                gridTemplateColumns: `repeat(${symbols.displayLength}, minmax(0, 1fr));`,
              }}
            >
              {symbols.symbols.slice(symbols.displayLength).map((symbol) => (
                <SymBtn key={symbol.name} {...symbol} />
              ))}
            </div>
          ) : null}
          <p>
            {symbols.title}
            {symbols.symbols.length > symbols.displayLength ? (
              <TbArrowDownRight className="absolute bottom-0.5 right-0" />
            ) : null}
          </p>
        </div>
      ))}
    </ScrollShadow>
  );
};

export default ToolPanel;
