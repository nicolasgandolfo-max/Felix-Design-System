import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  Bubble,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageScroller,
  MessageScrollerEmpty,
  MessageScrollerHeader,
  MessageScrollerInput,
  MessageScrollerMessages,
} from "@felix/ui";

/**
 * **MessageScroller** — the framed chat surface: a header, either an empty
 * state or the scrollable list of `Message`s, and the input block at the
 * bottom. Maps to Figma `Message Scroller` (node `1901:3567`).
 *
 * Figma's `State=Empty` / `State=Scrolled` are expressed by composition:
 *
 * - `MessageScroller` — the 24 px-radius frame (size it: Figma uses 380 × 600)
 * - `MessageScrollerHeader` — title, description, optional refresh button
 * - `MessageScrollerEmpty` — icon circle + title + copy (Empty state)
 * - `MessageScrollerMessages` — scroll viewport + "Scroll to bottom" pill
 * - `MessageScrollerInput` — composer block with attach (+) and send (↑)
 */
const meta = {
  title: "Components/Organisms/MessageScroller",
  component: MessageScroller,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description:
        "Merged with internal styles via `cn()`. Use it to size the frame.",
      control: "text",
    },
  },
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

const DRAFT =
  "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI...";

function Thread() {
  return (
    <>
      <Message align="start" className="w-full">
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
      <Message align="end" className="w-full">
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
      <Message align="start" className="w-full">
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
      <Message align="end" className="w-full">
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
    </>
  );
}

// ─── States (Figma showcase) ──────────────────────────────────────────────────

/** `State=Empty` — spinner circle, title and copy where the thread will go. */
export const Empty: Story = {
  render: (args) => (
    <MessageScroller className="h-[600px] w-[380px]" {...args}>
      <MessageScrollerHeader
        title="Streaming Messages"
        description="Auto-scroll follows the live edge of the conversation."
        onRefresh={() => {}}
      />
      <MessageScrollerEmpty title="Ready to Stream">
        Press send to stream a<br />
        scripted launch summary.
      </MessageScrollerEmpty>
      <MessageScrollerInput onAttach={() => {}} onSend={() => {}}>
        <p>{DRAFT}</p>
      </MessageScrollerInput>
    </MessageScroller>
  ),
};

/** `State=Scrolled` — a thread of messages with the "Scroll to bottom" pill. */
export const Scrolled: Story = {
  render: (args) => (
    <MessageScroller className="h-[600px] w-[380px]" {...args}>
      <MessageScrollerHeader
        title="Streaming Messages"
        description="Auto-scroll follows the live edge of the conversation."
        onRefresh={() => {}}
      />
      <MessageScrollerMessages showScrollToBottom onScrollToBottom={() => {}}>
        <Thread />
      </MessageScrollerMessages>
      <MessageScrollerInput onAttach={() => {}} onSend={() => {}}>
        <p>{DRAFT}</p>
      </MessageScrollerInput>
    </MessageScroller>
  ),
};

/** Both states side by side, mirroring the Figma component set. */
export const AllStates: Story = {
  render: () => (
    <div className="flex items-start gap-10">
      <MessageScroller className="h-[600px] w-[380px]">
        <MessageScrollerHeader
          title="Streaming Messages"
          description="Auto-scroll follows the live edge of the conversation."
          onRefresh={() => {}}
        />
        <MessageScrollerEmpty title="Ready to Stream">
          Press send to stream a<br />
          scripted launch summary.
        </MessageScrollerEmpty>
        <MessageScrollerInput onAttach={() => {}} onSend={() => {}}>
          <p>{DRAFT}</p>
        </MessageScrollerInput>
      </MessageScroller>
      <MessageScroller className="h-[600px] w-[380px]">
        <MessageScrollerHeader
          title="Streaming Messages"
          description="Auto-scroll follows the live edge of the conversation."
          onRefresh={() => {}}
        />
        <MessageScrollerMessages showScrollToBottom onScrollToBottom={() => {}}>
          <Thread />
        </MessageScrollerMessages>
        <MessageScrollerInput onAttach={() => {}} onSend={() => {}}>
          <p>{DRAFT}</p>
        </MessageScrollerInput>
      </MessageScroller>
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
    <MessageScroller className="h-[600px] w-[380px]">
      <MessageScrollerHeader
        title="Streaming Messages"
        description="Auto-scroll follows the live edge of the conversation."
        onRefresh={() => {}}
      />
      <MessageScrollerMessages showScrollToBottom onScrollToBottom={() => {}}>
        <Thread />
      </MessageScrollerMessages>
      <MessageScrollerInput onAttach={() => {}} onSend={() => {}}>
        <p>{DRAFT}</p>
      </MessageScrollerInput>
    </MessageScroller>
  ),
};
