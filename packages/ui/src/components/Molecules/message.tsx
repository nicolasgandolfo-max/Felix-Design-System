"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

// Keep this union in sync with the `align` keys declared on
// `messageVariants` below.
export type MessageAlign = "start" | "end";

// ─── Variants (Felix DS — Figma: Message, node 2070:3173) ────────────────────

const messageVariants = cva("flex w-full items-end gap-2", {
  variants: {
    align: {
      // Avatar on the left, content aligned to the start (other party).
      start: "flex-row",
      // Avatar on the right, content aligned to the end (own messages).
      end: "flex-row-reverse",
    },
  },
  defaultVariants: {
    align: "start",
  },
});

const messageContentVariants = cva(
  "flex min-w-px flex-1 flex-col gap-1.5 overflow-clip",
  {
    variants: {
      align: {
        start: "items-start",
        end: "items-end",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
);

const messageMetaVariants = cva(
  cn(
    "flex items-start px-3 whitespace-nowrap",
    "font-sans text-xs leading-tight tracking-caption text-muted-foreground"
  ),
  {
    variants: {
      align: {
        start: "",
        end: "justify-end",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
);

// ─── Align context ────────────────────────────────────────────────────────────

const MessageAlignContext = React.createContext<MessageAlign>("start");

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface MessageProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  /**
   * Which side the message hangs from. `start` puts the avatar on the left
   * and aligns the content to the left (the other party); `end` mirrors it
   * (own messages). Sub-parts read this value from context.
   * @default "start"
   */
  align?: MessageAlign;
}

/**
 * Message — one entry in a chat thread: an optional avatar plus a column with
 * a header (sender), a `Bubble`, and a footer (time / read state).
 *
 * ```tsx
 * <Message align="start">
 *   <MessageAvatar><Avatar size="sm" initials="A" status="success" /></MessageAvatar>
 *   <MessageContent>
 *     <MessageHeader>Oliver</MessageHeader>
 *     <Bubble variant="muted">Let me check on that for you.</Bubble>
 *     <MessageFooter>2:32 PM</MessageFooter>
 *   </MessageContent>
 * </Message>
 * ```
 *
 * Always write the avatar first in JSX — `align="end"` flips the visual order.
 */
const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ align = "start", className, ...rest }, ref) => (
    <MessageAlignContext.Provider value={align}>
      <div
        ref={ref}
        data-slot="message"
        data-align={align}
        className={cn(messageVariants({ align }), className)}
        {...rest}
      />
    </MessageAlignContext.Provider>
  )
);
Message.displayName = "Message";

// ─── Avatar slot ──────────────────────────────────────────────────────────────

export interface MessageAvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * 32 px slot for the sender's `Avatar` (use `size="sm"`). Sits at the bottom
 * edge of the message, next to the footer.
 */
const MessageAvatar = React.forwardRef<HTMLDivElement, MessageAvatarProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot="message-avatar"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center",
        className
      )}
      {...rest}
    />
  )
);
MessageAvatar.displayName = "MessageAvatar";

// ─── Content ──────────────────────────────────────────────────────────────────

export interface MessageContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Column holding header, bubble and footer; aligned by the parent `align`. */
const MessageContent = React.forwardRef<HTMLDivElement, MessageContentProps>(
  ({ className, ...rest }, ref) => {
    const align = React.useContext(MessageAlignContext);
    return (
      <div
        ref={ref}
        data-slot="message-content"
        className={cn(messageContentVariants({ align }), className)}
        {...rest}
      />
    );
  }
);
MessageContent.displayName = "MessageContent";

// ─── Header ───────────────────────────────────────────────────────────────────

export interface MessageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Caption above the bubble — typically the sender's name. */
const MessageHeader = React.forwardRef<HTMLDivElement, MessageHeaderProps>(
  ({ className, ...rest }, ref) => {
    const align = React.useContext(MessageAlignContext);
    return (
      <div
        ref={ref}
        data-slot="message-header"
        className={cn(messageMetaVariants({ align }), className)}
        {...rest}
      />
    );
  }
);
MessageHeader.displayName = "MessageHeader";

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface MessageFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Caption below the bubble — typically time and read state. */
const MessageFooter = React.forwardRef<HTMLDivElement, MessageFooterProps>(
  ({ className, ...rest }, ref) => {
    const align = React.useContext(MessageAlignContext);
    return (
      <div
        ref={ref}
        data-slot="message-footer"
        className={cn(messageMetaVariants({ align }), className)}
        {...rest}
      />
    );
  }
);
MessageFooter.displayName = "MessageFooter";

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
  messageVariants,
  messageContentVariants,
  messageMetaVariants,
};
