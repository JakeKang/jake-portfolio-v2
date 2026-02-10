import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Providers } from '@/app/providers';
import './globals.css';

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'http://localhost:3000';

const normalizedMetadataBaseUrl =
  metadataBaseUrl.startsWith('http://') || metadataBaseUrl.startsWith('https://')
    ? metadataBaseUrl
    : `https://${metadataBaseUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(normalizedMetadataBaseUrl),
  title: 'JakeKang포트폴리오',
  description: '사용자 중심의 경험을 설계하고 구현하는 프론트엔드 개발자 포트폴리오.',
  robots: {
    index: false,
    follow: false,
    nocache: true, // 검색 엔진이 이 페이지를 캐싱(저장)하지 못하게 함
    noarchive: true, // '저장된 페이지' 링크를 생성하지 못하게 함
    nosnippet: true, // 검색 결과에 텍스트 요약이 나가는 것을 방지
    noimageindex: true, // 이미지 검색에 포함되지 않도록 함
    notranslate: true, // 구글 번역기 표시 방지
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'JakeKang 포트폴리오',
    description: '사용자 중심의 경험을 설계하고 구현하는 프론트엔드 개발자.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'JakeKang 포트폴리오 로고',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'JakeKang 포트폴리오',
    description: '사용자 중심의 경험을 설계하고 구현하는 프론트엔드 개발자.',
    images: ['/android-chrome-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.subset.woff2',
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
      <head>
        <link
          rel='preconnect'
          href='https://prod-files-secure.s3.us-west-2.amazonaws.com'
          crossOrigin=''
        />
        <link
          rel='dns-prefetch'
          href='https://prod-files-secure.s3.us-west-2.amazonaws.com'
        />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
      </head>
      <body
        className={`${pretendard.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-3GBK56C1XR'
          strategy='lazyOnload'
        />
        <Script id='ga-init' strategy='lazyOnload'>
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3GBK56C1XR');`}
        </Script>
      </body>
    </html>
  );
}
