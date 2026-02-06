import { useQuery } from "@tanstack/react-query"
import type { ExtendedRecordMap } from "notion-types"

interface ProjectDetailResponse {
  recordMap: ExtendedRecordMap
}

export async function fetchProjectDetail(projectId: string) {
  const response = await fetch(`/api/notion/projects/${projectId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch project detail")
  }
  return response.json() as Promise<ProjectDetailResponse>
}

export function notionProjectDetailQueryKey(projectId?: string) {
  return ["notion-project-detail", projectId] as const
}

export function useNotionProjectDetail(projectId?: string, enabled = false) {
  return useQuery({
    queryKey: notionProjectDetailQueryKey(projectId),
    queryFn: () => fetchProjectDetail(projectId as string),
    enabled: Boolean(projectId) && enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  })
}
