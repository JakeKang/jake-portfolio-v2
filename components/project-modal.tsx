'use client';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import './project-modal.css';

import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { Collection } from 'react-notion-x/build/third-party/collection';
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
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
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

const TAG_SKELETON_KEYS = ['tag-1', 'tag-2', 'tag-3', 'tag-4'];
const LINE_SKELETON_KEYS = ['line-1', 'line-2', 'line-3'];
const DETAIL_LINE_SKELETON_KEYS = [
  'detail-1',
  'detail-2',
  'detail-3',
  'detail-4',
];

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
      const { src, alt, className, width, height } = props;
      const imageSrc = typeof src === 'string' ? src : undefined;
      const parsedWidth = typeof width === 'number' ? width : Number(width);
      const parsedHeight = typeof height === 'number' ? height : Number(height);

      if (!imageSrc) {
        return null;
      }

      return (
        <button
          type='button'
          className='notion-image-button'
          onClick={() => openLightbox(imageSrc, alt)}>
          <Image
            src={imageSrc}
            alt={alt ?? ''}
            width={
              Number.isFinite(parsedWidth) && parsedWidth > 0
                ? parsedWidth
                : 1600
            }
            height={
              Number.isFinite(parsedHeight) && parsedHeight > 0
                ? parsedHeight
                : 900
            }
            className={className}
            sizes='100vw'
            unoptimized
            style={{ width: '100%', height: 'auto' }}
          />
        </button>
      );
    };
  }, [openLightbox]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        setLightboxImage(null);
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  if (!open) {
    return null;
  }

  if (!project) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
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
              <DialogTitle className='sr-only'>프로젝트 상세 정보</DialogTitle>
              <DialogDescription className='sr-only'>
                프로젝트 정보를 불러오는 중입니다.
              </DialogDescription>
              <Skeleton className='h-8 w-2/3' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-4/5' />
            </DialogHeader>
            <div className='flex flex-wrap gap-2 mt-4'>
              {TAG_SKELETON_KEYS.map((key) => (
                <Skeleton key={key} className='h-7 w-20' />
              ))}
            </div>
            <div className='space-y-2 mt-6'>
              {LINE_SKELETON_KEYS.map((key) => (
                <Skeleton key={key} className='h-4 w-full' />
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          <DialogHeader className='space-y-4'>
            <div className='space-y-5'>
              <DialogTitle className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight'>
                {project.title}
              </DialogTitle>
              <DialogDescription className='sr-only'>
                프로젝트 상세 설명, 사용 기술, 기간, 관련 링크를 확인할 수
                있습니다.
              </DialogDescription>
            </div>
          </DialogHeader>

          {isLoading ? (
            <div className='space-y-3 mt-4'>
              <Skeleton className='h-48 w-full rounded-xl' />
              {DETAIL_LINE_SKELETON_KEYS.map((key) => (
                <Skeleton key={key} className='h-4 w-full' />
              ))}
            </div>
          ) : recordMap ? (
            <div className='mt-4 notion-content'>
              <NotionRenderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={isDarkMode}
                components={{ Code, Collection, Equation, Image: NotionImage }}
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
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeLightbox();
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  closeLightbox();
                }
              }}>
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
              <div className='notion-lightbox__content'>
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt ?? ''}
                  width={1600}
                  height={900}
                  className='notion-lightbox__image'
                  sizes='100vw'
                  unoptimized
                  style={{ width: '100%', height: 'auto' }}
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
