import { Client } from "@notionhq/client"
import type { Project } from "@/lib/types"

const token = process.env.NOTION_TOKEN
const FEATURED_PROJECTS_DB_ID = process.env.NOTION_FEATURED_PROJECTS_DB_ID
const OTHER_PROJECTS_DB_ID = process.env.NOTION_OTHER_PROJECTS_DB_ID

export function createNotionClient() {
  if (!token) {
    throw new Error("NOTION_TOKEN is not set")
  }

  return new Client({ auth: token })
}

function extractPlainText(
  property:
    | { type: "title"; title: { plain_text: string }[] }
    | { type: "rich_text"; rich_text: { plain_text: string }[] }
    | undefined
) {
  if (!property) {
    return ""
  }

  if (property.type === "title") {
    return property.title.map((item) => item.plain_text).join("")
  }

  if (property.type === "rich_text") {
    return property.rich_text.map((item) => item.plain_text).join("")
  }

  return ""
}

function getFirstTextProperty(
  properties: Record<string, unknown>,
  keys: string[]
) {
  for (const key of keys) {
    const property = properties[key] as
      | { type: "title"; title: { plain_text: string }[] }
      | { type: "rich_text"; rich_text: { plain_text: string }[] }
      | { type: "formula"; formula: { type: "string"; string: string | null } }
      | undefined
    const value =
      property?.type === "formula"
        ? property.formula.string ?? ""
        : extractPlainText(property)
    if (value) {
      return value
    }
  }
  return ""
}

function formatYearMonth(value: string) {
  const match = value.match(/(\d{4})[-./](\d{1,2})/)
  if (!match) {
    return ""
  }
  const year = match[1]
  const month = match[2].padStart(2, "0")
  return `${year}-${month}`
}

function getDateProperty(
  property:
    | { type: "date"; date: { start: string; end?: string | null } | null }
    | undefined
) {
  if (!property || property.type !== "date" || !property.date?.start) {
    return ""
  }
  const start = formatYearMonth(property.date.start)
  if (!start) {
    return ""
  }
  const end = property.date.end ? formatYearMonth(property.date.end) : "현재"
  return `${start} ~ ${end}`
}

function getFirstDateProperty(
  properties: Record<string, unknown>,
  keys: string[]
) {
  for (const key of keys) {
    const property = properties[key] as
      | { type: "date"; date: { start: string; end?: string | null } | null }
      | undefined
    const value = getDateProperty(property)
    if (value) {
      return value
    }
  }
  return ""
}

function getMultiSelect(
  property:
    | { type: "multi_select"; multi_select: { name: string }[] }
    | undefined
) {
  if (!property || property.type !== "multi_select") {
    return []
  }
  return property.multi_select.map((item) => item.name)
}

function getCoverUrl(value: unknown) {
  const cover = value as
    | { type: "external"; external: { url: string } }
    | { type: "file"; file: { url: string } }
    | undefined
  if (!cover) {
    return undefined
  }
  if (cover.type === "external") {
    return cover.external.url
  }
  if (cover.type === "file") {
    return cover.file.url
  }
  return undefined
}

type NotionPage = { id: string; properties: Record<string, unknown> }

function hasProperties(value: unknown): value is NotionPage {
  return (
    typeof value === "object" &&
    value !== null &&
    "properties" in value &&
    "id" in value
  )
}

async function queryProjects(databaseId: string, category: Project["category"]) {
  const notion = createNotionClient()
  let results: unknown[] = []

  const getDataSourceId = async () => {
    const database = await notion.databases.retrieve({ database_id: databaseId })
    const dataSources = (database as { data_sources?: { id: string }[] }).data_sources
    return dataSources?.[0]?.id ?? null
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
    })
    results = response.results
  } catch (error) {
    const dataSourceId = await getDataSourceId()
    if (!dataSourceId) {
      throw error
    }
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
    })
    results = response.results
  }

  return results.filter(hasProperties).map((page) => {
    const properties = page.properties
    const title =
      getFirstTextProperty(properties, ["이름", "제목", "Title", "Name"]) ||
      "프로젝트"
    const client = getFirstTextProperty(properties, ["클라이언트", "Client"]) || ""
    const period =
      getFirstDateProperty(properties, [
        "프로젝트 기간",
        "기간",
        "Period",
      ]) ||
      getFirstTextProperty(properties, [
        "프로젝트 기간",
        "기간",
        "Period",
      ])
    const description =
      getFirstTextProperty(properties, ["클라이언트", "설명", "Description"]) ||
      period ||
      ""
    const techStack = getMultiSelect(properties["기술스택"] as { type: "multi_select"; multi_select: { name: string }[] } | undefined)
    const role =
      getFirstTextProperty(properties, ["소속", "역할", "Role"]) || undefined
    return {
      id: page.id,
      title,
      description,
      techStack,
      link: "",
      category,
      role,
      client: client || undefined,
      period: period || undefined,
      coverImage: getCoverUrl((page as { cover?: unknown }).cover),
    } satisfies Project
  })
}

export async function fetchProjectsFromNotion(): Promise<Project[]> {
  if (!FEATURED_PROJECTS_DB_ID && !OTHER_PROJECTS_DB_ID) {
    return []
  }

  const featured = FEATURED_PROJECTS_DB_ID
    ? await queryProjects(FEATURED_PROJECTS_DB_ID, "featured")
    : []
  const other = OTHER_PROJECTS_DB_ID
    ? await queryProjects(OTHER_PROJECTS_DB_ID, "other")
    : []

  return [...featured, ...other]
}
