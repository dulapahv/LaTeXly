'use client';

import { useRouter } from 'next/navigation';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
  className?: string;
}

export function Providers({ children, className }: ProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <HeroUIProvider navigate={router.push} className={className}>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
}
