import { AnimatedSection } from "@/components/animated-section"
import type { Education } from "@/lib/types"
import { GraduationCap } from "lucide-react"

interface EducationCardProps {
  education: Education
  index: number
}

export function EducationCard({ education, index }: EducationCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card p-5 sm:p-6 lg:p-7 rounded-2xl border border-border">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight break-words">
                {education.school}
              </h3>
              <span className="text-muted-foreground text-sm">
                {education.period}
              </span>
            </div>
            <p className="text-primary font-medium text-sm sm:text-base mb-2 break-words">
              {education.degree} · {education.field}
            </p>
            {education.description && (
              <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed break-words">
                {education.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
