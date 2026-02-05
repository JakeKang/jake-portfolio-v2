import type { Decorator, Meta, StoryObj } from "@storybook/react"
import { Experience } from "@/components/experience"

const withBackground: Decorator = (Story) => (
  <div className="bg-secondary/50">
    <Story />
  </div>
)

const meta = {
  title: "Sections/Experience",
  component: Experience,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackground],
} satisfies Meta<typeof Experience>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
