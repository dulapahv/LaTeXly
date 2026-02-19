'use client';

import { MathJax } from 'better-react-mathjax';
import { GITHUB_REPO, LATEXLY, USERNAME, VERSION } from '@/lib/constants/constants';

export function Footer() {
  return (
    <div className="fixed bottom-0 left-1 z-10 text-xs text-muted-foreground">
      <div>
        <span>With 💕 from </span>
        <a
          href="https://github.com/dulapahv"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {USERNAME}
        </a>
      </div>
      <span>
        <MathJax inline dynamic>{`\\(${LATEXLY}\\)`}</MathJax> {VERSION} (
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        )
      </span>
    </div>
  );
}