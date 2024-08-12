/**
 * Main page of the application
 */

"use client";

import { useCallback, useRef, useState } from "react";
import { Button, NextUIProvider, Tooltip } from "@nextui-org/react";
import { IoCopyOutline, IoDownloadOutline } from "react-icons/io5";

import {
  Banner,
  EditorPanel,
  Footer,
  LaTeXPanel,
  LaTeXPanelRef,
  ToolPanel,
} from "@/components";

const Home = () => {
  const latexPanelRef = useRef<LaTeXPanelRef>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  return (
    <NextUIProvider>
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
              <IoCopyOutline />
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
              <IoDownloadOutline />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Footer />
    </NextUIProvider>
  );
};

export default Home;
