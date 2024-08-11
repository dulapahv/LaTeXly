/**
 * Main page of the application
 */

'use client';

import { useRef, useState } from 'react';

import { IoCopyOutline, IoDownloadOutline } from "react-icons/io5";

import { NextUIProvider, Button, Tooltip } from '@nextui-org/react';
import {
  Banner,
  EditorPanel,
  Footer,
  LaTeXPanel,
  LaTeXPanelRef,
  ToolPanel,
} from '@/components';

const Home = () => {
  const latexPanelRef = useRef<LaTeXPanelRef>(null);

  const [isDownloading, setIsDownloading] = useState(false)
  const [isCopying, setIsCopying] = useState(false)

  return (
    <NextUIProvider>
      <Banner />
      <div className="flex h-screen flex-col *:h-full *:max-h-[calc(50%-1rem)]">
        <div className="flex flex-row border-b-1.5 *:w-1/2">
          <EditorPanel latexPanelRef={latexPanelRef} />
          <ToolPanel />
        </div>
        <LaTeXPanel ref={latexPanelRef} />
        <div className='absolute right-4 bottom-4 !h-fit flex gap-2'>
          <Tooltip
              disableAnimation
              closeDelay={0}
              className="text-xs"
              content="Copy"
            >
            <Button
                variant="light"
                isIconOnly
                className="text-base border-1"
                isLoading={isCopying}
                onPress={async () => {
                  if (!latexPanelRef.current) return;

                  setIsCopying(true);
                  latexPanelRef?.current?.copyToClipboard();
                  setIsCopying(false);
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
                className="text-base border-1"
                isLoading={isDownloading}
                onPress={async () => {
                  if (!latexPanelRef.current) return;

                  setIsDownloading(true);
                  latexPanelRef?.current?.download();
                  setIsDownloading(false);
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
