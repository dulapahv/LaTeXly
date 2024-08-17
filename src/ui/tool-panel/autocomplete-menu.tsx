import { Key, ReactNode, useCallback, useMemo, useState } from "react";
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
import { cn } from "@/utils/cn";
import { insertToEditor } from "@/utils/insert-to-editor";

interface AutocompleteMenuProps {
  title: string;
  tooltip: ReactNode | string;
  symbolsGroups: SymbolsGroup[];
  isBlockMath?: boolean;
  hideSection?: boolean;
}

export function AutocompleteMenu({
  title,
  tooltip,
  symbolsGroups,
  isBlockMath = false,
  hideSection = false,
}: AutocompleteMenuProps) {
  const [search, setSearch] = useState("");

  const filteredSymbolsGroups = useMemo(() => {
    return symbolsGroups
      .map((group) => {
        const symbols = group.symbols
          .filter((symbol) =>
            symbol.name.toLowerCase().includes(search.toLowerCase()),
          )
          .slice(0, 10);
        return { ...group, symbols };
      })
      .filter((group) => group.symbols.length > 0)
      .slice(0, 3);
  }, [search, symbolsGroups]);

  const symbolMap = useMemo(() => {
    const map = new Map();
    symbolsGroups.forEach((group) => {
      group.symbols.forEach((symbol) => {
        map.set(symbol.value, symbol);
      });
    });
    return map;
  }, [symbolsGroups]);

  const handleSelectionChange = useCallback(
    (symbol: Key | null) => {
      const selectedSymbol = symbolMap.get(getKeyValue(symbol, ""));
      if (!selectedSymbol) return;
      insertToEditor(selectedSymbol.value, true, selectedSymbol.caretPosition);
    },
    [symbolMap],
  );

  const headingClassNames = useMemo(
    () => ({
      heading: cn(
        "sticky top-1 z-20 w-full rounded-md bg-default-100 px-2 py-1.5 shadow-small",
        hideSection ? "hidden" : "flex",
      ),
    }),
    [hideSection],
  );

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
          items={filteredSymbolsGroups}
          onInputChange={setSearch}
          onSelectionChange={handleSelectionChange}
          scrollShadowProps={{
            isEnabled: false,
          }}
          popoverProps={{
            classNames: {
              content: "rounded-lg",
            },
          }}
          listboxProps={{
            isVirtualized: true,
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
                classNames={headingClassNames}
              >
                {(symbol) => (
                  <AutocompleteItem
                    key={symbol.value}
                    textValue={symbol.name + symbol.value}
                    value={symbol.value}
                    classNames={{
                      title: "text-xs",
                    }}
                  >
                    {isBlockMath && symbol.isBlockMath ? (
                      <BlockMath math={symbol.text} />
                    ) : (
                      <InlineMath math={symbol.text} />
                    )}
                  </AutocompleteItem>
                )}
              </AutocompleteSection>
            );
          }}
        </Autocomplete>
      </Tooltip>
    </div>
  );
}
