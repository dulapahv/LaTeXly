/**
 * Shows the LaTeX equation.
 *
 * References:
 * https://katex.org/
 * https://katex.org/docs/options
 */

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { BlockMath } from "react-katex";

export interface latexPanelRef {
  setEquation: (value: string) => void;
  download: () => Promise<void>;
  copyToClipboard: () => Promise<void>;
}

const latexPanel = forwardRef<latexPanelRef>((_, ref) => {
  const [equation, setEquation] = useState("");
  const equationRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    const element = equationRef.current;
    if (!element) {
      throw new Error("Element not found");
    }

    try {
      const canvas = await html2canvas(element);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((blob) => resolve(blob), "image/png"),
      );

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
      } else {
        throw new Error("Blob conversion failed");
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleDownload() {
    const element = equationRef.current;
    if (!element) {
      throw new Error("Element not found");
    }

    try {
      const canvas = await html2canvas(element);
      const el = document.createElement("a");
      el.href = canvas.toDataURL("image/png");
      el.target = "_blank";
      el.download = "latex-equation.png";
      el.click();
      el.remove();
    } catch (error) {
      throw error;
    }
  }

  useImperativeHandle(ref, () => ({
    setEquation,
    download: handleDownload,
    copyToClipboard: handleCopy,
  }));

  return (
    <div className="flex w-full flex-wrap items-center overflow-auto first:*:ml-auto last:*:mr-auto">
      <div
        id="equation-render-element"
        ref={equationRef}
        className="flex items-center px-8 py-4"
      >
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
    </div>
  );
});

export { latexPanel as LaTeXPanel };
