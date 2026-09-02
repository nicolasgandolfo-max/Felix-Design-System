import type { Meta, StoryObj } from "@storybook/react";
import { Bubble } from "@felix/ui";

/**
 * **Bubble** — the framed body of a chat message. Maps to Figma `Bubble`
 * (node `1877:2227`).
 *
 * Seven variants:
 *
 * - **default** — brand turquoise (the sender's own messages)
 * - **secondary** — soft turquoise
 * - **muted** — neutral stone (the other party)
 * - **tinted** — light turquoise tint
 * - **outline** — card surface with a hairline border
 * - **ghost** — unframed text, e.g. an AI response or markdown block
 * - **destructive** — error surface with destructive text
 *
 * The bubble hugs its content; constrain the width from the parent.
 */
const meta = {
  title: "Components/Atoms/Bubble",
  component: Bubble,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { variant: "default", children: "Hey! How's your project going?" },
  argTypes: {
    variant: {
      description: "Visual style of the bubble.",
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "muted",
        "tinted",
        "outline",
        "ghost",
        "destructive",
      ],
      table: {
        type: { summary: "BubbleVariant" },
        defaultValue: { summary: "default" },
      },
    },
    children: {
      description: "Message content.",
      control: "text",
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[284px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "It's going great, thanks for asking!",
  },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Let me check on that for you." },
};

export const Tinted: Story = {
  args: { variant: "tinted", children: "Here's the info you requested." },
};

export const Outline: Story = {
  args: { variant: "outline", children: "I have a question about the design." },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children:
      "This is unframed content, like an AI response or markdown block.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Error: Something went wrong with the request.",
  },
};

// ─── Variants (Figma showcase) ────────────────────────────────────────────────

/** All seven variants stacked, mirroring the Figma component set. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Bubble>Hey! How's your project going?</Bubble>
      <Bubble variant="secondary">It's going great, thanks for asking!</Bubble>
      <Bubble variant="muted">Let me check on that for you.</Bubble>
      <Bubble variant="tinted">Here's the info you requested.</Bubble>
      <Bubble variant="outline">I have a question about the design.</Bubble>
      <Bubble variant="ghost">
        This is unframed content, like an AI response or markdown block.
      </Bubble>
      <Bubble variant="destructive">
        Error: Something went wrong with the request.
      </Bubble>
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark rounded-xl bg-background p-6">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Bubble>Hey! How's your project going?</Bubble>
      <Bubble variant="secondary">It's going great, thanks for asking!</Bubble>
      <Bubble variant="muted">Let me check on that for you.</Bubble>
      <Bubble variant="tinted">Here's the info you requested.</Bubble>
      <Bubble variant="outline">I have a question about the design.</Bubble>
      <Bubble variant="ghost">
        This is unframed content, like an AI response or markdown block.
      </Bubble>
      <Bubble variant="destructive">
        Error: Something went wrong with the request.
      </Bubble>
    </div>
  ),
};
