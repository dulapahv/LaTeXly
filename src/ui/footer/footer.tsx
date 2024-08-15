import { Link } from "@nextui-org/react";
import { InlineMath } from "react-katex";

import {
  GITHUB_REPO,
  LATEXLY,
  USERNAME,
  VERSION,
} from "@/lib/constants/constants";

export function Footer() {
  return (
    <div className="fixed bottom-0 left-1 isolate text-xs">
      <div>
        <span className="text-neutral-500">With 💕 from </span>
        <Link
          href="https://github.com/dulapahv"
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-500"
        >
          {USERNAME}
        </Link>
      </div>
      <span className="text-neutral-500">
        <InlineMath>{LATEXLY}</InlineMath> {VERSION} (
        <Link
          href={GITHUB_REPO}
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-500"
        >
          GitHub
        </Link>
        )
      </span>
    </div>
  );
}
