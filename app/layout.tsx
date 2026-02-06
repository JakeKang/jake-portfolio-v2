import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from '@/app/providers';
import './globals.css';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: '프론트엔드 개발자 포트폴리오',
  description:
    '프로덕트 마인드를 가진 프론트엔드 개발자. 5년간 사용자 중심의 웹 애플리케이션을 구축해왔습니다.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
};

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head />
      <body
        className={`${pretendard.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-3GBK56C1XR'
          strategy='afterInteractive'
        />
        <Script id='ga-init' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3GBK56C1XR');`}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
