import { useQuery } from "@tanstack/react-query"

interface ProjectDetailResponse {
  contentBlocks: Array<
    | { type: "html"; html: string }
    | { type: "carousel"; images: { url: string; caption?: string }[] }
  >
}

async function fetchProjectDetail(projectId: string) {
  const response = await fetch(`/api/notion/projects/${projectId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch project detail")
  }
  return response.json() as Promise<ProjectDetailResponse>
}

export function useNotionProjectDetail(projectId?: string, enabled = false) {
  return useQuery({
    queryKey: ["notion-project-detail", projectId],
    queryFn: () => fetchProjectDetail(projectId as string),
    enabled: Boolean(projectId) && enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
