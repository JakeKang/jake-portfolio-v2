import { NextResponse } from "next/server"
import { createNotionClient } from "@/lib/notion"

const cacheHeaders = {
  "Cache-Control": "s-maxage=300, stale-while-revalidate=900",
}

type ContentBlock =
  | { type: "html"; html: string }
  | { type: "carousel"; images: { url: string; caption?: string }[] }

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function renderRichText(richText: { plain_text: string }[]) {
  return escapeHtml(richText.map((item) => item.plain_text).join(""))
}

function renderListBlocks(blocks: { type: string; [key: string]: unknown }[]) {
  const parts: ContentBlock[] = []
  let listBuffer: { type: "bulleted_list_item" | "numbered_list_item"; items: string[] } | null = null

  const flushList = () => {
    if (!listBuffer) {
      return
    }
    const wrapper = listBuffer.type === "bulleted_list_item" ? "ul" : "ol"
    const itemsHtml = listBuffer.items.map((item) => `<li>${item}</li>`).join("")
    parts.push({ type: "html", html: `<${wrapper}>${itemsHtml}</${wrapper}>` })
    listBuffer = null
  }

  for (const block of blocks) {
    if (block.type === "paragraph") {
      const data = block.paragraph as { rich_text: { plain_text: string }[] }
      const text = renderRichText(data.rich_text)
      if (!text) {
        continue
      }
    }
    if (block.type === "bulleted_list_item") {
      const data = block.bulleted_list_item as { rich_text: { plain_text: string }[] }
      const item = renderRichText(data.rich_text)
      if (!listBuffer || listBuffer.type !== "bulleted_list_item") {
        flushList()
        listBuffer = { type: "bulleted_list_item", items: [] }
      }
      listBuffer.items.push(item)
      continue
    }

    if (block.type === "numbered_list_item") {
      const data = block.numbered_list_item as { rich_text: { plain_text: string }[] }
      const item = renderRichText(data.rich_text)
      if (!listBuffer || listBuffer.type !== "numbered_list_item") {
        flushList()
        listBuffer = { type: "numbered_list_item", items: [] }
      }
      listBuffer.items.push(item)
      continue
    }

    flushList()
    const rendered = renderBlock(block)
    if (rendered) {
      parts.push({ type: "html", html: rendered })
    }
  }

  flushList()
  return parts
}

function renderBlock(block: { type: string; [key: string]: unknown }) {
  switch (block.type) {
    case "heading_1": {
      const data = block.heading_1 as { rich_text: { plain_text: string }[] }
      return `<h1>${renderRichText(data.rich_text)}</h1>`
    }
    case "heading_2": {
      const data = block.heading_2 as { rich_text: { plain_text: string }[] }
      return `<h2>${renderRichText(data.rich_text)}</h2>`
    }
    case "heading_3": {
      const data = block.heading_3 as { rich_text: { plain_text: string }[] }
      return `<h3>${renderRichText(data.rich_text)}</h3>`
    }
    case "paragraph": {
      const data = block.paragraph as { rich_text: { plain_text: string }[] }
      const text = renderRichText(data.rich_text)
      return text ? `<p>${text}</p>` : ""
    }
    case "divider": {
      return `<hr />`
    }
    case "image": {
      const data = block.image as
        | {
            type: "external"
            external: { url: string }
            caption?: { plain_text: string }[]
          }
        | {
            type: "file"
            file: { url: string }
            caption?: { plain_text: string }[]
          }
      const url =
        data.type === "external" ? data.external.url : data.file.url
      const caption = data.caption ? renderRichText(data.caption) : ""
      if (caption) {
        return `<figure><img src="${escapeHtml(url)}" alt="" /><figcaption>${caption}</figcaption></figure>`
      }
      return `<img src="${escapeHtml(url)}" alt="" />`
    }
    case "callout": {
      const data = block.callout as {
        rich_text: { plain_text: string }[]
      }
      const text = renderRichText(data.rich_text)
      return text ? `<blockquote>${text}</blockquote>` : ""
    }
    case "code": {
      const data = block.code as {
        rich_text: { plain_text: string }[]
        language?: string
      }
      const text = renderRichText(data.rich_text)
      const language = data.language ? escapeHtml(data.language) : ""
      const label = language
        ? `<span data-code-language="true">${language}</span>`
        : ""
      return text
        ? `<pre><code>${label}${text}</code></pre>`
        : ""
    }
    default:
      return ""
  }
}

function extractImages(blocks: { type: string; [key: string]: unknown }[]) {
  const images: { url: string; caption?: string }[] = []
  for (const block of blocks) {
    if (block.type !== "image") {
      continue
    }
    const data = block.image as
      | {
          type: "external"
          external: { url: string }
          caption?: { plain_text: string }[]
        }
      | {
          type: "file"
          file: { url: string }
          caption?: { plain_text: string }[]
        }
    const url = data.type === "external" ? data.external.url : data.file.url
    const caption = data.caption ? renderRichText(data.caption) : undefined
    images.push({ url, caption })
  }
  return images
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  const resolvedParams = await Promise.resolve(params)
  const projectId = resolvedParams.id
  const notion = createNotionClient()
  const response = await notion.blocks.children.list({
    block_id: projectId,
    page_size: 100,
  })

  const blocks = response.results as { type: string; id?: string }[]
  const contentBlocks: ContentBlock[] = []
  let index = 0

  while (index < blocks.length) {
    const block = blocks[index]

    if (block.type === "column_list") {
      const columns = await notion.blocks.children.list({
        block_id: block.id as string,
        page_size: 100,
      })
      const columnImages: { url: string; caption?: string }[] = []
      for (const column of columns.results as { id?: string }[]) {
        if (!column.id) {
          continue
        }
        const columnBlocks = await notion.blocks.children.list({
          block_id: column.id,
          page_size: 100,
        })
        columnImages.push(...extractImages(columnBlocks.results as { type: string }[]))
      }
      if (columnImages.length > 1) {
        contentBlocks.push({ type: "carousel", images: columnImages })
      } else if (columnImages.length === 1) {
        const single = columnImages[0]
        const caption = single.caption ? `<figcaption>${single.caption}</figcaption>` : ""
        contentBlocks.push({
          type: "html",
          html: `<figure><img src="${escapeHtml(single.url)}" alt="" />${caption}</figure>`,
        })
      }
      index += 1
      continue
    }

    if (block.type === "image") {
      const imageGroup = extractImages([
        block as { type: string; [key: string]: unknown },
      ])
      let nextIndex = index + 1
      while (nextIndex < blocks.length && blocks[nextIndex].type === "image") {
        imageGroup.push(
          ...extractImages([
            blocks[nextIndex] as { type: string; [key: string]: unknown },
          ])
        )
        nextIndex += 1
      }

      if (imageGroup.length > 1) {
        contentBlocks.push({ type: "carousel", images: imageGroup })
      } else if (imageGroup.length === 1) {
        const single = imageGroup[0]
        const caption = single.caption ? `<figcaption>${single.caption}</figcaption>` : ""
        contentBlocks.push({
          type: "html",
          html: `<figure><img src="${escapeHtml(single.url)}" alt="" />${caption}</figure>`,
        })
      }

      index = nextIndex
      continue
    }

    const htmlBlocks = renderListBlocks([
      block as { type: string; [key: string]: unknown },
    ])
    contentBlocks.push(...htmlBlocks)
    index += 1
  }

  return NextResponse.json(
    { contentBlocks },
    { headers: cacheHeaders }
  )
}
