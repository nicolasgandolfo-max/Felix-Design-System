import type { Meta, StoryObj } from "@storybook/react";
import { Marker } from "@felix/ui";
import { ClockIcon } from "@phosphor-icons/react";

/**
 * **Marker** — a low-emphasis line inside a chat thread that is not a
 * message: a system event or a date divider. Maps to Figma `Marker`
 * (node `1874:2193`).
 *
 * - **default** — icon + text (Phosphor `GitBranch` by default)
 * - **separator** — centered text between two hairlines
 * - **border** — icon + text, closed by a bottom hairline
 */
const meta = {
  title: "Components/Atoms/Marker",
  component: Marker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { variant: "default", children: "Switched to a new branch" },
  argTypes: {
    variant: {
      description: "Visual style of the marker.",
      control: { type: "select" },
      options: ["default", "separator", "border"],
      table: {
        type: { summary: "MarkerVariant" },
        defaultValue: { summary: "default" },
      },
    },
    icon: {
      description:
        "Leading icon for `default` / `border`. Defaults to `GitBranch`; pass `null` to omit.",
      control: false,
      table: { type: { summary: "ReactNode | null" } },
    },
    children: {
      description: "Text of the marker.",
      control: "text",
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

/** `separator` — a date divider between two hairlines. */
export const Separator: Story = {
  args: { variant: "separator", children: "Today" },
};

/** `border` — same as `default`, closed by a bottom hairline. */
export const Border: Story = {
  args: { variant: "border", children: "Switched to release-candidate" },
};

// ─── Variants (Figma showcase) ────────────────────────────────────────────────

/** All three variants stacked, mirroring the Figma component set. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Marker>Switched to a new branch</Marker>
      <Marker variant="separator">Today</Marker>
      <Marker variant="border">Switched to release-candidate</Marker>
    </div>
  ),
};

// ─── Composition ──────────────────────────────────────────────────────────────

/** Any Phosphor icon can replace the default `GitBranch`. */
export const CustomIcon: Story = {
  args: { icon: <ClockIcon />, children: "Conversation paused for 2 hours" },
};

/** `icon={null}` renders text only. */
export const NoIcon: Story = {
  args: { icon: null, children: "Conversation resumed" },
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
    <div className="flex flex-col gap-4">
      <Marker>Switched to a new branch</Marker>
      <Marker variant="separator">Today</Marker>
      <Marker variant="border">Switched to release-candidate</Marker>
    </div>
  ),
};
