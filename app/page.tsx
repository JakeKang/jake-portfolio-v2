import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
// import { Skills } from "@/components/skills" // Hidden - backup at components/_backup/skills.backup.tsx
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Activities } from "@/components/activities"
import { Education } from "@/components/education"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {/* <Skills /> */}
        <Projects />
        <Experience />
        <Activities />
        <Education />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
