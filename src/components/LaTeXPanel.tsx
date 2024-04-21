/**
 * Shows the LaTeX equation.
 *
 * References:
 * https://katex.org/
 * https://katex.org/docs/options
 */

import { forwardRef, useImperativeHandle, useState } from 'react';

import { BlockMath } from 'react-katex';

export interface LaTeXPanelRef {
  setEquation: (value: string) => void;
  // equation: string;
}

const LaTeXPanel = forwardRef<LaTeXPanelRef>((_, ref) => {
  const [equation, setEquation] = useState('');

  useImperativeHandle(ref, () => ({
    setEquation,
    // equation,
  }));

  return (
    <div className="flex w-full flex-wrap items-center overflow-auto first:*:ml-auto last:*:mr-auto">
      <BlockMath
        renderError={(error) => (
          <span className="m-2 animate-fade-in rounded-lg bg-[hsl(var(--nextui-danger)/0.2)] px-4 py-2 text-sm">
            {error.message}
          </span>
        )}
      >
        {equation}
      </BlockMath>
    </div>
  );
});

export default LaTeXPanel;
