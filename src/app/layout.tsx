import "./globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import { BASE_URL, NAME } from "@/lib/constants/constants";
import { cn } from "@/utils/cn";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "LaTeXly | Online LaTeX Equation Editor",
  description:
    "Most comprehensive online LaTeX equation editor with live preview and syntax highlighting.",
  applicationName: "LaTeXly",
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
  authors: [
    {
      name: NAME,
      url: BASE_URL,
    },
  ],
  creator: NAME,
  publisher: NAME,
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    site: "@dulapahv",
    creator: "@dulapahv",
  },
  metadataBase: new URL(BASE_URL),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-w-[768px] overflow-y-hidden", inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
