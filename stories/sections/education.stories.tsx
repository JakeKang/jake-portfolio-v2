import type { Decorator, Meta, StoryObj } from "@storybook/react"
import { Education } from "@/components/education"

const withBackground: Decorator = (Story) => (
  <div className="bg-secondary/70">
    <Story />
  </div>
)

const meta = {
  title: "Sections/Education",
  component: Education,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackground],
} satisfies Meta<typeof Education>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
