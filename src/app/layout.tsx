import './globals.css';

import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import {
  BASE_URL,
  NAME,
  PORTFOLIO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/constants/constants';
import { cn } from '@/utils/cn';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  keywords: [
    'LaTeX',
    'Math',
    'Equation',
    'Editor',
    'Preview',
    'Syntax',
    'Highlighting',
    'DulapahV',
    'Dulapah Vibulsanti',
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
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dulapahv',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={cn('min-w-[768px] overflow-y-hidden antialiased')}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
