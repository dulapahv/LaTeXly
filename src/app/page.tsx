/**
 * Main page of the application
 */

'use client';

import { useRef } from 'react';

import { NextUIProvider } from '@nextui-org/react';
import {
  Banner,
  EditorPanel,
  Footer,
  LaTeXPanel,
  LaTeXPanelRef,
  ToolPanel,
} from '@/components';

const Home = () => {
  const LaTeXPanelRef = useRef<LaTeXPanelRef>(null);

  return (
    <NextUIProvider>
      <Banner />
      <div className="flex h-screen flex-col *:h-1/2">
        <div className="flex flex-row border-b-1.5 *:w-1/2">
          <EditorPanel latexPanelRef={LaTeXPanelRef} />
          <ToolPanel />
        </div>
        <LaTeXPanel ref={LaTeXPanelRef} />
      </div>
      <Footer />
    </NextUIProvider>
  );
};

export default Home;
