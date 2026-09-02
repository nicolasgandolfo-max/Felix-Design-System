"use client";

import * as React from "react";
import {
  ArrowUp,
  ArrowsClockwise,
  Plus,
  SpinnerGap,
} from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Shared styles (Felix DS — Figma: Message Scroller, node 1901:3567) ──────

/** 36 px circular action button used by the header and the input block. */
const circleButtonClassName = cn(
  "flex size-9 shrink-0 items-center justify-center rounded-full",
  "outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "[&_svg]:shrink-0"
);

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * MessageScroller — the framed chat surface: a header, either an empty state
 * or the scrollable list of `Message`s, and the input block at the bottom.
 *
 * Figma's `State=Empty` / `State=Scrolled` are expressed by composition —
 * render `MessageScrollerEmpty` or `MessageScrollerMessages` as the middle
 * child. Give the root a size (Figma uses 380 × 600).
 *
 * ```tsx
 * <MessageScroller className="h-[600px] w-[380px]">
 *   <MessageScrollerHeader title="Streaming Messages" description="…" onRefresh={reset} />
 *   <MessageScrollerMessages showScrollToBottom onScrollToBottom={jump}>
 *     <Message>…</Message>
 *   </MessageScrollerMessages>
 *   <MessageScrollerInput onAttach={attach} onSend={send}>
 *     <p>I'm building a chat for our app…</p>
 *   </MessageScrollerInput>
 * </MessageScroller>
 * ```
 */
const MessageScroller = React.forwardRef<HTMLDivElement, MessageScrollerProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot="message-scroller"
      className={cn(
        "flex flex-col items-start overflow-clip rounded-2xl border border-border bg-background",
        className
      )}
      {...rest}
    />
  )
);
MessageScroller.displayName = "MessageScroller";

// ─── Header ───────────────────────────────────────────────────────────────────

export interface MessageScrollerHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Heading of the conversation (Plain Extrabold, 20 px). */
  title: React.ReactNode;
  /** One-line subtitle under the heading; clipped, never wrapped. */
  description?: React.ReactNode;
  /** When provided, renders the circular refresh button on the right. */
  onRefresh?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible label of the refresh button.
   * @default "Refresh"
   */
  refreshLabel?: string;
}

const MessageScrollerHeader = React.forwardRef<
  HTMLDivElement,
  MessageScrollerHeaderProps
>(
  (
    {
      title,
      description,
      onRefresh,
      refreshLabel = "Refresh",
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="message-scroller-header"
      className={cn(
        "flex w-full shrink-0 items-center overflow-clip border-b border-border bg-background p-4",
        className
      )}
      {...rest}
    >
      <div
        data-slot="message-scroller-header-text"
        className="flex min-w-px flex-1 flex-col items-start gap-1 overflow-clip whitespace-nowrap"
      >
        <p
          data-slot="message-scroller-title"
          className="font-heading text-lg font-extrabold leading-body tracking-normal text-foreground"
        >
          {title}
        </p>
        {description !== undefined && description !== null ? (
          <p
            data-slot="message-scroller-description"
            className="font-sans text-sm leading-body tracking-normal text-muted-foreground"
          >
            {description}
          </p>
        ) : null}
      </div>
      {onRefresh ? (
        <button
          type="button"
          data-slot="message-scroller-refresh"
          aria-label={refreshLabel}
          onClick={onRefresh}
          className={cn(
            circleButtonClassName,
            "bg-muted text-foreground [&_svg]:size-5"
          )}
        >
          <ArrowsClockwise aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
);
MessageScrollerHeader.displayName = "MessageScrollerHeader";

// ─── Empty state ──────────────────────────────────────────────────────────────

export interface MessageScrollerEmptyProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Heading of the empty state, e.g. "Ready to Stream". */
  title?: React.ReactNode;
  /**
   * Icon shown inside the 48 px muted circle. Defaults to Phosphor
   * `SpinnerGap`. Pass `null` to omit the circle.
   */
  icon?: React.ReactNode | null;
  /** Supporting copy under the title (body-sm, muted, centered). */
  children?: React.ReactNode;
}

const MessageScrollerEmpty = React.forwardRef<
  HTMLDivElement,
  MessageScrollerEmptyProps
>(({ title, icon, className, children, ...rest }, ref) => {
  const resolvedIcon =
    icon === null ? null : (icon ?? <SpinnerGap aria-hidden="true" />);
  return (
    <div
      ref={ref}
      data-slot="message-scroller-empty"
      className={cn(
        "flex min-h-px w-full flex-1 flex-col items-center justify-center gap-3 overflow-clip",
        className
      )}
      {...rest}
    >
      {resolvedIcon ? (
        <div
          data-slot="message-scroller-empty-icon"
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center overflow-clip rounded-full bg-muted text-foreground [&_svg]:size-6 [&_svg]:shrink-0"
        >
          {resolvedIcon}
        </div>
      ) : null}
      {title !== undefined && title !== null ? (
        <p
          data-slot="message-scroller-empty-title"
          className="shrink-0 text-center font-heading text-lg font-extrabold leading-body tracking-normal text-foreground whitespace-nowrap"
        >
          {title}
        </p>
      ) : null}
      {children !== undefined && children !== null ? (
        <div
          data-slot="message-scroller-empty-description"
          className="shrink-0 text-center font-sans text-sm leading-body tracking-normal text-muted-foreground"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
});
MessageScrollerEmpty.displayName = "MessageScrollerEmpty";

// ─── Messages ─────────────────────────────────────────────────────────────────

export interface MessageScrollerMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show the floating "Scroll to bottom" pill over the last messages.
   * @default false
   */
  showScrollToBottom?: boolean;
  /** Called when the "Scroll to bottom" pill is pressed. */
  onScrollToBottom?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Text of the "Scroll to bottom" pill.
   * @default "Scroll to bottom"
   */
  scrollToBottomLabel?: React.ReactNode;
  /**
   * Ref to the scrollable viewport (the element that actually overflows), for
   * `scrollTo` / `scrollIntoView` logic. `ref` points at the outer wrapper.
   */
  viewportRef?: React.Ref<HTMLDivElement>;
}

const MessageScrollerMessages = React.forwardRef<
  HTMLDivElement,
  MessageScrollerMessagesProps
>(
  (
    {
      showScrollToBottom = false,
      onScrollToBottom,
      scrollToBottomLabel = "Scroll to bottom",
      viewportRef,
      className,
      children,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="message-scroller-messages"
      className={cn(
        "relative flex min-h-px w-full flex-1 flex-col items-start justify-end gap-1 overflow-clip",
        className
      )}
      {...rest}
    >
      <div
        ref={viewportRef}
        data-slot="message-scroller-viewport"
        // `[&>:first-child]:mt-auto` pins the thread to the bottom while
        // keeping the top reachable when it overflows (unlike `justify-end`).
        className="flex min-h-px w-full flex-1 flex-col items-center gap-3 overflow-x-clip overflow-y-auto p-3 [&>:first-child]:mt-auto"
      >
        {children}
      </div>
      {showScrollToBottom ? (
        <div
          data-slot="message-scroller-scroll-wrap"
          className="pointer-events-none absolute right-2.5 bottom-9 left-3 flex h-10 items-center justify-center overflow-clip"
        >
          <button
            type="button"
            data-slot="message-scroller-scroll-to-bottom"
            onClick={onScrollToBottom}
            className={cn(
              "pointer-events-auto flex shrink-0 items-center justify-center gap-1.5 overflow-clip rounded-[20px] border border-border bg-card px-3 py-2",
              "font-sans text-xs leading-tight tracking-caption text-foreground whitespace-nowrap",
              "shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]",
              "outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "[&_svg]:size-4 [&_svg]:shrink-0"
            )}
          >
            <ArrowUp aria-hidden="true" />
            {scrollToBottomLabel}
          </button>
        </div>
      ) : null}
    </div>
  )
);
MessageScrollerMessages.displayName = "MessageScrollerMessages";

// ─── Input block ──────────────────────────────────────────────────────────────

export interface MessageScrollerInputProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Called when the attach (+) button is pressed. */
  onAttach?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible label of the attach button.
   * @default "Attach"
   */
  attachLabel?: string;
  /** Called when the send (↑) button is pressed. */
  onSend?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible label of the send button.
   * @default "Send"
   */
  sendLabel?: string;
  /** The composer content — draft text or a form field. */
  children?: React.ReactNode;
}

const MessageScrollerInput = React.forwardRef<
  HTMLDivElement,
  MessageScrollerInputProps
>(
  (
    {
      onAttach,
      attachLabel = "Attach",
      onSend,
      sendLabel = "Send",
      className,
      children,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="message-scroller-input"
      className={cn(
        "flex w-full shrink-0 flex-col items-start gap-3 overflow-clip rounded-[20px] bg-muted p-3",
        className
      )}
      {...rest}
    >
      <div
        data-slot="message-scroller-input-content"
        className="w-full font-sans text-base leading-tight tracking-normal text-foreground break-words"
      >
        {children}
      </div>
      <div
        data-slot="message-scroller-input-actions"
        className="flex w-full items-center overflow-clip"
      >
        <button
          type="button"
          data-slot="message-scroller-attach"
          aria-label={attachLabel}
          onClick={onAttach}
          className={cn(
            circleButtonClassName,
            "border border-border bg-card text-foreground [&_svg]:size-[18px]"
          )}
        >
          <Plus aria-hidden="true" />
        </button>
        <span aria-hidden="true" className="h-px min-w-px flex-1" />
        <button
          type="button"
          data-slot="message-scroller-send"
          aria-label={sendLabel}
          onClick={onSend}
          className={cn(
            circleButtonClassName,
            "bg-primary text-primary-foreground [&_svg]:size-5"
          )}
        >
          <ArrowUp aria-hidden="true" />
        </button>
      </div>
    </div>
  )
);
MessageScrollerInput.displayName = "MessageScrollerInput";

export {
  MessageScroller,
  MessageScrollerHeader,
  MessageScrollerEmpty,
  MessageScrollerMessages,
  MessageScrollerInput,
};
