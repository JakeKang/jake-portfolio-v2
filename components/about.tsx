import { AnimatedSection } from '@/components/animated-section';
import { SectionHeader } from '@/components/section-header';
import { personalInfo } from '@/lib/data';

export function About() {
  return (
    <section
      id='about'
      className='py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-8'>
          <SectionHeader title='소개' />
        </div>

        <AnimatedSection delay={100}>
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8 font-semibold text-balance tracking-tight'>
            기술과 비즈니스, 사용자 경험 사이의 최적점을 찾아 제품의 실질적인
            가치를 완성합니다.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
