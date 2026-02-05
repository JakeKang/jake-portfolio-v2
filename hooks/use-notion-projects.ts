import { useQuery } from "@tanstack/react-query"
import type { Project } from "@/lib/types"

interface NotionProjectsResponse {
  projects: Project[]
  source: string
}

async function fetchNotionProjects(): Promise<NotionProjectsResponse> {
  const response = await fetch("/api/notion/projects")
  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }
  return response.json()
}

export function useNotionProjects() {
  return useQuery({
    queryKey: ["notion-projects"],
    queryFn: fetchNotionProjects,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}
