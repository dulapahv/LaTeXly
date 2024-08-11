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
		// equation,
		download: () =>
			html2canvas(equationRef.current).then((canvas) => {
				const el = document.createElement("a");
				el.href = canvas.toDataURL("image/png");
				el.target = "_blank";
				el.download = "latex-equation.png";
				el.click();
				el.remove();
			}),
		copyToClipboard: () =>
			navigator.clipboard.write([
				new ClipboardItem({
					"image/png": new Promise((resolve, reject) => {
						if (!equationRef.current) return reject();

						return html2canvas(equationRef.current).then((canvas) =>
							new Promise<Blob>((res1, rej1) =>
								canvas.toBlob((b) => {
									if (b) res1(b);
									else rej1();
								}, "image/png"),
							).then((blob) => {
								console.log(blob);
								resolve(blob);
							}),
						);
					}),
				}),
			]),
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
