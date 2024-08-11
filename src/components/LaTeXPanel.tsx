/**
 * Shows the LaTeX equation.
 *
 * References:
 * https://katex.org/
 * https://katex.org/docs/options
 */

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import html2canvas from 'html2canvas';

import { BlockMath } from 'react-katex';

export interface LaTeXPanelRef {
  setEquation: (value: string) => void;
  download: () => Promise<void>
  copyToClipboard: () => Promise<void>
  // equation: string;
}

const LaTeXPanel = forwardRef<LaTeXPanelRef>((_, ref) => {
  const [equation, setEquation] = useState('');
  const equationRef = useRef<HTMLDivElement>(null)

  const getImage = async () => {
      if (!equationRef.current) return;

      const canvas = await html2canvas(equationRef.current);
      return canvas;
  }
  
  useImperativeHandle(ref, () => ({
    setEquation,
    // equation,
    download: async () => {
      const image = await getImage();
      if (!image) return

      const el = document.createElement("a");
      el.href = image.toDataURL("image/png", 2.0);
      el.target = "_blank";
      el.download = 'latex-equation.png'
      el.click();
      el.remove();
    },
    copyToClipboard: async () => {
      const image = await getImage();
      if (!image) return

      const blob = new Promise<Blob>((resolve, reject) => image.toBlob(b => (b ? resolve(b) : reject())));

      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    }
  }));

  return (
    <div className="flex w-full flex-wrap items-center overflow-auto first:*:ml-auto last:*:mr-auto">
      <div ref={equationRef} className="flex items-center px-8 py-4">
        <BlockMath
          renderError={(error) => (
            <span className="m-2 animate-fade-in rounded-lg bg-[hsl(var(--nextui-danger)/0.2)] px-4 py-2 text-sm">
              {error.message}
            </span>
          )}
        >
          {equation}
        </BlockMath>
      </div >
    </div>
  );
});

export default LaTeXPanel;
