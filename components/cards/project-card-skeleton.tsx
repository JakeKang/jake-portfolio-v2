import { AnimatedSection } from "@/components/animated-section"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCardSkeleton({ index }: { index: number }) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card rounded-2xl h-full border border-border overflow-hidden">
        <Skeleton className="h-44 w-full" />
        <div className="p-6 sm:p-7 lg:p-8">
          <div className="flex justify-between items-start mb-3 gap-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-4 w-2/3 mb-5" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-7 w-20" />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
