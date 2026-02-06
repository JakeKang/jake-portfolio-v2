"use client"

import { useCallback, useState } from "react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { ProjectModal } from "@/components/project-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/types"
import { useNotionProjects } from "@/hooks/use-notion-projects"
import {
  fetchProjectDetail,
  notionProjectDetailQueryKey,
} from "@/hooks/use-notion-project-detail"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
  onPrefetch: (projectId: string) => void
}

function ProjectCard({ project, index, onSelect, onPrefetch }: ProjectCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <button
        type="button"
        onClick={() => onSelect(project)}
        onMouseEnter={() => onPrefetch(project.id)}
        onFocus={() => onPrefetch(project.id)}
        onTouchStart={() => onPrefetch(project.id)}
        className="group block w-full text-left bg-card rounded-2xl h-full border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
        aria-label={`${project.title} 상세 보기`}
      >
        <div className="relative h-44 w-full bg-secondary/40">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
              Cover Image
            </div>
          )}
        </div>
        <div className="p-6 sm:p-7 lg:p-8">
          <div className="flex justify-between items-start mb-3 gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug break-words">
              {project.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
          </div>
          <p className="text-sm text-muted-foreground mb-1 break-words">
            {project.client || project.role}
          </p>
          {project.period && (
            <p className="text-xs text-muted-foreground/80 mb-5">
              {project.period}
            </p>
          )}
          {!project.period && <div className="mb-5" />}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </button>
    </AnimatedSection>
  )
}

function ProjectCardSkeleton({ index }: { index: number }) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card rounded-2xl h-full border border-border overflow-hidden">
        <Skeleton className="h-44 w-full" />
        <div className="p-6 sm:p-7 lg:p-8">
          <div className="flex justify-between items-start mb-3 gap-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-4 w-2/3 mb-5" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-7 w-20" />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function Projects() {
  const { data, isLoading } = useNotionProjects()
  const projectList = data?.projects ?? []
  const featuredProjects = projectList.filter((p) => p.category === "featured")
  const otherProjects = projectList.filter((p) => p.category === "other")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleOpen = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setSelectedProject(null)
    }
  }

  const handlePrefetch = useCallback(
    (projectId: string) => {
      queryClient.prefetchQuery({
        queryKey: notionProjectDetailQueryKey(projectId),
        queryFn: () => fetchProjectDetail(projectId),
        staleTime: 1000 * 60 * 5,
      })
    },
    [queryClient]
  )

  return (
    <section id="projects" className="py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-14">
          <SectionHeader
            title="주요 프로젝트"
            subtitle="실제 문제를 해결한 작업물들"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 xl:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProjectCardSkeleton key={index} index={index} />
              ))
            : featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={handleOpen}
                  onPrefetch={handlePrefetch}
                />
              ))}
        </div>

        {!isLoading && otherProjects.length > 0 && (
          <>
            <div className="mt-16 mb-10 md:mb-12">
              <SectionHeader
                title="기타 프로젝트"
                subtitle="그 외 진행한 프로젝트들"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6 xl:gap-8">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={handleOpen}
                  onPrefetch={handlePrefetch}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && projectList.length === 0 && (
          <div className="mt-10 text-sm text-muted-foreground">
            프로젝트 데이터를 불러오는 중입니다.
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        open={isModalOpen}
        onOpenChange={handleOpenChange}
      />
    </section>
  )
}
