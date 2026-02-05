import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { activities } from "@/lib/data"
import type { Activity } from "@/lib/types"
import { ArrowUpRight } from "lucide-react"

interface ActivityCardProps {
  activity: Activity
  index: number
}

function ActivityCard({ activity, index }: ActivityCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card p-5 sm:p-6 lg:p-7 rounded-2xl border border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight break-words">
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
        <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed break-words">
          {activity.description}
        </p>
        <div className="mt-auto pt-4 min-h-[32px]">
          {activity.link ? (
            <a
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              바로가기
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">&nbsp;</span>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}

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
