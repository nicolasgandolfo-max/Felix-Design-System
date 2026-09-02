import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

// Keep this union in sync with the `variant` keys declared on
// `bubbleVariants` below.
export type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive";

// ─── Variants (Felix DS — Figma: Bubble, node 1877:2227) ─────────────────────

const bubbleVariants = cva(
  cn(
    "inline-flex max-w-full flex-col items-start overflow-clip",
    "font-sans text-sm leading-body tracking-normal break-words"
  ),
  {
    variants: {
      variant: {
        // Brand turquoise surface — the sender's own messages.
        default: "rounded-2xl bg-primary p-3 text-primary-foreground",
        // Soft brand surface for low-emphasis replies.
        secondary:
          "rounded-2xl bg-interactive-primary-disabled p-3 text-foreground",
        // Neutral surface — the other party / assistant.
        // Figma binds the text to `--secondary` (#636158 = neutral-700); the
        // library's semantic `--secondary` is a different value, so the
        // primitive is used to keep the design 1:1.
        muted:
          "rounded-2xl bg-muted p-3 text-(--neutral-700) dark:text-(--neutral-300)",
        // Light turquoise tint. Fixed slate text keeps contrast on the
        // mode-invariant tint in dark mode.
        tinted: "rounded-2xl bg-turquoise-100 p-3 text-(--slate-800)",
        // Card surface with a hairline border.
        outline: "rounded-2xl border border-border bg-card p-3 text-foreground",
        // Unframed content — e.g. an AI response or a markdown block.
        ghost: "text-foreground",
        // Error surface with destructive text.
        destructive: "rounded-2xl bg-status-error-bg p-3 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BubbleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {
  /**
   * Visual style of the bubble.
   * - `default` — brand turquoise (own messages)
   * - `secondary` — soft turquoise
   * - `muted` — neutral stone (other party)
   * - `tinted` — light turquoise tint
   * - `outline` — card surface with border
   * - `ghost` — no frame, just text
   * - `destructive` — error surface
   * @default "default"
   */
  variant?: BubbleVariant;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Bubble — the framed body of a chat message. It hugs its content; constrain
 * the width from the parent (e.g. `max-w-[284px]`) or let `Message` handle it.
 *
 * ```tsx
 * <Bubble>Hey! How's your project going?</Bubble>
 * <Bubble variant="muted">Let me check on that for you.</Bubble>
 * <Bubble variant="destructive">Error: Something went wrong.</Bubble>
 * ```
 */
const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ variant = "default", className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot="bubble"
      data-variant={variant}
      className={cn(bubbleVariants({ variant }), className)}
      {...rest}
    />
  )
);
Bubble.displayName = "Bubble";

export { Bubble, bubbleVariants };
