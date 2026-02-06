import { SectionHeader } from "@/components/section-header"
import { activities } from "@/lib/data"
import { ActivityCard } from "@/components/cards/activity-card"

export function Activities() {
  return (
    <section
      id="activities"
      className="py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            title="대외/개인활동"
            subtitle="업무 외 다양한 활동들"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
