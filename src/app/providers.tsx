"use client";

import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
  className?: string;
}

export function Providers({ children, className }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push} className={className}>
      {children}
    </NextUIProvider>
  );
}
