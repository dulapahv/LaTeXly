'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { MathJax } from 'better-react-mathjax';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { SymbolsGroup } from '@/types/symbols';
import { insertToEditor } from '@/lib/utils';

interface SymbolSearchProps {
  symbolsGroups: SymbolsGroup[];
}

export function SymbolSearch({ symbolsGroups }: SymbolSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSelect = (symbol: { val: string; caretPos?: number }) => {
    insertToEditor(symbol.val, true, symbol.caretPos);
    setOpen(false);
  };

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return symbolsGroups
      .map((group) => ({
        ...group,
        symbols: group.symbols.filter(
          (s) => s.name.toLowerCase().includes(q) || s.val.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.symbols.length > 0);
  }, [query, symbolsGroups]);

  return (
    <>
      <Button
        id="symbol-search-trigger"
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex-1 justify-start text-muted-foreground sm:flex-none sm:w-52"
      >
        <Search className="mr-2 size-4" />
        Search symbols...
      </Button>

      <CommandDialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setQuery(''); }}>
        <CommandInput
          placeholder="Type to search symbols..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.trim() && filteredGroups.length === 0 && (
            <CommandEmpty>No symbols found.</CommandEmpty>
          )}
          {!query.trim() && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Start typing to search symbols...
            </div>
          )}
          {filteredGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.symbols.map((symbol) => (
                <CommandItem
                  key={`${group.title}-${symbol.val}`}
                  value={`${symbol.name} ${symbol.val}`}
                  onSelect={() => handleSelect(symbol)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <MathJax inline dynamic>
                      {`\\(${symbol.lbl}\\)`}
                    </MathJax>
                    <span className="text-sm text-muted-foreground">
                      {symbol.name}
                    </span>
                  </div>
                  <code className="text-xs text-muted-foreground">
                    {symbol.val}
                  </code>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
