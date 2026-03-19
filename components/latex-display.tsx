import { useRef, useMemo } from "react";
import { MathJax } from "better-react-mathjax";
import { useEquationStore } from "@/store/equation-store";
import { useSettingsStore } from "@/store/settings-store";
import { cn } from "@/lib/utils";

interface LaTeXDisplayProps {
  className?: string;
  inline?: boolean;
}

// This component reads from the global equation store
// DO NOT use this for individual symbols!
export function LaTeXDisplay({ className, inline = false }: LaTeXDisplayProps) {
  const { equation } = useEquationStore();
  const zoom = useSettingsStore((s) => s.zoom);
  const containerRef = useRef<HTMLDivElement>(null);

  // Wrap equation in proper delimiters
  const formattedEquation = useMemo(() => {
    if (!equation) return inline ? "\\(\\)" : "\\[\\]";
    return inline ? `\\(${equation}\\)` : `\\[${equation}\\]`;
  }, [equation, inline]);

  return (
    <div
      ref={containerRef}
      id="equation-render-element"
      className={cn(
        "flex items-center justify-center px-8 py-4",
        inline && "inline-flex px-2 py-0",
        className,
      )}
      style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
    >
      <MathJax hideUntilTypeset="first" dynamic>
        {formattedEquation}
      </MathJax>
    </div>
  );
}