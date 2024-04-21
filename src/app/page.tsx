/**
 * Main page of the application
 */

'use client';

import {
  Banner,
  EditorPanel,
  Footer,
  LaTeXPanel,
  ToolPanel,
} from '@/components';

import { NextUIProvider } from '@nextui-org/react';

const Home = () => {
  return (
    <NextUIProvider>
      <Banner />
      <div className="flex h-screen flex-col *:h-1/2">
        <div className="flex flex-row border-b-1.5 *:w-1/2">
          <EditorPanel />
          <ToolPanel />
        </div>
        <LaTeXPanel />
      </div>
      <Footer />
    </NextUIProvider>
  );
};

export default Home;
