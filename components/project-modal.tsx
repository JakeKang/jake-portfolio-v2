'use client';

import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { useNotionProjectDetail } from '@/hooks/use-notion-project-detail';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';

// Lazy load heavy components for better performance
const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
  { ssr: false },
);
const Equation = dynamic(
  () =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
  { ssr: false },
);

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatPeriodLabel(period?: string) {
  if (!period) {
    return '';
  }
  return period
    .replace(/\./g, '-')
    .replace(/\s*~\s*/g, ' ~ ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const { data, isLoading } = useNotionProjectDetail(project?.id, open);
  const recordMap = data?.recordMap;

  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt?: string;
    caption?: string;
  } | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const openLightbox = useCallback(
    (src: string, alt?: string, caption?: string) => {
      setLightboxImage({ src, alt, caption });
    },
    [],
  );

  const NotionImage = useMemo(() => {
    return function NotionImageComponent(
      props: React.ImgHTMLAttributes<HTMLImageElement>,
    ) {
      const { src, alt, className, ...rest } = props;
      const imageSrc = typeof src === 'string' ? src : undefined;
      if (!imageSrc) {
        return null;
      }
      return (
        <button
          type='button'
          className='notion-image-button'
          onClick={() => openLightbox(imageSrc, alt)}>
          <img src={imageSrc} alt={alt ?? ''} className={className} {...rest} />
        </button>
      );
    };
  }, [openLightbox]);

  useEffect(() => {
    if (!open) {
      setLightboxImage(null);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  if (!project) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className='max-w-none w-[96vw] sm:w-[94vw] md:w-[92vw] lg:w-[88vw] xl:w-[84vw] 2xl:w-[80vw] sm:max-w-[94vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-6xl 2xl:max-w-7xl max-h-[88vh] sm:max-h-[90vh] overflow-hidden p-0 rounded-2xl bg-background/95 backdrop-blur-sm border border-border/50 shadow-2xl'
          onInteractOutside={(event) => {
            if (lightboxImage) {
              event.preventDefault();
            }
          }}
          onPointerDownOutside={(event) => {
            if (lightboxImage) {
              event.preventDefault();
            }
          }}
          onEscapeKeyDown={(event) => {
            if (!lightboxImage) {
              return;
            }
            event.preventDefault();
            closeLightbox();
          }}>
          <div className='modal-scroll overflow-y-auto max-h-[86vh] sm:max-h-[88vh] p-8 sm:p-10 lg:p-14'>
            <DialogHeader>
              <Skeleton className='h-8 w-2/3' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-4/5' />
            </DialogHeader>
            <div className='flex flex-wrap gap-2 mt-4'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-7 w-20' />
              ))}
            </div>
            <div className='space-y-2 mt-6'>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className='h-4 w-full' />
              ))}
            </div>
            <div className='flex flex-wrap gap-3 pt-6'>
              <Skeleton className='h-10 w-28' />
              <Skeleton className='h-10 w-24' />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='max-w-none w-[96vw] sm:w-[94vw] md:w-[92vw] lg:w-[88vw] xl:w-[84vw] 2xl:w-[80vw] sm:max-w-[94vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-6xl 2xl:max-w-7xl max-h-[88vh] sm:max-h-[90vh] overflow-hidden p-0 rounded-2xl bg-background/95 backdrop-blur-sm border border-border/50 shadow-2xl'
        onInteractOutside={(event) => {
          if (lightboxImage) {
            event.preventDefault();
          }
        }}
        onPointerDownOutside={(event) => {
          if (lightboxImage) {
            event.preventDefault();
          }
        }}
        onEscapeKeyDown={(event) => {
          if (!lightboxImage) {
            return;
          }
          event.preventDefault();
          closeLightbox();
        }}>
        <div className='modal-scroll overflow-y-auto max-h-[86vh] sm:max-h-[88vh] p-8 sm:p-10 lg:p-14'>
          <DialogHeader className='space-y-6'>
            <div className='space-y-5'>
              <DialogTitle className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight'>
                {project.title}
              </DialogTitle>
              {(project.role || project.client || project.period) && (
                <div className='space-y-3 text-sm sm:text-base'>
                  {project.role && (
                    <div className='flex flex-wrap gap-x-3 gap-y-1'>
                      <span className='text-muted-foreground'>소속:</span>
                      <span className='font-medium text-foreground'>
                        {project.role}
                      </span>
                    </div>
                  )}
                  {project.client && (
                    <div className='flex flex-wrap gap-x-3 gap-y-1'>
                      <span className='text-muted-foreground'>클라이언트:</span>
                      <span className='text-foreground/80'>
                        {project.client}
                      </span>
                    </div>
                  )}
                  {project.period && (
                    <div className='flex flex-wrap gap-x-3 gap-y-1'>
                      <span className='text-muted-foreground'>진행기간:</span>
                      <span className='text-foreground/80 tabular-nums'>
                        {formatPeriodLabel(project.period)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='flex flex-wrap gap-2 pt-3'>
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant='secondary'
                  className='px-3 py-1 text-sm font-medium'>
                  {tech}
                </Badge>
              ))}
            </div>
          </DialogHeader>

          {isLoading ? (
            <div className='space-y-3 mt-8'>
              <Skeleton className='h-48 w-full rounded-xl' />
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='h-4 w-full' />
              ))}
            </div>
          ) : recordMap ? (
            <div className='mt-8 notion-content'>
              <NotionRenderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={isDarkMode}
                components={{ Code, Equation, Image: NotionImage }}
                disableHeader={true}
                isImageZoomable={false}
              />
            </div>
          ) : null}

          {lightboxImage && (
            <div
              className='notion-lightbox'
              role='dialog'
              aria-modal='true'
              onClick={closeLightbox}>
              <button
                type='button'
                className='notion-lightbox__close'
                aria-label='이미지 닫기'
                onClick={(event) => {
                  event.stopPropagation();
                  closeLightbox();
                }}>
                ×
              </button>
              <div
                className='notion-lightbox__content'
                onClick={(event) => event.stopPropagation()}>
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt ?? ''}
                  className='notion-lightbox__image'
                />
                {lightboxImage.caption && (
                  <p className='notion-lightbox__caption'>
                    {lightboxImage.caption}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className='flex flex-wrap gap-3 pt-6 mt-4 border-t border-border/50'>
            {project.link && (
              <Button asChild size='lg'>
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'>
                  프로젝트 보기
                </a>
              </Button>
            )}
            {project.github && (
              <Button asChild variant='outline' size='lg'>
                <a
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'>
                  GitHub
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
