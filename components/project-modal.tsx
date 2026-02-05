"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import { useNotionProjectDetail } from "@/hooks/use-notion-project-detail"

interface ProjectModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!open) {
    return null
  }

  const { data, isLoading } = useNotionProjectDetail(project?.id, open)
  const contentBlocks = data?.contentBlocks ?? []
  const [activeSlide, setActiveSlide] = useState(0)
  const [touchStarts, setTouchStarts] = useState<Record<number, number | null>>({})
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false)

  useEffect(() => {
    const hasCarousel = contentBlocks.some((block) => block.type === "carousel")
    if (!hasCarousel || isAutoPlayPaused) {
      return
    }
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev: number) => prev + 1)
    }, 4500)
    return () => window.clearInterval(intervalId)
  }, [contentBlocks, isAutoPlayPaused])

  if (!project) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl w-[92vw] sm:w-[88vw] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-7 w-20" />
            ))}
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl w-[92vw] sm:w-[88vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="space-y-1">
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            {project.description && (
              <DialogDescription className="text-base leading-relaxed">
                {project.description}
              </DialogDescription>
            )}
          </div>
          {(project.client || project.role || project.period) && (
            <p className="text-sm text-muted-foreground">
              {project.client || project.role}
              {project.period ? ` · ${project.period}` : ""}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {contentBlocks.map((block, index) => {
              if (block.type === "carousel") {
                const images = block.images
                const currentIndex = activeSlide % images.length
                const currentImage = images[currentIndex]
                return (
                  <div key={`carousel-${index}`} className="space-y-3">
                    <div
                      className="relative overflow-hidden rounded-xl border border-border bg-card"
                      onMouseEnter={() => setIsAutoPlayPaused(true)}
                      onMouseLeave={() => setIsAutoPlayPaused(false)}
                    >
                      <img
                        src={currentImage.url}
                        alt=""
                        className="h-[320px] w-full object-cover"
                        onTouchStart={(event) =>
                          setTouchStarts((prev) => ({
                            ...prev,
                            [index]: event.touches[0].clientX,
                          }))
                        }
                        onTouchStartCapture={() => setIsAutoPlayPaused(true)}
                        onTouchEndCapture={() => setIsAutoPlayPaused(false)}
                        onTouchEnd={(event) => {
                          const touchStart = touchStarts[index] ?? null
                          if (touchStart === null) {
                            return
                          }
                          const delta = touchStart - event.changedTouches[0].clientX
                          if (Math.abs(delta) > 50) {
                            setActiveSlide((prev: number) =>
                              delta > 0
                                ? (prev + 1) % images.length
                                : prev === 0
                                  ? images.length - 1
                                  : prev - 1
                            )
                          }
                          setTouchStarts((prev) => ({ ...prev, [index]: null }))
                          setIsAutoPlayPaused(false)
                        }}
                        onTouchCancel={() => setIsAutoPlayPaused(false)}
                        onTouchMove={() => setIsAutoPlayPaused(true)}
                      />
                      {images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveSlide((prev: number) =>
                                prev === 0 ? images.length - 1 : prev - 1
                              )
                            }
                            className="rounded-full bg-background/80 p-2 text-foreground shadow-sm"
                            aria-label="이전 이미지"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveSlide((prev: number) =>
                                (prev + 1) % images.length
                              )
                            }
                            className="rounded-full bg-background/80 p-2 text-foreground shadow-sm"
                            aria-label="다음 이미지"
                          >
                            ›
                          </button>
                        </div>
                      )}
                    </div>
                    {currentImage.caption && (
                      <p className="text-sm text-muted-foreground text-center italic max-w-2xl mx-auto">
                        {currentImage.caption}
                      </p>
                    )}
                    {images.length > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        {images.map((_, dotIndex) => (
                          <span
                            key={`dot-${dotIndex}`}
                            className={`h-2 w-2 rounded-full ${
                              dotIndex === currentIndex
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <div
                  key={`html-${index}`}
                  className="prose prose-sm sm:prose-base max-w-none text-foreground [&_h1]:text-2xl [&_h2]:text-xl [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:mt-6 [&_p]:leading-7 [&_p]:text-[15px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-1.5 [&_hr]:my-8 [&_figure]:my-5 [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-xl [&_code]:font-mono [&_code]:text-sm"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              )
            })}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {project.link && (
            <Button asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                프로젝트 보기
              </a>
            </Button>
          )}
          {project.github && (
            <Button asChild variant="outline">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
