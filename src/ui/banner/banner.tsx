/**
 * Announcement banner (likely be removed in the future)
 */

import { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { X } from "lucide-react";
import { InlineMath } from "react-katex";

import { GITHUB_REPO, LATEXLY } from "@/lib/constants/constants";

export function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="isolate flex justify-between border-b-1 bg-yellow-100 p-0.5">
      <span aria-hidden="true"></span>
      <div className="flex items-center gap-x-3">
        <span className="text-sm text-black">
          <InlineMath>{LATEXLY}</InlineMath> is currently under development
        </span>
        <Button
          href={GITHUB_REPO}
          as={Link}
          showAnchorIcon
          isExternal
          size="sm"
          radius="full"
          className="h-6 gap-x-0.5"
        >
          GitHub
        </Button>
      </div>
      <Button
        onPress={() => setIsVisible(false)}
        isIconOnly
        size="sm"
        radius="full"
        variant="light"
        aria-label="Close"
      >
        <X size={16} className="text-base text-black" />
      </Button>
    </div>
  );
}
