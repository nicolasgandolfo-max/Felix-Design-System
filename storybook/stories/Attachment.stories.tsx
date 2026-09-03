import type { Meta, StoryObj } from "@storybook/react";
import { Attachment } from "@felix/ui";

/**
 * **Attachment** — a file or image chip attached to a chat message or
 * composer. Maps to Figma `Attachment` (node `1907:2614`).
 *
 * - **size** — `sm` / `md` / `lg`. For `type="image"`, `lg` becomes a
 *   vertical 160 px card with a 120 px thumbnail.
 * - **state** — `default`, `error` (danger palette), `loading` (spinner +
 *   progress bar).
 * - **type** — `file` (Figma `Default`) or `image`.
 */
const meta = {
  title: "Components/Molecules/Attachment",
  component: Attachment,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "sm",
    state: "default",
    type: "file",
    name: "report-final.pdf",
    meta: "PDF · 2.4 MB",
  },
  argTypes: {
    size: {
      description: "Scale of the chip.",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "AttachmentSize" },
        defaultValue: { summary: "sm" },
      },
    },
    state: {
      description: "Upload state.",
      control: { type: "select" },
      options: ["default", "error", "loading"],
      table: {
        type: { summary: "AttachmentState" },
        defaultValue: { summary: "default" },
      },
    },
    type: {
      description: "Kind of attachment — drives the icon and the LG layout.",
      control: { type: "radio" },
      options: ["file", "image"],
      table: {
        type: { summary: "AttachmentType" },
        defaultValue: { summary: "file" },
      },
    },
    name: { description: "File name.", control: "text" },
    meta: {
      description: "Secondary line (format · size, or upload progress).",
      control: "text",
    },
    progress: {
      description: 'Upload progress 0–100, used by `state="loading"`.',
      control: { type: "range", min: 0, max: 100 },
      table: { defaultValue: { summary: "45" } },
    },
    icon: {
      description: "Override the placeholder icon.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    onRemove: {
      description: "Called when the close (×) button is pressed.",
      action: "remove",
    },
    removeLabel: {
      description: "Accessible label of the close button.",
      control: "text",
      table: { defaultValue: { summary: "Remove attachment" } },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const Image: Story = {
  args: { type: "image", name: "photo-vacation.jpg", meta: "JPG · 3.8 MB" },
};

export const Error: Story = {
  args: { state: "error" },
};

export const Loading: Story = {
  args: { state: "loading", meta: "Uploading... 45%", progress: 45 },
};

/** Large image — the vertical card with a floating close button. */
export const ImageCard: Story = {
  args: {
    type: "image",
    size: "lg",
    name: "photo-vacation.jpg",
    meta: "JPG · 3.8 MB",
  },
};

// ─── Matrix (Figma showcase) ──────────────────────────────────────────────────

const STATES = ["default", "error", "loading"] as const;
const SIZES = ["sm", "md", "lg"] as const;

/** Every size × state × type, laid out like the Figma component set. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {STATES.map((state) => (
        <div key={state} className="flex items-start gap-5">
          <span className="w-16 shrink-0 pt-2 font-sans text-xs text-muted-foreground capitalize">
            {state}
          </span>
          {SIZES.map((size) => (
            <Attachment
              key={`file-${size}`}
              size={size}
              state={state}
              type="file"
              name="report-final.pdf"
              meta={state === "loading" ? "Uploading... 45%" : "PDF · 2.4 MB"}
            />
          ))}
          {SIZES.map((size) => (
            <Attachment
              key={`image-${size}`}
              size={size}
              state={state}
              type="image"
              name="photo-vacation.jpg"
              meta={state === "loading" ? "Uploading... 45%" : "JPG · 3.8 MB"}
            />
          ))}
        </div>
      ))}
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
    <div className="flex items-start gap-5">
      <Attachment size="md" name="report-final.pdf" meta="PDF · 2.4 MB" />
      <Attachment
        size="md"
        state="error"
        name="report-final.pdf"
        meta="PDF · 2.4 MB"
      />
      <Attachment
        size="md"
        state="loading"
        name="report-final.pdf"
        meta="Uploading... 45%"
      />
      <Attachment
        type="image"
        size="lg"
        name="photo-vacation.jpg"
        meta="JPG · 3.8 MB"
      />
    </div>
  ),
};
