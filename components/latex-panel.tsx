import { useRef } from "react";
import { LaTeXDisplay } from "./latex-display";

export function LaTeXPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={panelRef}
      className="flex h-full w-full items-center justify-center overflow-auto"
    >
      <LaTeXDisplay />
    </div>
  );
}

const SCALE = 2;
const PADDING = 40;

function extractSvg(): { svgElement: SVGSVGElement; svgString: string } {
  const container = document.getElementById("equation-render-element");
  if (!container) throw new Error("Element not found");

  const svgElement = container.querySelector("svg");
  if (!svgElement) throw new Error("No SVG found");

  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  const bbox = svgElement.getBoundingClientRect();
  clone.setAttribute("width", `${bbox.width}px`);
  clone.setAttribute("height", `${bbox.height}px`);
  clone.removeAttribute("style");

  return { svgElement, svgString: new XMLSerializer().serializeToString(clone) };
}

function svgToCanvas(
  svgString: string,
  svgWidth: number,
  svgHeight: number,
  bgColor: string,
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas context unavailable"));
      return;
    }

    const width = svgWidth * SCALE + PADDING * 2;
    const height = svgHeight * SCALE + PADDING * 2;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, PADDING, PADDING, svgWidth * SCALE, svgHeight * SCALE);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG image"));
    };

    img.src = url;
  });
}

function getColors() {
  const isDark = document.documentElement.classList.contains("dark");
  return {
    bg: isDark ? "#0a0a0a" : "#ffffff",
    fg: isDark ? "#e6edf3" : "#1f2328",
  };
}

function styledSvgString(svgString: string, fgColor: string): string {
  return svgString.replace(/currentColor/g, fgColor);
}

function getDimensions(svgElement: SVGSVGElement) {
  const bbox = svgElement.getBoundingClientRect();
  return { width: bbox.width, height: bbox.height };
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
}

export async function copyAsPng() {
  const { svgElement, svgString } = extractSvg();
  const { width, height } = getDimensions(svgElement);
  const { bg, fg } = getColors();
  const styled = styledSvgString(svgString, fg);

  const canvas = await svgToCanvas(styled, width, height, bg);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png"),
  );
  if (!blob) throw new Error("Blob conversion failed");

  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": blob }),
  ]);
}

export async function copyAsSvg() {
  const { svgString } = extractSvg();
  const { fg } = getColors();
  const styled = styledSvgString(svgString, fg);
  await navigator.clipboard.writeText(styled);
}

export async function downloadAsPng() {
  const { svgElement, svgString } = extractSvg();
  const { width, height } = getDimensions(svgElement);
  const styled = styledSvgString(svgString, "#1f2328");

  const canvas = await svgToCanvas(styled, width, height, "#ffffff");
  const dataUrl = canvas.toDataURL("image/png");
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  downloadBlob(blob, `latex-equation-${Date.now()}.png`);
}

export async function downloadAsSvg() {
  const { svgString } = extractSvg();
  const styled = styledSvgString(svgString, "#1f2328");
  const blob = new Blob([styled], { type: "image/svg+xml;charset=utf-8" });
  downloadBlob(blob, `latex-equation-${Date.now()}.svg`);
}
