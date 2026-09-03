import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Bubble } from "../Atoms/bubble";
import { Message, MessageContent, MessageHeader } from "../Molecules/message";
import {
  MessageScroller,
  MessageScrollerEmpty,
  MessageScrollerHeader,
  MessageScrollerInput,
  MessageScrollerMessages,
} from "./message-scroller";

function renderEmpty(onRefresh?: () => void) {
  return render(
    <MessageScroller className="h-[600px] w-[380px]">
      <MessageScrollerHeader
        title="Streaming Messages"
        description="Auto-scroll follows the live edge of the conversation."
        onRefresh={onRefresh}
      />
      <MessageScrollerEmpty title="Ready to Stream">
        Press send to stream a scripted launch summary.
      </MessageScrollerEmpty>
      <MessageScrollerInput>
        <p>I'm building a chat for our app…</p>
      </MessageScrollerInput>
    </MessageScroller>
  );
}

describe("MessageScroller", () => {
  it("renders header title and description", () => {
    renderEmpty();
    expect(screen.getByText("Streaming Messages")).toBeInTheDocument();
    expect(
      screen.getByText("Auto-scroll follows the live edge of the conversation.")
    ).toBeInTheDocument();
  });

  it("renders the empty state with its default spinner icon", () => {
    const { container } = renderEmpty();
    expect(screen.getByText("Ready to Stream")).toBeInTheDocument();
    expect(
      screen.getByText("Press send to stream a scripted launch summary.")
    ).toBeInTheDocument();
    const icon = container.querySelector(
      "[data-slot='message-scroller-empty-icon']"
    );
    expect(icon).toBeInTheDocument();
    expect(icon!.querySelector("svg")).toBeInTheDocument();
  });

  it("omits the empty-state icon when `icon={null}`", () => {
    const { container } = render(
      <MessageScrollerEmpty icon={null} title="Nothing yet" />
    );
    expect(
      container.querySelector("[data-slot='message-scroller-empty-icon']")
    ).toBeNull();
  });

  it("renders the refresh button only when onRefresh is provided", () => {
    const onRefresh = vi.fn();
    const { unmount } = renderEmpty(onRefresh);
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
    unmount();

    renderEmpty();
    expect(screen.queryByRole("button", { name: "Refresh" })).toBeNull();
  });

  it("renders attach and send buttons and wires their handlers", () => {
    const onAttach = vi.fn();
    const onSend = vi.fn();
    render(
      <MessageScrollerInput
        onAttach={onAttach}
        onSend={onSend}
        attachLabel="Adjuntar"
        sendLabel="Enviar"
      >
        <p>Draft</p>
      </MessageScrollerInput>
    );
    fireEvent.click(screen.getByRole("button", { name: "Adjuntar" }));
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it("renders messages inside the scroll viewport and exposes viewportRef", () => {
    const viewportRef = createRef<HTMLDivElement>();
    const { container } = render(
      <MessageScrollerMessages viewportRef={viewportRef}>
        <Message>
          <MessageContent>
            <MessageHeader>Oliver</MessageHeader>
            <Bubble variant="muted">Let me check on that for you.</Bubble>
          </MessageContent>
        </Message>
      </MessageScrollerMessages>
    );
    const viewport = container.querySelector(
      "[data-slot='message-scroller-viewport']"
    );
    expect(viewport).toBeInTheDocument();
    expect(viewportRef.current).toBe(viewport);
    expect(
      viewport!.querySelector("[data-slot='message']")
    ).toBeInTheDocument();
  });

  it("shows the scroll-to-bottom pill only when requested", () => {
    const onScrollToBottom = vi.fn();
    const { rerender } = render(<MessageScrollerMessages />);
    expect(
      screen.queryByRole("button", { name: "Scroll to bottom" })
    ).toBeNull();

    rerender(
      <MessageScrollerMessages
        showScrollToBottom
        onScrollToBottom={onScrollToBottom}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Scroll to bottom" }));
    expect(onScrollToBottom).toHaveBeenCalledTimes(1);
  });

  it("sets expected data-slot values", () => {
    const { container } = renderEmpty(() => {});
    for (const slot of [
      "message-scroller",
      "message-scroller-header",
      "message-scroller-title",
      "message-scroller-description",
      "message-scroller-refresh",
      "message-scroller-empty",
      "message-scroller-input",
      "message-scroller-attach",
      "message-scroller-send",
    ]) {
      expect(
        container.querySelector(`[data-slot='${slot}']`)
      ).toBeInTheDocument();
    }
  });

  it("merges custom className and forwards native attributes on the root", () => {
    render(
      <MessageScroller
        className="custom-root"
        data-testid="root"
        aria-label="Chat"
      />
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveClass("custom-root");
    expect(root).toHaveClass("rounded-2xl");
    expect(root).toHaveAttribute("aria-label", "Chat");
  });

  describe("accessibility", () => {
    it("has no a11y violations in the empty state", async () => {
      const { container } = renderEmpty(() => {});
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations in the scrolled state", async () => {
      const { container } = render(
        <MessageScroller className="h-[600px] w-[380px]">
          <MessageScrollerHeader
            title="Streaming Messages"
            onRefresh={() => {}}
          />
          <MessageScrollerMessages showScrollToBottom>
            <Message>
              <MessageContent>
                <MessageHeader>Oliver</MessageHeader>
                <Bubble variant="muted">Let me check on that for you.</Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerMessages>
          <MessageScrollerInput onAttach={() => {}} onSend={() => {}}>
            <p>Draft</p>
          </MessageScrollerInput>
        </MessageScroller>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
