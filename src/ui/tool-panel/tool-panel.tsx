/**
 * List of all the symbols for users to choose from.
 *
 * References:
 * https://www.math.uci.edu/~xiangwen/pdf/LaTeX-Math-Symbols.pdf
 * https://stackoverflow.com/a/74445912/17302377
 */

import { ScrollShadow } from "@nextui-org/react";
import { ArrowDownRight, Search } from "lucide-react";

import {
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
} from "@/lib/constants/latex";
import { SymbolsGroup } from "@/types/symbols";
import { cn } from "@/utils/cn";

import { AutocompleteMenu } from "./autocomplete-menu";
import { SymbolButton } from "./symbol-button";
import { ThemeSwitch } from "./theme-switch";
import { UndoRedo } from "./undo-redo";

export function ToolPanel() {
  const symbolsGroups: SymbolsGroup[] = [
    accents.accents,
    accents.accent_functions,
    delimiters.delimiters,
    environments.matrices,
    lettersAndUnicode.uppercase_greek_letters,
    lettersAndUnicode.lowercase_greek_letters,
    lettersAndUnicode.other_letters,
    logicAndSetTheory.logic_and_set_theory,
    operators.big_operators,
    operators.binary_operators,
    operators.fractions,
    operators.binomials,
    operators.math_operators,
    relations.relations,
    relations.negated_relations,
    arrows.arrows,
    arrows.extensible_arrows,
    symbolsAndPunctuation.symbols_and_punctuation,
    specialNotation.bra_ket_notation,
    layout.annotation,
    layout.overlap,
    layout.spacing,
    layout.vertical_layout,
    styleColorSizeAndFont.math_alphabets,
    styleColorSizeAndFont.sizes,
    styleColorSizeAndFont.colors,
    styleColorSizeAndFont.colored_boxes,
    macros.macros,
  ];

  return (
    <ScrollShadow className="flex h-full flex-row flex-wrap content-start gap-1 overflow-y-scroll p-2 [overflow-anchor:none] *:border-default-200 [&>div:nth-child(-n+3)]:border-r">
      <UndoRedo />
      <ThemeSwitch />
      <AutocompleteMenu
        title="Search Symbols"
        tooltip="Type here to search"
        symbolsGroups={symbolsGroups}
        icon={<Search size={30} className="text-foreground-500" />}
        limit
      />
      {([common_symbols, ...symbolsGroups] as SymbolsGroup[]).map(
        (symbolsGroup) => {
          const { title, symbols, dispLen, sqBtn } = symbolsGroup;
          const shouldDisplayOverflow = symbols.length > dispLen!;

          return (
            <div
              key={title}
              className={cn(
                "group relative size-fit h-auto content-end rounded border-[0.5px] dark:hover:bg-default-50",
                shouldDisplayOverflow && "hover:shadow-lg",
              )}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${dispLen}, min-content)`,
                }}
              >
                {symbols.slice(0, dispLen).map((symbol) => (
                  <SymbolButton key={symbol.lbl} sqBtn={sqBtn} {...symbol} />
                ))}
              </div>
              {shouldDisplayOverflow && (
                <div
                  className="absolute z-10 hidden w-full rounded-b border-b border-default-200 bg-white shadow-lg group-hover:grid dark:bg-default-50"
                  style={{
                    gridTemplateColumns: `repeat(${dispLen}, min-content)`,
                  }}
                >
                  {symbols.slice(dispLen).map((symbol) => (
                    <SymbolButton key={symbol.lbl} sqBtn={sqBtn} {...symbol} />
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
        },
      )}
    </ScrollShadow>
  );
}
