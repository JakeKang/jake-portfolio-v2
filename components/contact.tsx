import { AnimatedSection } from '@/components/animated-section';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Github, Mail, FileText } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export function Contact() {
  return (
    <section
      id='contact'
      className='py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70'>
      <div className='max-w-6xl mx-auto text-center'>
        <div className='mb-8 md:mb-10'>
          <SectionHeader
            title='연락처'
            subtitle='새로운 기회에 항상 열려있습니다. 편하게 연락주세요.'
            centered
          />
        </div>

        <AnimatedSection delay={100}>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-12'>
            <Button
              asChild
              className='bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base md:text-lg font-medium cursor-pointer'>
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className='mr-2 h-4 w-4' />
                이메일 보내기
              </a>
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className='flex items-center justify-center gap-4'>
            <a
              href='https://github.com/JakeKang'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary cursor-pointer'
              aria-label='GitHub 프로필'>
              <Github className='h-5 w-5' />
              <span className='text-sm font-medium'>GitHub</span>
            </a>
            <a
              href='https://chavis-k.notion.site/YongJun-Kang-2f72e95e04e680af84afc882407a5b08?pvs=74'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary cursor-pointer'
              aria-label='Notion 페이지'>
              <FileText className='h-5 w-5' />
              <span className='text-sm font-medium'>Notion</span>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-secondary cursor-pointer'
              aria-label='이메일'>
              <Mail className='h-5 w-5' />
              <span className='text-sm font-medium'>Email</span>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
