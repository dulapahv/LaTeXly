/**
 * Main page of the application
 */

"use client";

import { useRef, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { Copy, Download } from "lucide-react";

import { Banner } from "@/components/Banner";
import { EditorPanel } from "@/components/EditorPanel";
import { Footer } from "@/components/Footer";
import { LaTeXPanel, LaTeXPanelRef } from "@/components/LaTeXPanel";
import { ToolPanel } from "@/components/ToolPanel";

export default function Home() {
  const latexPanelRef = useRef<LaTeXPanelRef>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

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
              variant="light"
              isIconOnly
              className="border-1 text-base"
              isLoading={isCopying}
              onClick={() => {
                setIsCopying(() => true);
                latexPanelRef.current
                  ?.copyToClipboard()
                  .finally(() => setIsCopying(() => false));
              }}
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
              variant="light"
              isIconOnly
              className="border-1 text-base"
              isLoading={isDownloading}
              onClick={async () => {
                setIsDownloading(() => true);
                try {
                  await latexPanelRef.current?.download();
                } finally {
                  setIsDownloading(() => false);
                }
              }}
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
