import { NextResponse } from "next/server"
import { fetchProjectsFromNotion } from "@/lib/notion"
import type { Project } from "@/lib/types"

export const dynamic = "force-dynamic"

const CACHE_TTL = 1000 * 60 * 10 // 10 minutes
type ProjectsSource = "notion"

let projectsCache: {
  data: Project[]
  source: ProjectsSource
  expiresAt: number
} | null = null

async function getProjects() {
  if (projectsCache && projectsCache.expiresAt > Date.now()) {
    return projectsCache
  }

  try {
    const projects = await fetchProjectsFromNotion()
    projectsCache = {
      data: projects,
      source: "notion",
      expiresAt: Date.now() + CACHE_TTL,
    }
    return projectsCache
  } catch (error) {
    console.error("Notion projects fetch failed", error)
    throw error
  }
}

export async function GET() {
  try {
    const { data, source } = await getProjects()
    return NextResponse.json(
      { source, projects: data },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch {
    return NextResponse.json(
      { source: "error", projects: [] as Project[] },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    )
  }
}
