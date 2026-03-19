import { useState } from "react";
import { Check, ClipboardCopy, Download, FileImage, FileCode, Link, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUrlEquation } from "@/hooks/use-url-equation";
import { copyAsPng, copyAsSvg, downloadAsPng, downloadAsSvg } from "./latex-panel";

export function ActionButtons() {
  const { shareEquation } = useUrlEquation();
  const [urlCopied, setUrlCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleCopyUrl = async () => {
    await shareEquation();
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const runExport = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopyUrl}
            size="icon"
            variant="outline"
            aria-label="Copy URL to this equation"
          >
            {urlCopied ? (
              <Check className="size-4 text-green-500" />
            ) : (
              <Link className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {urlCopied ? "URL copied!" : "Copy URL to this equation"}
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label="Export equation"
              >
                {busy ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <Download className="size-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Export equation</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" side="top">
          <DropdownMenuLabel>Copy to clipboard</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => runExport(copyAsPng)}>
            <FileImage className="size-4" />
            Copy as PNG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => runExport(copyAsSvg)}>
            <FileCode className="size-4" />
            Copy as SVG
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Download</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => runExport(downloadAsPng)}>
            <FileImage className="size-4" />
            Download as PNG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => runExport(downloadAsSvg)}>
            <FileCode className="size-4" />
            Download as SVG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
