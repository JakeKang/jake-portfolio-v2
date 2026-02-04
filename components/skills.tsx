import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { skillCategories } from "@/lib/data"
import type { SkillCategory } from "@/lib/types"

interface SkillCardProps {
  category: SkillCategory
  index: number
}

function SkillCard({ category, index }: SkillCardProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="bg-card p-8 rounded-2xl h-full border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
          {category.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {category.description}
        </p>
        <ul className="space-y-4">
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <p className="font-semibold text-foreground text-[15px]">
                {skill.name}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {skill.context}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-secondary/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <SectionHeader
            title="기술 스택"
            subtitle="주로 사용하는 기술과 도구들"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
