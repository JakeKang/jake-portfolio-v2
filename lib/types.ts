// Portfolio Data Types

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  link: string
  github?: string
}

export interface Skill {
  name: string
  context: string
}

export interface SkillCategory {
  title: string
  description: string
  skills: Skill[]
}

export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface SocialLink {
  label: string
  href: string
  icon: "github" | "notion" | "email" | "linkedin"
}

export interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  location: string
  status: string
  email: string
  bio: string[]
  socialLinks: SocialLink[]
}
