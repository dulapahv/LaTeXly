import { MathJax } from 'better-react-mathjax';

interface SymbolDisplayProps {
  math: string;
  inline?: boolean;
  className?: string;
}

// Use this component for displaying individual symbols
export function SymbolDisplay({ math, inline = true, className }: SymbolDisplayProps) {
  const content = inline ? `\\(${math}\\)` : `\\[${math}\\]`;
  
  return (
    <MathJax 
      inline={inline} 
      dynamic 
      hideUntilTypeset="first"
      className={className}
    >
      {content}
    </MathJax>
  );
}