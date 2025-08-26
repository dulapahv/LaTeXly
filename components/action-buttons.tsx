"use client";

import { Copy, Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEquationStore } from "@/store/equation-store";
import { copyEquationAsImage, downloadEquationAsImage } from "./latex-panel";

export function ActionButtons() {
  const { isDownloading, isCopying, setIsDownloading, setIsCopying } =
    useEquationStore();

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

  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
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
