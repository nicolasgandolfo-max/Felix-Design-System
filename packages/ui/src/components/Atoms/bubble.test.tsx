import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Bubble, type BubbleVariant } from "./bubble";

const VARIANTS: BubbleVariant[] = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
];

describe("Bubble", () => {
  it("renders children", () => {
    render(<Bubble>Hey! How's your project going?</Bubble>);
    expect(
      screen.getByText("Hey! How's your project going?")
    ).toBeInTheDocument();
  });

  it("defaults to the `default` variant", () => {
    const { container } = render(<Bubble>Hi</Bubble>);
    expect(container.querySelector("[data-slot='bubble']")).toHaveAttribute(
      "data-variant",
      "default"
    );
  });

  it.each(VARIANTS)("sets data-variant='%s' on the root", (variant) => {
    const { container } = render(<Bubble variant={variant}>Hi</Bubble>);
    expect(container.querySelector("[data-slot='bubble']")).toHaveAttribute(
      "data-variant",
      variant
    );
  });

  it("`ghost` renders without a padded frame", () => {
    const { container } = render(<Bubble variant="ghost">Hi</Bubble>);
    const root = container.querySelector("[data-slot='bubble']")!;
    expect(root).not.toHaveClass("p-3");
    expect(root).not.toHaveClass("rounded-2xl");
  });

  it("merges custom className and forwards native attributes", () => {
    render(
      <Bubble className="custom-root" data-testid="root" aria-label="message">
        Hi
      </Bubble>
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveClass("custom-root");
    expect(root).toHaveClass("p-3");
    expect(root).toHaveAttribute("aria-label", "message");
  });

  describe("accessibility", () => {
    it.each(VARIANTS)(
      "has no a11y violations for variant '%s'",
      async (variant) => {
        const { container } = render(
          <Bubble variant={variant}>Here's the info you requested.</Bubble>
        );
        expect(await axe(container)).toHaveNoViolations();
      }
    );
  });
});
