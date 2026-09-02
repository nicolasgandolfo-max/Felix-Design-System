import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Avatar } from "../Atoms/avatar";
import { Bubble } from "../Atoms/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  type MessageAlign,
} from "./message";

function renderMessage(align: MessageAlign = "start") {
  return render(
    <Message align={align}>
      <MessageAvatar>
        <Avatar size="sm" initials="A" status="success" statusLabel="Online" />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Oliver</MessageHeader>
        <Bubble variant="muted">Let me check on that for you.</Bubble>
        <MessageFooter>2:32 PM</MessageFooter>
      </MessageContent>
    </Message>
  );
}

describe("Message", () => {
  it("renders header, bubble and footer", () => {
    renderMessage();
    expect(screen.getByText("Oliver")).toBeInTheDocument();
    expect(
      screen.getByText("Let me check on that for you.")
    ).toBeInTheDocument();
    expect(screen.getByText("2:32 PM")).toBeInTheDocument();
  });

  it("sets expected data-slot values", () => {
    const { container } = renderMessage();
    for (const slot of [
      "message",
      "message-avatar",
      "message-content",
      "message-header",
      "message-footer",
      "bubble",
    ]) {
      expect(
        container.querySelector(`[data-slot='${slot}']`)
      ).toBeInTheDocument();
    }
  });

  it("defaults to align='start'", () => {
    const { container } = renderMessage();
    const root = container.querySelector("[data-slot='message']")!;
    expect(root).toHaveAttribute("data-align", "start");
    expect(root).toHaveClass("flex-row");
    expect(
      container.querySelector("[data-slot='message-content']")
    ).toHaveClass("items-start");
  });

  it("align='end' mirrors the row and aligns sub-parts via context", () => {
    const { container } = renderMessage("end");
    const root = container.querySelector("[data-slot='message']")!;
    expect(root).toHaveAttribute("data-align", "end");
    expect(root).toHaveClass("flex-row-reverse");
    expect(
      container.querySelector("[data-slot='message-content']")
    ).toHaveClass("items-end");
    expect(container.querySelector("[data-slot='message-header']")).toHaveClass(
      "justify-end"
    );
    expect(container.querySelector("[data-slot='message-footer']")).toHaveClass(
      "justify-end"
    );
  });

  it("merges custom className on every part", () => {
    const { container } = render(
      <Message className="c-root">
        <MessageAvatar className="c-avatar" />
        <MessageContent className="c-content">
          <MessageHeader className="c-header">You</MessageHeader>
          <MessageFooter className="c-footer">Read · 2:34 PM</MessageFooter>
        </MessageContent>
      </Message>
    );
    expect(container.querySelector("[data-slot='message']")).toHaveClass(
      "c-root"
    );
    expect(container.querySelector("[data-slot='message-avatar']")).toHaveClass(
      "c-avatar"
    );
    expect(
      container.querySelector("[data-slot='message-content']")
    ).toHaveClass("c-content");
    expect(container.querySelector("[data-slot='message-header']")).toHaveClass(
      "c-header"
    );
    expect(container.querySelector("[data-slot='message-footer']")).toHaveClass(
      "c-footer"
    );
  });

  it("forwards native attributes on the root", () => {
    render(
      <Message data-testid="root" aria-label="Message from Oliver">
        <MessageContent>
          <Bubble>Hi</Bubble>
        </MessageContent>
      </Message>
    );
    expect(screen.getByTestId("root")).toHaveAttribute(
      "aria-label",
      "Message from Oliver"
    );
  });

  describe("accessibility", () => {
    it.each<MessageAlign>(["start", "end"])(
      "has no a11y violations for align '%s'",
      async (align) => {
        const { container } = renderMessage(align);
        expect(await axe(container)).toHaveNoViolations();
      }
    );
  });
});
