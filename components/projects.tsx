"use client"

import { useCallback, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { ProjectModal } from "@/components/project-modal"
import { ProjectCard } from "@/components/cards/project-card"
import { ProjectCardSkeleton } from "@/components/cards/project-card-skeleton"
import type { Project } from "@/lib/types"
import { useNotionProjects } from "@/hooks/use-notion-projects"
import {
  fetchProjectDetail,
  notionProjectDetailQueryKey,
} from "@/hooks/use-notion-project-detail"
import { useQueryClient } from "@tanstack/react-query"
import { useI18n } from "@/components/i18n-provider"

const PROJECT_SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"]

export function Projects() {
  const { content } = useI18n()
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
            title={content.projects.featuredTitle}
            subtitle={content.projects.featuredSubtitle}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 xl:gap-8">
          {isLoading
            ? PROJECT_SKELETON_KEYS.map((key, index) => (
                <ProjectCardSkeleton key={key} index={index} />
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
                title={content.projects.otherTitle}
                subtitle={content.projects.otherSubtitle}
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
            {content.projects.loading}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          open={isModalOpen}
          onOpenChange={handleOpenChange}
        />
      )}
    </section>
  )
}
