import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import { personalInfo } from "@/lib/data"

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <SectionHeader title="소개" />
        </div>

        <AnimatedSection delay={100}>
          <p className="text-2xl md:text-3xl text-foreground leading-relaxed mb-8 font-semibold text-balance tracking-tight">
            저는 기술, 디자인, 그리고 사용자의 니즈가 만나는 교차점에서 훌륭한
            제품이 탄생한다고 믿습니다.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
