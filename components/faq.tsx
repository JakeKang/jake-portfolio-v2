"use client"

import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader } from "@/components/section-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/data"

const renderBoldSegments = (value: string) =>
  value.split(/(\*\*[^*]+\*\*)/g).map((segment, index) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return <strong key={`bold-${index}`}>{segment.slice(2, -2)}</strong>
    }
    return <span key={`text-${index}`}>{segment}</span>
  })

const renderFaqAnswer = (value: string) =>
  value.split('\n').map((line, index, lines) => (
    <span key={`line-${index}`}>
      {renderBoldSegments(line)}
      {index < lines.length - 1 && <br />}
    </span>
  ))

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-28 px-5 md:px-10 lg:px-20 xl:px-28 2xl:px-36 bg-secondary/30 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 section-grid-bg opacity-20 dark:opacity-10" />
        <div className="absolute top-[-20%] left-[15%] h-52 w-52 rounded-full section-radial-glow blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <SectionHeader title="Q&A" subtitle="기술적인 질문들에 대한 답변" />
        </div>

        <AnimatedSection delay={100}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-5 sm:px-6 transition-colors duration-200 data-[state=open]:border-primary/40 data-[state=open]:bg-white dark:data-[state=open]:bg-white data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="cursor-pointer text-left font-semibold text-foreground hover:no-underline py-5 text-[15px] leading-relaxed transition-colors duration-200 data-[state=open]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-[15px]">
                  <div className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">
                    {renderFaqAnswer(faq.answer)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
