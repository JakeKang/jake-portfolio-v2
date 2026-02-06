import { SectionHeader } from "@/components/section-header"
import { experiences } from "@/lib/data"
import { ExperienceCard } from "@/components/cards/experience-card"

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 section-grid-bg opacity-30 dark:opacity-15" />
        <div className="absolute bottom-[-20%] left-[-5%] h-64 w-64 rounded-full section-radial-glow blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
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
