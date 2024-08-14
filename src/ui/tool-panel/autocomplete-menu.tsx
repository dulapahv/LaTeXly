import { ReactNode } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import { ChevronsUpDown } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";

import { SymbolsGroup } from "@/types/symbols";
import { insertToEditor } from "@/utils/insert-to-editor";

interface AutocompleteMenuProps {
  title: string;
  tooltip: ReactNode | string;
  symbolsGroups: SymbolsGroup[];
}

export function AutocompleteMenu({
  title,
  tooltip,
  symbolsGroups,
}: AutocompleteMenuProps) {
  return (
    <div className="flex items-center pl-0.5 pr-1.5">
      <Tooltip
        disableAnimation
        closeDelay={0}
        className="text-xs"
        content={tooltip}
      >
        <Autocomplete
          placeholder={title}
          className="w-52"
          size="sm"
          aria-label={title}
          disableAnimation
          disableSelectorIconRotation
          selectorIcon={<ChevronsUpDown size={14} />}
          selectedKey={null}
          defaultItems={symbolsGroups}
          onSelectionChange={(symbol) => {
            const symbolValue = getKeyValue(symbol, "");
            insertToEditor(symbolValue);
          }}
          scrollShadowProps={{
            isEnabled: false,
          }}
          popoverProps={{
            classNames: {
              content: "rounded-lg",
            },
          }}
          listboxProps={{
            itemClasses: {
              base: "text-sm rounded-md",
            },
          }}
        >
          {(symbolsGroups) => {
            const { title, symbols } = symbolsGroups;

            return (
              <AutocompleteSection
                key={title}
                title={title}
                items={symbols}
                classNames={{
                  heading:
                    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-md",
                }}
              >
                {symbols.map((symbol) => (
                  <AutocompleteItem
                    key={symbol.value}
                    textValue={symbol.name}
                    value={symbol.value}
                    // classNames={{
                    //   title: 'text-xs',
                    // }}
                  >
                    {symbol.isBlockMath ? (
                      <BlockMath math={symbol.text} />
                    ) : (
                      <InlineMath math={symbol.text} />
                    )}
                  </AutocompleteItem>
                ))}
              </AutocompleteSection>
            );
          }}
        </Autocomplete>
      </Tooltip>
    </div>
  );
}
