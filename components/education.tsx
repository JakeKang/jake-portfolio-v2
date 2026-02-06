import { SectionHeader } from "@/components/section-header"
import { educations } from "@/lib/data"
import { EducationCard } from "@/components/cards/education-card"

export function Education() {
  return (
    <section
      id="education"
      className="py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
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
