import { AnimatedSection } from "@/components/animated-section"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  delay?: number
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  delay = 0,
}: SectionHeaderProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className={centered ? "text-center" : ""}>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-base md:text-lg text-muted-foreground leading-relaxed ${
              centered ? "mx-auto" : ""
            } max-w-xl`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AnimatedSection>
  )
}
