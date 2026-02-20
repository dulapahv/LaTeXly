"use client";

import { useState } from "react";
import { Suspense } from "react";
import { Code2, LayoutGrid } from "lucide-react";
import { EditorPanel } from "@/components/editor-panel";
import { LaTeXPanel } from "@/components/latex-panel";
import { ToolPanel } from "@/components/tool-panel";
import { ActionButtons } from "@/components/action-buttons";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useUrlEquation } from "@/hooks/use-url-equation";
import { cn } from "@/lib/utils";

type MobileTab = "editor" | "symbols";

const MOBILE_TABS: { id: MobileTab; label: string; icon: typeof Code2 }[] = [
  { id: "editor", label: "Editor", icon: Code2 },
  { id: "symbols", label: "Symbols", icon: LayoutGrid },
];

function HomeContent() {
  useKeyboardShortcuts();
  useUrlEquation();

  const [mobileTab, setMobileTab] = useState<MobileTab>("editor");

  return (
    <div className="flex h-dvh flex-col">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-1 flex-col min-h-0">
        <div className="flex flex-1 border-b border-border min-h-0">
          <div className="w-1/2 border-r border-border">
            <EditorPanel />
          </div>
          <div className="w-1/2 overflow-y-auto">
            <ToolPanel />
          </div>
        </div>
        <div className="relative flex-1 min-h-0">
          <LaTeXPanel />
          <div className="absolute bottom-4 right-4">
            <ActionButtons />
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-1 flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-hidden">
          {/* Editor + Preview stacked */}
          <div className={cn("flex h-full flex-col", mobileTab !== "editor" && "hidden")}>
            <div className="flex-1 min-h-0">
              <EditorPanel />
            </div>
            <div className="relative shrink-0 h-48 border-t border-border">
              <LaTeXPanel />
              <div className="absolute bottom-2 right-2">
                <ActionButtons />
              </div>
            </div>
          </div>

          {/* Symbols */}
          <div className={cn("h-full", mobileTab !== "symbols" && "hidden")}>
            <ToolPanel />
          </div>
        </div>

        <nav className="flex shrink-0 border-t border-border bg-background">
          {MOBILE_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMobileTab(id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
                mobileTab === id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={label}
              aria-current={mobileTab === id ? "page" : undefined}
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
