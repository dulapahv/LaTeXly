"use client";

import { MathJaxContext } from "better-react-mathjax";

const EXTENSIONS = [
  "ams",
  "amscd",
  "bbox",
  "boldsymbol",
  "braket",
  "cancel",
  "color",
  "colortbl",
  "enclose",
  "extpfeil",
  "html",
  "mathtools",
  "mhchem",
  "newcommand",
  "noerrors",
  "noundefined",
  "physics",
  "textmacros",
  "unicode",
];

const config = {
  loader: {
    load: EXTENSIONS.map((ext) => `[tex]/${ext}`),
  },
  tex: {
    packages: { "[+]": EXTENSIONS },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"],
  },
  startup: {
    typeset: false,
  },
  svg: {
    scale: 1,
    displayAlign: "center",
    displayIndent: "0",
  },
};

export function MathJaxProvider({ children }: { children: React.ReactNode }) {
  return (
    <MathJaxContext config={config} version={3} src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
      {children}
    </MathJaxContext>
  );
}
