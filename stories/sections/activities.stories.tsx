import type { Decorator, Meta, StoryObj } from "@storybook/react"
import { Activities } from "@/components/activities"

const withBackground: Decorator = (Story) => (
  <div className="bg-secondary/30">
    <Story />
  </div>
)

const meta = {
  title: "Sections/Activities",
  component: Activities,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackground],
} satisfies Meta<typeof Activities>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
