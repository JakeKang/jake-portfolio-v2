import { NextResponse } from "next/server"
import { projects as localProjects } from "@/lib/data"
import { fetchProjectsFromNotion } from "@/lib/notion"
import type { Project } from "@/lib/types"

export const dynamic = "force-dynamic"

const CACHE_TTL = 1000 * 60 * 10 // 10 minutes
let projectsCache: {
  data: Project[]
  source: string
  expiresAt: number
} | null = null

async function getProjects() {
  if (projectsCache && projectsCache.expiresAt > Date.now()) {
    return projectsCache
  }

  try {
    const projects = await fetchProjectsFromNotion()
    if (projects.length > 0) {
      projectsCache = {
        data: projects,
        source: "notion",
        expiresAt: Date.now() + CACHE_TTL,
      }
      return projectsCache
    }
  } catch (error) {
    console.error("Notion projects fetch failed", error)
  }

  return { data: localProjects, source: "local", expiresAt: 0 }
}

export async function GET() {
  const { data, source } = await getProjects()
  return NextResponse.json(
    { source, projects: data },
    { headers: { "Cache-Control": "no-store" } }
  )
}
