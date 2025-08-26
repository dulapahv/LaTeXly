"use client";

import { useEffect, Suspense } from "react";
// import { Banner } from "@/components/banner";
import { EditorPanel } from "@/components/editor-panel";
import { Footer } from "@/components/footer";
import { LaTeXPanel } from "@/components/latex-panel";
import { ToolPanel } from "@/components/tool-panel";
import { ActionButtons } from "@/components/action-buttons";
import { ShareButton } from "@/components/share-button";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useUrlEquation } from "@/hooks/use-url-equation";

function HomeContent() {
  useKeyboardShortcuts();
  useUrlEquation(); // Enable URL persistence

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load MathJax extensions if needed
    }
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 border-b border-border">
          <div className="w-1/2 border-r border-border">
            <EditorPanel />
          </div>
          <div className="w-1/2 overflow-y-auto">
            <ToolPanel />
          </div>
        </div>
        <div className="relative flex-1">
          <LaTeXPanel />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <ShareButton />
            <ActionButtons />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
