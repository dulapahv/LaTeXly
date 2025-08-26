// src/components/tool-panel.tsx - FIXED
'use client';

import { memo, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDownRight } from 'lucide-react';
import { MathJax } from 'better-react-mathjax';
import { cn } from '@/lib/utils';
import { insertToEditor } from '@/lib/utils';
import { SymbolsGroup } from '@/types/symbols';
import { ThemeToggle } from './theme-toggle';
import { UndoRedo } from './undo-redo';
import * as allSymbols from '@/lib/constants/latex';

// Lazy load the search component
const SymbolSearch = lazy(() => import('./symbol-search').then(m => ({ default: m.SymbolSearch })));

// Memoized Symbol Button with MathJax
const SymbolButton = memo(function SymbolButton({
  name,
  lbl,
  val,
  caretPos = val.length,
  isBlkMath = false,
  sqBtn = true,
}: {
  name: string;
  lbl: string;
  val: string;
  caretPos?: number;
  isBlkMath?: boolean;
  sqBtn?: boolean;
}) {
  const handleClick = useCallback(() => {
    insertToEditor(val, true, caretPos);
  }, [val, caretPos]);

  // Format the math expression for MathJax
  // Use the lbl prop to display the symbol, not the global equation
  const mathContent = isBlkMath ? `\\[${lbl}\\]` : `\\(${lbl}\\)`;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className={cn(
            'rounded text-base transition-none overflow-hidden',
            sqBtn ? 'h-9 w-9 p-0' : 'h-auto px-2 py-1 text-sm',
          )}
          size={sqBtn ? 'icon' : 'sm'}
          variant="ghost"
          aria-label={name}
        >
          <MathJax 
            inline={!isBlkMath} 
            dynamic 
            hideUntilTypeset="first"
            style={{ fontSize: sqBtn ? '0.875rem' : '0.75rem' }}
          >
            {mathContent}
          </MathJax>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="z-50">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xs">{name}</span>
          <code className="text-xs opacity-75">{val}</code>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});

// Optimized Symbol Group with better hover handling
const SymbolGroup = memo(function SymbolGroup({ 
  title, 
  symbols, 
  dispLen, 
  sqBtn, 
  shouldDisplayOverflow 
}: {
  title: string;
  symbols: any[];
  dispLen: number;
  sqBtn: boolean;
  shouldDisplayOverflow: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use pointer events for better performance
  const handleMouseEnter = useCallback(() => {
    if (shouldDisplayOverflow) {
      setIsExpanded(true);
    }
  }, [shouldDisplayOverflow]);
  
  const handleMouseLeave = useCallback(() => {
    setIsExpanded(false);
  }, []);

  // Pre-calculate grid styles
  const gridStyle = useMemo(() => ({
    gridTemplateColumns: `repeat(${dispLen}, minmax(0, 1fr))`,
  }), [dispLen]);

  // Split symbols for better rendering
  const visibleSymbols = useMemo(() => symbols.slice(0, dispLen), [symbols, dispLen]);
  const overflowSymbols = useMemo(() => symbols.slice(dispLen), [symbols, dispLen]);

  return (
    <div
      className={cn(
        'group relative size-fit rounded border border-border bg-card',
        shouldDisplayOverflow && 'hover:shadow-lg hover:z-10',
        isExpanded && 'shadow-lg z-10'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid" style={gridStyle}>
        {visibleSymbols.map((symbol, index) => (
          <SymbolButton 
            key={`${symbol.val}-${index}`} 
            sqBtn={sqBtn} 
            {...symbol} 
          />
        ))}
      </div>
      
      {shouldDisplayOverflow && isExpanded && (
        <div
          className="absolute left-0 right-0 top-full z-20 grid rounded-b border-b border-x border-border bg-card shadow-lg"
          style={gridStyle}
        >
          {overflowSymbols.map((symbol, index) => (
            <SymbolButton 
              key={`${symbol.val}-overflow-${index}`} 
              sqBtn={sqBtn} 
              {...symbol} 
            />
          ))}
        </div>
      )}
      
      <p className="relative flex w-full justify-center text-[11px] text-muted-foreground p-1">
        {title}
        {shouldDisplayOverflow && (
          <ArrowDownRight size={12} className="absolute bottom-0.5 right-0.5" />
        )}
      </p>
    </div>
  );
});

export function ToolPanel() {
  // Memoize symbol groups to prevent re-creation
  const symbolsGroups = useMemo(() => {
    const { 
      accents, arrows, common_symbols, delimiters, environments,
      layout, lettersAndUnicode, logicAndSetTheory, macros,
      operators, relations, specialNotation, styleColorSizeAndFont,
      symbolsAndPunctuation 
    } = allSymbols;
    
    return [
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
  }, []);

  const allSymbolsGroups = useMemo(() => 
    [allSymbols.common_symbols, ...symbolsGroups] as SymbolsGroup[],
    [symbolsGroups]
  );

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-wrap content-start gap-1 p-2">
        <div className="flex w-full items-center justify-between gap-2 border-b border-border pb-2 mb-2">
          <div className="flex items-center gap-1">
            <UndoRedo />
            <ThemeToggle />
          </div>
          <Suspense fallback={
            <Button variant="outline" className="w-52" disabled>
              Loading search...
            </Button>
          }>
            <SymbolSearch symbolsGroups={symbolsGroups} />
          </Suspense>
        </div>
        
        {allSymbolsGroups.map((symbolsGroup) => {
          const { title, symbols, dispLen = 5, sqBtn = true } = symbolsGroup;
          const shouldDisplayOverflow = symbols.length > dispLen;

          return (
            <SymbolGroup
              key={title}
              title={title}
              symbols={symbols}
              dispLen={dispLen}
              sqBtn={sqBtn}
              shouldDisplayOverflow={shouldDisplayOverflow}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}