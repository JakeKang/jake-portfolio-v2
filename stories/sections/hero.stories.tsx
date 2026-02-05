import type { Decorator, Meta, StoryObj } from "@storybook/react"
import { Hero } from "@/components/hero"

const withBackground: Decorator = (Story) => (
  <div className="bg-background">
    <Story />
  </div>
)

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackground],
} satisfies Meta<typeof Hero>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
