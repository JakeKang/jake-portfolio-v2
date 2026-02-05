import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { GraduationCap } from "lucide-react"
import { educations } from "@/lib/data"
import type { Education } from "@/lib/types"

interface EducationCardProps {
  education: Education
  index: number
}

function EducationCard({ education, index }: EducationCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                {education.school}
              </h3>
              <span className="text-muted-foreground text-sm">
                {education.period}
              </span>
            </div>
            <p className="text-primary font-medium text-sm mb-2">
              {education.degree} · {education.field}
            </p>
            {education.description && (
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {education.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function Education() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-secondary/50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <SectionHeader title="학력" subtitle="교육 배경" />
        </div>

        <div className="space-y-4">
          {educations.map((education, index) => (
            <EducationCard
              key={education.id}
              education={education}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
