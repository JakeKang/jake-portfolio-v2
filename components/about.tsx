"use client";

import { AnimatedSection } from '@/components/animated-section';
import { SectionHeader } from '@/components/section-header';
import { useI18n } from '@/components/i18n-provider';

export function About() {
  const { content } = useI18n();

  return (
    <section
      id='about'
      className='relative py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70 overflow-hidden'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 section-grid-bg opacity-40 dark:opacity-20' />
        <div className='absolute -top-24 right-[-10%] h-56 w-56 rounded-full section-radial-glow blur-3xl' />
      </div>
      <div className='relative z-10 max-w-6xl mx-auto'>
        <div className='mb-8'>
          <SectionHeader title={content.about.title} />
        </div>

        <AnimatedSection delay={100}>
          <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-8 font-semibold text-balance tracking-tight whitespace-pre-line'>
            {content.about.headline}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            {content.personalInfo.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
