import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { experiences } from "@/lib/data"
import type { Experience } from "@/lib/types"

interface ExperienceCardProps {
  experience: Experience
  index: number
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="relative pl-8 md:pl-16">
        {/* Timeline dot */}
        <div className="absolute left-0 md:left-4 top-2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 ring-4 ring-background" />

        <div className="bg-card p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight break-words">
                {experience.company}
              </h3>
              <p className="text-primary font-semibold mt-1">{experience.role}</p>
            </div>
            <span className="text-muted-foreground text-sm mt-2 md:mt-0 font-medium">
              {experience.period}
            </span>
          </div>
          <ul className="space-y-3">
            {experience.highlights.map((highlight, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-3 text-[15px] leading-relaxed"
              >
                <span className="text-primary mt-1.5 text-xs">●</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-14">
          <SectionHeader
            title="경력"
            subtitle="지금까지의 커리어 여정"
          />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                experience={exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
