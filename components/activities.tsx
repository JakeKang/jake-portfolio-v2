import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { activities } from "@/lib/data"
import type { Activity } from "@/lib/types"

interface ActivityCardProps {
  activity: Activity
  index: number
}

function ActivityCard({ activity, index }: ActivityCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">
              {activity.title}
            </h3>
            <p className="text-primary font-medium text-sm">
              {activity.organization}
            </p>
          </div>
          <span className="text-muted-foreground text-sm mt-1 md:mt-0">
            {activity.period}
          </span>
        </div>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {activity.description}
        </p>
      </div>
    </AnimatedSection>
  )
}

export function Activities() {
  return (
    <section
      id="activities"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <SectionHeader
            title="대외/개인활동"
            subtitle="업무 외 다양한 활동들"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
