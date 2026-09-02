import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  Bubble,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@felix/ui";

/**
 * **Message** — one entry in a chat thread: an optional avatar plus a column
 * with a header (sender), a `Bubble`, and a footer (time / read state).
 * Maps to Figma `Message` (node `2070:3173`).
 *
 * The component is a compound:
 *
 * - `Message` — root row; `align="start"` (other party) or `align="end"` (own)
 * - `MessageAvatar` — 32 px slot for an `Avatar size="sm"`
 * - `MessageContent` — the column, aligned by the root's `align`
 * - `MessageHeader` / `MessageFooter` — caption lines above / below the bubble
 *
 * Always write the avatar first in JSX — `align="end"` flips the visual order.
 */
const meta = {
  title: "Components/Molecules/Message",
  component: Message,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { align: "start" },
  argTypes: {
    align: {
      description:
        "Side the message hangs from. Sub-parts read it from context.",
      control: { type: "radio" },
      options: ["start", "end"],
      table: {
        type: { summary: "MessageAlign" },
        defaultValue: { summary: "start" },
      },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/** `align="start"` — the other party, muted bubble, avatar on the left. */
export const Start: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageAvatar>
        <Avatar size="sm" initials="A" status="success" statusLabel="Online" />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Oliver</MessageHeader>
        <Bubble variant="muted">Let me check on that for you.</Bubble>
        <MessageFooter>2:32 PM</MessageFooter>
      </MessageContent>
    </Message>
  ),
};

/** `align="end"` — own message, brand bubble, avatar on the right. */
export const End: Story = {
  args: { align: "end" },
  render: (args) => (
    <Message {...args}>
      <MessageAvatar>
        <Avatar size="sm" initials="A" status="success" statusLabel="Online" />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>You</MessageHeader>
        <Bubble>Hey! How's your project going?</Bubble>
        <MessageFooter>Read · 2:34 PM</MessageFooter>
      </MessageContent>
    </Message>
  ),
};

// ─── Variants (Figma showcase) ────────────────────────────────────────────────

/** Both alignments stacked, mirroring the Figma component set. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Message align="start">
        <MessageAvatar>
          <Avatar
            size="sm"
            initials="A"
            status="success"
            statusLabel="Online"
          />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Oliver</MessageHeader>
          <Bubble variant="muted">Let me check on that for you.</Bubble>
          <MessageFooter>2:32 PM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar
            size="sm"
            initials="A"
            status="success"
            statusLabel="Online"
          />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <Bubble>Hey! How's your project going?</Bubble>
          <MessageFooter>Read · 2:34 PM</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
};

// ─── Composition ──────────────────────────────────────────────────────────────

/** Without avatar, header or footer — just the aligned bubble. */
export const BubbleOnly: Story = {
  args: { align: "end" },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Bubble>Sounds good, talk soon.</Bubble>
      </MessageContent>
    </Message>
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
    <div className="flex flex-col gap-5">
      <Message align="start">
        <MessageAvatar>
          <Avatar
            size="sm"
            initials="A"
            status="success"
            statusLabel="Online"
          />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Oliver</MessageHeader>
          <Bubble variant="muted">Let me check on that for you.</Bubble>
          <MessageFooter>2:32 PM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar
            size="sm"
            initials="A"
            status="success"
            statusLabel="Online"
          />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <Bubble>Hey! How's your project going?</Bubble>
          <MessageFooter>Read · 2:34 PM</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
};
