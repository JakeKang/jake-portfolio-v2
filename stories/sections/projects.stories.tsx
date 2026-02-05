import type { Decorator, Meta, StoryObj } from "@storybook/react"
import { Projects } from "@/components/projects"

const withBackground: Decorator = (Story) => (
  <div className="bg-background">
    <Story />
  </div>
)

const meta = {
  title: "Sections/Projects",
  component: Projects,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackground],
} satisfies Meta<typeof Projects>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
