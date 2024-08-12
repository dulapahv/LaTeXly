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

export interface LaTeXPanelRef {
  setEquation: (value: string) => void;
  download: () => Promise<void>;
  copyToClipboard: () => Promise<void>;
  // equation: string;
}

const LaTeXPanel = forwardRef<LaTeXPanelRef>((_, ref) => {
  const [equation, setEquation] = useState("");
  const equationRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setEquation,
    download: () =>
      new Promise<void>((resolve, reject) => {
        const element = equationRef.current;
        if (!element) {
          reject(new Error("Element not found"));
          return;
        }

        html2canvas(element)
          .then((canvas) => {
            const el = document.createElement("a");
            el.href = canvas.toDataURL("image/png");
            el.target = "_blank";
            el.download = "latex-equation.png";
            el.click();
            el.remove();
            resolve();
          })
          .catch(reject);
      }),
    copyToClipboard: () =>
      new Promise<void>((resolve, reject) => {
        const element = equationRef.current;
        if (!element) {
          reject(new Error("Element not found"));
          return;
        }

        html2canvas(element)
          .then((canvas) => {
            canvas.toBlob((blob) => {
              if (blob) {
                navigator.clipboard
                  .write([
                    new ClipboardItem({
                      "image/png": blob,
                    }),
                  ])
                  .then(() => resolve())
                  .catch(reject);
              } else {
                reject(new Error("Blob conversion failed"));
              }
            }, "image/png");
          })
          .catch(reject);
      }),
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

export default LaTeXPanel;
