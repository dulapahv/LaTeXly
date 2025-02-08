import { Key, ReactNode, useCallback, useMemo, useState } from 'react';

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  getKeyValue,
  Tooltip,
} from '@heroui/react';
import { ChevronsUpDown } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';

import { SymbolsGroup } from '@/types/symbols';
import { cn } from '@/utils/cn';
import { insertToEditor } from '@/utils/insert-to-editor';

interface AutocompleteMenuProps {
  title: string;
  tooltip: ReactNode | string;
  symbolsGroups: SymbolsGroup[];
  icon?: ReactNode;
  isBlkMath?: boolean;
  hideSection?: boolean;
  hideValue?: boolean;
  limit?: boolean;
}

export function AutocompleteMenu({
  title,
  tooltip,
  symbolsGroups,
  icon,
  isBlkMath = false,
  hideSection = false,
  hideValue = false,
  limit = false,
}: AutocompleteMenuProps) {
  const [search, setSearch] = useState('');

  const filteredSymbolsGroups = useMemo(() => {
    return symbolsGroups
      .map((group) => {
        const symbols = group.symbols
          .filter((symbol) =>
            symbol.name.toLowerCase().includes(search.toLowerCase()),
          )
          .slice(limit ? 0 : undefined, limit ? 5 : undefined);
        return { ...group, symbols };
      })
      .filter((group) => group.symbols.length > 0);
  }, [search, symbolsGroups]);

  const symbolMap = useMemo(() => {
    const map = new Map();
    symbolsGroups.forEach((group) => {
      group.symbols.forEach((symbol) => {
        map.set(symbol.val, symbol);
      });
    });
    return map;
  }, [symbolsGroups]);

  const handleSelectionChange = useCallback(
    (symbol: Key | null) => {
      const selectedSymbol = symbolMap.get(getKeyValue(symbol, ''));
      if (!selectedSymbol) return;
      insertToEditor(selectedSymbol.val, true, selectedSymbol.caretPos);
    },
    [symbolMap],
  );

  const headingClassNames = useMemo(
    () => ({
      heading: cn(
        'sticky top-1 z-20 w-full rounded-md bg-default-100 px-2 py-1.5 shadow-small',
        hideSection ? 'hidden' : 'flex',
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
          startContent={icon}
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
              content: 'rounded-lg',
            },
          }}
          listboxProps={{
            isVirtualized: true,
            itemClasses: {
              base: 'text-sm rounded-md',
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
                    key={symbol.val}
                    textValue={symbol.name + symbol.val}
                    value={symbol.val}
                    classNames={{
                      title: 'text-xs',
                    }}
                  >
                    {isBlkMath && symbol.isBlkMath ? (
                      <BlockMath math={symbol.lbl} />
                    ) : (
                      <InlineMath math={symbol.lbl} />
                    )}
                    {hideValue ? '' : ` - ${symbol.val}`}
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
