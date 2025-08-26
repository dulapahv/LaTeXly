// components/action-buttons.tsx
"use client";

import { Copy, Download, Loader, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEquationStore } from "@/store/equation-store";
import { copyEquationAsImage, downloadEquationAsImage } from "./latex-panel";
import { useUrlEquation } from "@/hooks/use-url-equation";
import { useState } from "react";

export function ActionButtons() {
  const { isDownloading, isCopying, setIsDownloading, setIsCopying } =
    useEquationStore();
  const { shareEquation } = useUrlEquation();
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    setIsCopying(true);
    try {
      await copyEquationAsImage();
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadEquationAsImage();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    await shareEquation();
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleShare}
            size="icon"
            variant="outline"
            aria-label="Share equation"
          >
            {shared ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {shared ? 'Link copied!' : 'Share equation'}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            size="icon"
            variant="outline"
            aria-label="Copy LaTeX as image"
          >
            {isCopying ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy as Image</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleDownload}
            size="icon"
            variant="outline"
            aria-label="Download LaTeX as image"
          >
            {isDownloading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download as PNG</TooltipContent>
      </Tooltip>
    </div>
  );
}