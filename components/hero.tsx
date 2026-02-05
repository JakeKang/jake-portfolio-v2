'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Mail, FileText, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const subtitleOptions = personalInfo.subtitleRotations?.length
    ? personalInfo.subtitleRotations
    : [personalInfo.subtitle];
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (subtitleOptions.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSubtitleIndex((current) => (current + 1) % subtitleOptions.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [subtitleOptions.length]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'github':
        return <Github className='w-4 h-4' />;
      case 'notion':
        return <FileText className='w-4 h-4' />;
      case 'email':
        return <Mail className='w-4 h-4' />;
      default:
        return <FileText className='w-4 h-4' />;
    }
  };

  return (
    <section className='min-h-screen flex items-center px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 py-20 md:py-24 lg:py-28 bg-secondary/30'>
      <div className='max-w-6xl mx-auto w-full'>
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-14 items-center'>
          {/* Profile Image - Compact */}
          <div
            className={`shrink-0 transition-all duration-700 ease-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}>
            <div className='relative'>
              <div className='w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-secondary ring-4 ring-card shadow-lg'>
                <Image
                  src='/profile.png'
                  alt='프로필 사진'
                  width={160}
                  height={160}
                  className='w-full h-full object-cover'
                  priority
                />
              </div>
              <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-md whitespace-nowrap overflow-hidden'>
                <span
                  key={subtitleIndex}
                  className='inline-block animate-subtitle-slide'>
                  {subtitleOptions[subtitleIndex]}
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className='text-center lg:text-left flex-1'>
            <div
              className={`transition-all duration-500 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              <p className='text-primary font-medium mb-2 text-sm tracking-wide'>
                안녕하세요
              </p>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 tracking-tight transition-all duration-500 ease-out delay-100 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              <span className='text-primary'>{personalInfo.title}</span>
              <span className='block mt-1'>{personalInfo.name}입니다</span>
            </h1>

            <p
              className={`text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mb-6 leading-relaxed transition-all duration-500 ease-out delay-200 mx-auto lg:mx-0 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              기술보다 문제 해결에 몰입합니다.
              <br />
              복잡한 과정을 단순화하여 제품의 본질적인 편리함을 만듭니다.
            </p>

            {/* Quick Info */}
            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4 text-sm text-muted-foreground transition-all duration-500 ease-out delay-250 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              <div className='flex items-center gap-1.5'>
                <MapPin className='w-4 h-4 text-primary' />
                <span>{personalInfo.location}</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Briefcase className='w-4 h-4 text-primary' />
                <span>{personalInfo.status}</span>
              </div>
            </div>

            {/* Tech Badges */}
            {personalInfo.techBadges && (
              <div
                className={`flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 transition-all duration-500 ease-out delay-275 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}>
                {personalInfo.techBadges.map((tech) => (
                  <Badge
                    key={tech}
                    variant='secondary'
                    className='px-3 py-1 text-sm font-medium'>
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {/* Social Links */}
            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 transition-all duration-500 ease-out delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              {personalInfo.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.icon !== 'email' ? '_blank' : undefined}
                  rel={
                    link.icon !== 'email' ? 'noopener noreferrer' : undefined
                  }
                  className='flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors cursor-pointer'>
                  {getIcon(link.icon)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-3 transition-all duration-500 ease-out delay-400 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              <Button
                onClick={scrollToProjects}
                className='bg-primary text-primary-foreground hover:bg-primary/90  px-6 py-5 text-sm font-medium cursor-pointer'>
                프로젝트 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
