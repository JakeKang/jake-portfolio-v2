"use client"

import { SectionHeader } from "@/components/section-header"
import { EducationCard } from "@/components/cards/education-card"
import { useI18n } from "@/components/i18n-provider"

export function Education() {
  const { content } = useI18n()

  return (
    <section
      id="education"
      className="py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/70"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            title={content.educationSection.title}
            subtitle={content.educationSection.subtitle}
          />
        </div>

        <div className="space-y-4">
          {content.educations.map((education, index) => (
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
