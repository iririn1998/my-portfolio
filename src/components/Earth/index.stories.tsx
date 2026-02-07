import type { Meta, StoryObj } from "@storybook/react-vite";
import { Earth } from "./index.tsx";

const meta = {
  title: "Components/Earth",
  component: Earth,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    width: {
      control: "text",
      description: "Canvas の幅",
    },
    height: {
      control: "number",
      description: "Canvas の高さ",
    },
  },
} satisfies Meta<typeof Earth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 600,
    height: 500,
  },
};

export const Small: Story = {
  args: {
    width: 300,
    height: 300,
  },
};

export const Large: Story = {
  args: {
    width: 800,
    height: 600,
  },
};
