/**
 * Main page of the application
 */

"use client";

import { useRef, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Copy, Download } from "lucide-react";

import { Banner } from "@/ui/banner";
import { EditorPanel } from "@/ui/editor-panel";
import { Footer } from "@/ui/footer";
import { LaTeXPanel, latexPanelRef } from "@/ui/latex-panel";
import { ToolPanel } from "@/ui/tool-panel";

export default function Home() {
  const latexPanelRef = useRef<latexPanelRef>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopy() {
    setIsCopying(true);
    try {
      await latexPanelRef.current?.copyToClipboard();
    } finally {
      setIsCopying(false);
    }
  }

  async function handleDownload() {
    setIsDownloading(true);
    try {
      await latexPanelRef.current?.download();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <>
      <Banner />
      <div className="flex h-screen flex-col *:h-full *:max-h-[calc(50%-1rem)]">
        <div className="flex flex-row border-b-1.5 *:w-1/2">
          <EditorPanel latexPanelRef={latexPanelRef} />
          <ToolPanel />
        </div>
        <LaTeXPanel ref={latexPanelRef} />
        <div className="absolute bottom-4 right-4 flex !h-fit gap-2">
          <Tooltip
            disableAnimation
            closeDelay={0}
            className="text-xs"
            content="Copy"
          >
            <Button
              aria-label="Copy LaTeX code to clipboard"
              variant="light"
              isIconOnly
              className="border-1 text-base"
              isLoading={isCopying}
              radius="sm"
              onClick={handleCopy}
            >
              <Copy size={18} />
            </Button>
          </Tooltip>
          <Tooltip
            disableAnimation
            closeDelay={0}
            className="text-xs"
            content="Download"
          >
            <Button
              aria-label="Download LaTeX code as a file"
              variant="light"
              isIconOnly
              className="border-1 text-base"
              isLoading={isDownloading}
              radius="sm"
              onClick={handleDownload}
            >
              <Download size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Footer />
    </>
  );
}
