'use client';

import { useEffect, useState } from 'react';

interface HeroSubtitleProps {
  options: string[];
}

export function HeroSubtitle({ options }: HeroSubtitleProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    if (options.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSubtitleIndex((current) => (current + 1) % options.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [options.length]);

  return (
    <span key={subtitleIndex} className='inline-block animate-subtitle-slide'>
      {options[subtitleIndex]}
    </span>
  );
}
