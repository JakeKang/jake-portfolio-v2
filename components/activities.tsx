"use client"

import { SectionHeader } from "@/components/section-header"
import { ActivityCard } from "@/components/cards/activity-card"
import { useI18n } from "@/components/i18n-provider"

export function Activities() {
  const { content } = useI18n()

  return (
    <section
      id="activities"
      className="py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            title={content.activitiesSection.title}
            subtitle={content.activitiesSection.subtitle}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch">
          {content.activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
