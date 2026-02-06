import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
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
  // 다른 사이트(카톡, 페북 등)에 링크 공유 시 정보 노출 방지
  openGraph: {
    title: 'Private Portfolio',
    description: '접근 권한이 필요합니다.',
    images: [], // 공유 시 이미지 안 뜨게 설정
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
        className={`${pretendard.variable} font-sans antialiased bg-background text-foreground`}>
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
      </body>
    </html>
  );
}
