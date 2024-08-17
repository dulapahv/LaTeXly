"use client";

import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
  className?: string;
}

export function Providers({ children, className }: ProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <NextUIProvider navigate={router.push} className={className}>
        {children}
      </NextUIProvider>
    </ThemeProvider>
  );
}
