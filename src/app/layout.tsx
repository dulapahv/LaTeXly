import "./globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`min-w-[768px] overflow-y-hidden ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
