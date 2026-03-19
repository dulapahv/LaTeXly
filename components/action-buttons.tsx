import { useRef, useState } from "react";
import { Check, Download, FileCode, FileImage, FileText, Link, Loader, Upload } from "lucide-react";
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
import { useEquationStore } from "@/store/equation-store";
import { copyAsPng, copyAsSvg, downloadAsPng, downloadAsSvg } from "./latex-panel";

export function ActionButtons() {
  const { shareEquation } = useUrlEquation();
  const { equation, setEquation, addToHistory } = useEquationStore();
  const [urlCopied, setUrlCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportTex = () => {
    const blob = new Blob([equation], { type: "text/x-tex;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `latex-equation-${Date.now()}.tex`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  };

  const handleImportTex = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const trimmed = content.trim();
        addToHistory(equation);
        setEquation(trimmed);
      }
    };
    reader.readAsText(file);

    // Reset so the same file can be re-imported
    e.target.value = "";
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".tex,.latex,.txt"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
      />

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
          <TooltipContent>Export / Import</TooltipContent>
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
          <DropdownMenuItem onClick={handleExportTex}>
            <FileText className="size-4" />
            Download as LaTeX
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Import</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleImportTex}>
            <Upload className="size-4" />
            Import from .tex file
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
