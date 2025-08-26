// src/components/symbol-search.tsx - CORRECTED
'use client';

import { useState } from 'react';
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
import { SymbolsGroup } from '@/types/symbols';
import { insertToEditor } from '@/lib/utils';

interface SymbolSearchProps {
  symbolsGroups: SymbolsGroup[];
}

export function SymbolSearch({ symbolsGroups }: SymbolSearchProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (symbol: any) => {
    insertToEditor(symbol.val, true, symbol.caretPos);
    setOpen(false);
  };

  return (
    <>
      <Button
        id="symbol-search-trigger"
        onClick={() => setOpen(true)}
        variant="outline"
        className="w-52 justify-start text-muted-foreground"
      >
        <Search className="mr-2 h-4 w-4" />
        Search symbols...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search symbols..." />
        <CommandList>
          <CommandEmpty>No symbols found.</CommandEmpty>
          {symbolsGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.symbols.map((symbol) => (
                <CommandItem
                  key={symbol.val}
                  value={symbol.name + ' ' + symbol.val}
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