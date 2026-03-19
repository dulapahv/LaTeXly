import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDownRight } from 'lucide-react';
import { MathJax } from 'better-react-mathjax';
import { cn, insertToEditor } from '@/lib/utils';
import { SymbolsGroup } from '@/types/symbols';
import { ThemeToggle } from './theme-toggle';
import { UndoRedo } from './undo-redo';
import { SymbolSearch } from './symbol-search';
import * as allSymbols from '@/lib/constants/latex';

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

  const mathContent = isBlkMath ? `\\[${lbl}\\]` : `\\(${lbl}\\)`;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className={cn(
            'symbol-btn rounded transition-none',
            sqBtn
              ? 'size-9 p-0 overflow-hidden'
              : 'h-auto px-2 py-1.5 text-base',
          )}
          size={sqBtn ? 'icon' : 'sm'}
          variant="ghost"
          aria-label={name}
        >
          <div className={sqBtn ? 'scale-125' : ''}>
            <MathJax
              inline={!isBlkMath}
              hideUntilTypeset="first"
            >
              {mathContent}
            </MathJax>
          </div>
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
  const [overflowOpen, setOverflowOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);

  const toggleOverflow = useCallback(() => {
    setOverflowOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (!overflowOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (groupRef.current && !groupRef.current.contains(e.target as Node)) {
        setOverflowOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [overflowOpen]);

  const gridStyle = useMemo(() => ({
    gridTemplateColumns: sqBtn
      ? `repeat(${dispLen}, 2.25rem)`
      : `repeat(${dispLen}, auto)`,
  }), [dispLen, sqBtn]);

  const visibleSymbols = useMemo(() => symbols.slice(0, dispLen), [symbols, dispLen]);
  const overflowSymbols = useMemo(() => symbols.slice(dispLen), [symbols, dispLen]);

  return (
    <div
      ref={groupRef}
      className={cn(
        'relative size-fit rounded border border-border bg-card',
        overflowOpen && 'shadow-lg z-10',
      )}
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

      {shouldDisplayOverflow && (
        <div
          className={cn(
            'absolute -left-px -right-px z-20 rounded-b border-b border-x border-border bg-card shadow-lg',
            overflowOpen ? 'grid' : 'hidden',
          )}
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

      <p
        className={cn(
          'relative flex w-full justify-center text-[11px] text-muted-foreground p-1',
          shouldDisplayOverflow && 'cursor-pointer select-none hover:text-foreground',
        )}
        onClick={shouldDisplayOverflow ? toggleOverflow : undefined}
      >
        {title}
        {shouldDisplayOverflow && (
          <ArrowDownRight
            size={12}
            className={cn('absolute bottom-0.5 right-0.5 transition-transform', overflowOpen && 'rotate-90')}
          />
        )}
      </p>
    </div>
  );
});

export function ToolPanel() {
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
          <SymbolSearch symbolsGroups={symbolsGroups} />
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