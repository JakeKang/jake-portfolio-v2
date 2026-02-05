import type { Decorator, Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const withContainer: Decorator = (Story) => (
  <div className="max-w-md">
    <Story />
  </div>
)

const meta = {
  title: "UI/Card",
  component: Card,
  decorators: [withContainer],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>프로젝트 카드</CardTitle>
        <CardDescription>간단한 설명이 들어갑니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          카드 본문 영역입니다. 주요 내용과 상태를 표시할 수 있습니다.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">자세히 보기</Button>
      </CardFooter>
    </Card>
  ),
}
