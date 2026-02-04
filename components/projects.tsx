"use client"

import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/data"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <a
        href={project.link}
        className="group block bg-card p-8 rounded-2xl h-full border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
        </div>
        <p className="text-muted-foreground mb-6 leading-relaxed text-[15px]">
          {project.description}
        </p>
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
      </a>
    </AnimatedSection>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <SectionHeader
            title="주요 프로젝트"
            subtitle="실제 문제를 해결한 작업물들"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
