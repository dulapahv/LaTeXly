/**
 * List of all the symbols for users to choose from.
 *
 * References:
 * https://www.math.uci.edu/~xiangwen/pdf/LaTeX-Math-Symbols.pdf
 * https://stackoverflow.com/a/74445912/17302377
 */

import { ScrollShadow } from "@nextui-org/react";
import { ALargeSmall, ArrowDownRight, Pi, Type, Variable } from "lucide-react";

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
  colors,
  common_symbols,
  delimiters,
  inverse_trigonometry,
  limits,
  logarithms,
  lowercase_greek_letters,
  math_alphabets_1,
  math_alphabets_2,
  math_alphabets_3,
  math_alphabets_4,
  math_mode_accents,
  miscellaneous_symbols,
  non_mathematical_symbols,
  operators,
  sizes,
  trigonometry,
  uppercase_greek_letters,
} from "@/lib/constants/latex";
import { SymbolsGroup } from "@/types/symbols";
import { cn } from "@/utils/cn";

import { AutocompleteMenu } from "./autocomplete-menu";
import { SymbolButton } from "./symbol-button";
import { ThemeSwitch } from "./theme-switch";
import { UndoRedo } from "./undo-redo";

export function ToolPanel() {
  const symbolsGroups: SymbolsGroup[] = [
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
    colors,
  ];

  const functionsGroup: SymbolsGroup[] = [
    logarithms,
    trigonometry,
    inverse_trigonometry,
    limits,
    operators,
  ];

  const alphabetsGroup: SymbolsGroup[] = [
    math_alphabets_1,
    math_alphabets_2,
    math_alphabets_3,
    math_alphabets_4,
  ];

  const sizesGroup: SymbolsGroup[] = [sizes];

  return (
    <ScrollShadow className="flex h-full flex-row flex-wrap content-start gap-1 overflow-y-scroll p-2 *:dark:border-r-default-100 [&>*:not(:last-child)]:border-r">
      <UndoRedo />
      <ThemeSwitch />
      <AutocompleteMenu
        title="Symbol"
        tooltip="Type or select a symbol"
        symbolsGroups={symbolsGroups}
        icon={<Pi size={30} className="text-foreground-500" />}
        limit
      />
      <AutocompleteMenu
        title="Function"
        tooltip="Type or select a function"
        symbolsGroups={functionsGroup}
        icon={<Variable size={30} className="text-foreground-500" />}
      />
      <AutocompleteMenu
        title="Font"
        tooltip="Type or select a font"
        symbolsGroups={alphabetsGroup}
        icon={<Type size={30} className="text-foreground-500" />}
        hideValue
      />
      <AutocompleteMenu
        title="Size"
        tooltip="Type or select a size"
        symbolsGroups={sizesGroup}
        icon={<ALargeSmall size={30} className="text-foreground-500" />}
        hideSection
        hideValue
      />
      {[common_symbols, ...symbolsGroups].map((symbolsGroup) => {
        const { title, symbols, displayLength } = symbolsGroup;
        const shouldDisplayOverflow = symbols.length > displayLength!;
        const pinnedSymbols = symbols.slice(0, displayLength);

        return (
          <div
            key={title}
            className={cn(
              "relative size-fit",
              shouldDisplayOverflow &&
                "group hover:rounded-t-lg hover:shadow-small dark:hover:border-r-default-50 dark:hover:bg-default-50",
            )}
          >
            {pinnedSymbols.map((symbol) => (
              <SymbolButton key={symbol.text} {...symbol} />
            ))}
            {shouldDisplayOverflow && (
              <div
                className="absolute z-10 hidden rounded-b-lg border-b-1 bg-white shadow-lg group-hover:grid dark:border-b-default-50 dark:bg-default-50"
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
                <ArrowDownRight
                  size={12}
                  className="absolute bottom-0.5 right-0"
                />
              )}
            </p>
          </div>
        );
      })}
    </ScrollShadow>
  );
}
