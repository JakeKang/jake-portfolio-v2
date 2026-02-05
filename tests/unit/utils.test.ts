import { describe, expect, it } from "vitest"
import { cn } from "../../lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold")
  })
})
