import { AnimatedSection } from "@/components/animated-section"
import type { Project } from "@/lib/types"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
  onPrefetch: (projectId: string) => void
}

export function ProjectCard({
  project,
  index,
  onSelect,
  onPrefetch,
}: ProjectCardProps) {
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
