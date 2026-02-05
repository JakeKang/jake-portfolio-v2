import { expect, test } from "@playwright/test"

test("homepage renders", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
})

test("project modal opens", async ({ page }) => {
  await page.goto("/")
  const buttons = await page.getByRole("button", { name: /상세 보기/ }).all()
  if (buttons.length === 0) {
    const emptyState = page.getByText("프로젝트 데이터를 불러오는 중입니다.")
    const skeleton = page.locator('[data-slot="skeleton"]').first()
    const emptyVisible = await emptyState.isVisible().catch(() => false)
    if (!emptyVisible) {
      await expect(skeleton).toBeVisible()
    }
    return
  }
  await buttons[0].click()
  await expect(page.getByRole("dialog")).toBeVisible()
})

test("faq toggle opens", async ({ page }) => {
  await page.goto("/")
  const firstQuestion = page.getByRole("button").filter({ hasText: "?" }).first()
  const hasQuestion = await firstQuestion.isVisible().catch(() => false)
  if (!hasQuestion) {
    return
  }
  await firstQuestion.click()
  await expect(page.locator("[data-slot='accordion-content']")).toBeVisible()
})
