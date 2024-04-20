/**
 * Main page of the application
 */

'use client';

import { EditorPanel, LaTeXPanel, ToolPanel } from '@/components';

import { NextUIProvider } from '@nextui-org/react';

const Home = () => {
  return (
    <NextUIProvider>
      <div className="flex h-screen flex-col *:h-1/2">
        <div className="flex flex-row [border-bottom-width:calc(2px*var(--tw-divide-y-reverse))] *:w-1/2">
          <EditorPanel />
          <ToolPanel />
        </div>
        <LaTeXPanel />
      </div>
    </NextUIProvider>
  );
};

export default Home;
