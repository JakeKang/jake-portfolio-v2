import { NextResponse } from "next/server"
import { NotionAPI } from "notion-client"
import type { ExtendedRecordMap } from "notion-types"

const notion = new NotionAPI()

const cacheTTL = 1000 * 60 * 5
const recordCache = new Map<
  string,
  { recordMap: ExtendedRecordMap; expiresAt: number }
>()

const cacheHeaders = {
  "Cache-Control": "s-maxage=300, stale-while-revalidate=900",
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const projectId = resolvedParams.id

    const cached = recordCache.get(projectId)
    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json({ recordMap: cached.recordMap }, { headers: cacheHeaders })
    }

    const recordMap = await notion.getPage(projectId)
    recordCache.set(projectId, {
      recordMap,
      expiresAt: Date.now() + cacheTTL,
    })

    return NextResponse.json({ recordMap }, { headers: cacheHeaders })
  } catch (error) {
    console.error("Failed to fetch Notion page:", error)
    return NextResponse.json(
      { error: "Failed to fetch project details" },
      { status: 500 }
    )
  }
}
