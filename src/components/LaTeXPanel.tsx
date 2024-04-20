/**
 * Shows the LaTeX equation.
 *
 * References:
 * https://katex.org/
 * https://katex.org/docs/options
 */

import { BlockMath } from 'react-katex';
import { useEditor } from '@/context';

const LaTeXPanel = () => {
  const { equation } = useEditor();

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
};

export default LaTeXPanel;
