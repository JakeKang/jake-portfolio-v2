import { NextResponse } from "next/server"
import { projects as localProjects } from "@/lib/data"
import { fetchProjectsFromNotion } from "@/lib/notion"

const cacheHeaders = {
  "Cache-Control": "s-maxage=600, stale-while-revalidate=3600",
}

export async function GET() {
  try {
    const projects = await fetchProjectsFromNotion()
    if (projects.length > 0) {
      return NextResponse.json(
        { source: "notion", projects },
        { headers: cacheHeaders }
      )
    }
  } catch (error) {
    console.error("Notion projects fetch failed", error)
  }

  return NextResponse.json(
    { source: "local", projects: localProjects },
    { headers: cacheHeaders }
  )
}
