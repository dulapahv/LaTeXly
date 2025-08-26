'use client';

import { MathJaxContext } from 'better-react-mathjax';

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
  },
  startup: {
    typeset: false, // We'll control when to typeset
  },
  chtml: {
    scale: 1,
    displayAlign: 'center',
    displayIndent: '0',
  },
  svg: {
    scale: 1,
    displayAlign: 'center',
    displayIndent: '0',
  },
};

export function MathJaxProvider({ children }: { children: React.ReactNode }) {
  return <MathJaxContext config={config}>{children}</MathJaxContext>;
}