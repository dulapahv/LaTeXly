import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  BASE_URL,
  NAME,
  PORTFOLIO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants/constants";
import { cn } from "@/lib/utils";
import { MathJaxProvider } from "@/components/mathjax-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: [
    "LaTeX",
    "Math",
    "Equation",
    "Editor",
    "Preview",
    "Syntax",
    "Highlighting",
    "DulapahV",
    "Dulapah Vibulsanti",
  ],
  creator: NAME,
  publisher: NAME,
  authors: {
    name: NAME,
    url: PORTFOLIO_URL,
  },
  metadataBase: new URL(BASE_URL),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dulapahv",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-hidden antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <MathJaxProvider>{children}</MathJaxProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
