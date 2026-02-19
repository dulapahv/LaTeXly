"use client";

import { Suspense } from "react";
import { EditorPanel } from "@/components/editor-panel";
import { LaTeXPanel } from "@/components/latex-panel";
import { ToolPanel } from "@/components/tool-panel";
import { ActionButtons } from "@/components/action-buttons";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useUrlEquation } from "@/hooks/use-url-equation";

function HomeContent() {
  useKeyboardShortcuts();
  useUrlEquation();

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
          <div className="absolute bottom-4 right-4">
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}

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
