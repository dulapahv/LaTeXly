import "./globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/utils/cn";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "LaTeXly | Online LaTeX Equation Editor",
  description:
    "Most comprehensive online LaTeX equation editor with live preview and syntax highlighting.",
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
