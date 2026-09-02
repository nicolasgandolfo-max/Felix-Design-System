"use client";

import * as React from "react";
import { File, Image, SpinnerGap, X } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { Progress } from "../Atoms/progress";
import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AttachmentSize = "sm" | "md" | "lg";
export type AttachmentState = "default" | "error" | "loading";
/** `file` is Figma's `Type=Default`; `image` is `Type=image`. */
export type AttachmentType = "file" | "image";

// ─── Variants (Felix DS — Figma: Attachment, node 1907:2614) ─────────────────

/**
 * Two layouts exist in Figma: a horizontal row (every file size, plus the
 * SM/MD image sizes) and a vertical 160 px card (LG image only).
 */
type AttachmentLayout = "row" | "card";

const attachmentVariants = cva(
  "relative inline-flex rounded-lg border font-sans",
  {
    variants: {
      state: {
        default: "border-border bg-card",
        loading: "border-border bg-card",
        error:
          "border-interactive-danger-active bg-interactive-danger-disabled",
      },
      layout: {
        row: "items-center",
        card: "w-40 flex-col items-start overflow-clip",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { layout: "row", size: "sm", className: "gap-2 p-2" },
      { layout: "row", size: "md", className: "gap-3 p-3" },
      { layout: "row", size: "lg", className: "gap-4 p-4" },
    ],
    defaultVariants: {
      state: "default",
      layout: "row",
      size: "sm",
    },
  }
);

const attachmentIconWrapVariants = cva(
  // Only the direct-child svg is sized here: on the LG image card the close
  // button (with its own 14 px icon) also lives inside this wrapper.
  "flex shrink-0 items-center justify-center overflow-clip [&>svg]:shrink-0",
  {
    variants: {
      state: {
        default: "bg-muted text-foreground",
        loading: "bg-muted text-foreground",
        error: "bg-(--orange-100) text-destructive",
      },
      layout: {
        row: "",
        card: "h-30 w-full [&>svg]:size-9",
      },
      type: {
        file: "rounded-md",
        image: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { layout: "row", size: "sm", className: "size-8 [&>svg]:size-4" },
      { layout: "row", size: "md", className: "size-10 [&>svg]:size-5" },
      { layout: "row", size: "lg", className: "size-12 [&>svg]:size-6" },
      { layout: "row", type: "image", size: "sm", className: "rounded-md" },
      // Figma: the MD image thumbnail keeps a 16 px glyph inside its 40 px box.
      {
        layout: "row",
        type: "image",
        size: "md",
        className: "rounded-[6px] [&>svg]:size-4",
      },
    ],
    defaultVariants: {
      state: "default",
      layout: "row",
      type: "file",
      size: "sm",
    },
  }
);

const attachmentInfoVariants = cva("flex min-w-0 flex-col gap-0.5", {
  variants: {
    layout: {
      row: "overflow-clip whitespace-nowrap",
      card: "w-full px-2.5 pt-2 pb-2.5",
    },
  },
  defaultVariants: {
    layout: "row",
  },
});

const attachmentNameVariants = cva("text-foreground", {
  variants: {
    layout: {
      row: "",
      card: "w-full truncate text-sm leading-body",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      layout: "row",
      size: "sm",
      className: "text-xs leading-tight tracking-caption",
    },
    { layout: "row", size: "md", className: "text-sm leading-body" },
    { layout: "row", size: "lg", className: "text-base leading-tight" },
  ],
  defaultVariants: {
    layout: "row",
    size: "sm",
  },
});

const attachmentMetaVariants = cva("", {
  variants: {
    state: {
      default: "text-muted-foreground",
      // Loading always uses the caption size, whatever the attachment size.
      loading:
        "w-full text-xs leading-tight tracking-caption text-muted-foreground",
      error: "text-destructive",
    },
    layout: {
      row: "",
      card: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      state: ["default", "error"],
      layout: "row",
      size: "sm",
      className: "text-xxs leading-display",
    },
    {
      state: ["default", "error"],
      layout: "row",
      size: "md",
      className: "text-xs leading-tight tracking-caption",
    },
    {
      state: ["default", "error"],
      layout: "row",
      size: "lg",
      className: "text-sm leading-body",
    },
    {
      state: ["default", "error"],
      layout: "card",
      className: "text-xs leading-tight tracking-caption",
    },
  ],
  defaultVariants: {
    state: "default",
    layout: "row",
    size: "sm",
  },
});

const attachmentCloseVariants = cva(
  cn(
    "flex shrink-0 items-center justify-center rounded-full text-foreground",
    "outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "[&_svg]:shrink-0"
  ),
  {
    variants: {
      layout: {
        row: "",
        // Floats over the thumbnail on the LG image card.
        card: "absolute top-1.5 right-1 size-[26px] bg-black/15 [&_svg]:size-3.5",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { layout: "row", size: "sm", className: "size-6 [&_svg]:size-3.5" },
      { layout: "row", size: "md", className: "size-7 [&_svg]:size-4" },
      { layout: "row", size: "lg", className: "size-8 [&_svg]:size-[18px]" },
    ],
    defaultVariants: {
      layout: "row",
      size: "sm",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AttachmentProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    Pick<VariantProps<typeof attachmentVariants>, "size" | "state"> {
  /**
   * Scale of the chip: `sm` (32 px icon), `md` (40 px), `lg` (48 px). For
   * `type="image"`, `lg` switches to a vertical 160 px card with a 120 px
   * thumbnail.
   * @default "sm"
   */
  size?: AttachmentSize;
  /**
   * Upload state. `error` paints the chip in the danger palette, `loading`
   * swaps the icon for a spinner and shows a progress bar under the meta.
   * @default "default"
   */
  state?: AttachmentState;
  /**
   * Kind of attachment — drives the placeholder icon and the LG layout.
   * @default "file"
   */
  type?: AttachmentType;
  /** File name, e.g. `report-final.pdf`. */
  name: React.ReactNode;
  /**
   * Secondary line, e.g. `PDF · 2.4 MB` or `Uploading... 45%`. Rendered in
   * the destructive colour when `state="error"`.
   */
  meta?: React.ReactNode;
  /**
   * Upload progress 0–100. Only used by `state="loading"` to size the bar.
   * @default 45
   */
  progress?: number;
  /**
   * Override the placeholder icon (defaults to Phosphor `File` / `Image`,
   * or `SpinnerGap` while loading).
   */
  icon?: React.ReactNode;
  /** Called when the close (×) button is pressed. */
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible label of the close button.
   * @default "Remove attachment"
   */
  removeLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Attachment — a file or image chip attached to a chat message or composer.
 * Three sizes × three states × two types, mirroring the Figma component set.
 *
 * ```tsx
 * <Attachment name="report-final.pdf" meta="PDF · 2.4 MB" />
 * <Attachment type="image" size="lg" name="photo-vacation.jpg" meta="JPG · 3.8 MB" />
 * <Attachment state="loading" progress={45} name="report-final.pdf" meta="Uploading... 45%" />
 * <Attachment state="error" name="report-final.pdf" meta="PDF · 2.4 MB" />
 * ```
 */
const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      size = "sm",
      state = "default",
      type = "file",
      name,
      meta,
      progress = 45,
      icon,
      onRemove,
      removeLabel = "Remove attachment",
      className,
      ...rest
    },
    ref
  ) => {
    const layout: AttachmentLayout =
      type === "image" && size === "lg" ? "card" : "row";

    const resolvedIcon =
      icon ??
      (state === "loading" ? (
        <SpinnerGap aria-hidden="true" />
      ) : type === "image" ? (
        <Image aria-hidden="true" />
      ) : (
        <File aria-hidden="true" />
      ));

    const closeButton = (
      <button
        type="button"
        data-slot="attachment-close"
        aria-label={removeLabel}
        onClick={onRemove}
        className={cn(attachmentCloseVariants({ layout, size }))}
      >
        <X aria-hidden="true" />
      </button>
    );

    return (
      <div
        ref={ref}
        data-slot="attachment"
        data-size={size}
        data-state={state}
        data-type={type}
        className={cn(attachmentVariants({ state, layout, size }), className)}
        {...rest}
      >
        <div
          data-slot="attachment-icon"
          className={cn(
            attachmentIconWrapVariants({ state, layout, type, size })
          )}
        >
          {resolvedIcon}
          {layout === "card" ? closeButton : null}
        </div>

        <div
          data-slot="attachment-info"
          className={cn(attachmentInfoVariants({ layout }))}
        >
          <p
            data-slot="attachment-name"
            className={cn(attachmentNameVariants({ layout, size }))}
          >
            {name}
          </p>
          {meta !== undefined && meta !== null ? (
            <p
              data-slot="attachment-meta"
              className={cn(attachmentMetaVariants({ state, layout, size }))}
            >
              {meta}
            </p>
          ) : null}
          {state === "loading" ? (
            <Progress
              data-slot="attachment-progress"
              size="xs"
              value={progress}
              aria-label={typeof meta === "string" ? meta : "Upload progress"}
            />
          ) : null}
        </div>

        {layout === "row" ? closeButton : null}
      </div>
    );
  }
);
Attachment.displayName = "Attachment";

export {
  Attachment,
  attachmentVariants,
  attachmentIconWrapVariants,
  attachmentInfoVariants,
  attachmentNameVariants,
  attachmentMetaVariants,
  attachmentCloseVariants,
};
