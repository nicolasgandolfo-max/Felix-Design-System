import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Marker, type MarkerVariant } from "./marker";

const VARIANTS: MarkerVariant[] = ["default", "separator", "border"];

describe("Marker", () => {
  it("renders children", () => {
    render(<Marker>Switched to a new branch</Marker>);
    expect(screen.getByText("Switched to a new branch")).toBeInTheDocument();
  });

  it.each(VARIANTS)("sets data-variant='%s' on the root", (variant) => {
    const { container } = render(<Marker variant={variant}>Today</Marker>);
    expect(container.querySelector("[data-slot='marker']")).toHaveAttribute(
      "data-variant",
      variant
    );
  });

  it("renders the default GitBranch icon for `default` and `border`", () => {
    for (const variant of ["default", "border"] as const) {
      const { container, unmount } = render(
        <Marker variant={variant}>Note</Marker>
      );
      const icon = container.querySelector("[data-slot='marker-icon']");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon!.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  });

  it("renders a custom icon when `icon` is provided", () => {
    render(<Marker icon={<svg data-testid="custom-icon" />}>Note</Marker>);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("omits the icon when `icon={null}`", () => {
    const { container } = render(<Marker icon={null}>Note</Marker>);
    expect(container.querySelector("[data-slot='marker-icon']")).toBeNull();
  });

  it("renders two hairlines and no icon for `separator`", () => {
    const { container } = render(<Marker variant="separator">Today</Marker>);
    expect(
      container.querySelectorAll("[data-slot='marker-line']")
    ).toHaveLength(2);
    expect(container.querySelector("[data-slot='marker-icon']")).toBeNull();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("merges custom className and forwards native attributes", () => {
    render(
      <Marker className="custom-root" data-testid="root" aria-label="event">
        Note
      </Marker>
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveClass("custom-root");
    expect(root).toHaveAttribute("aria-label", "event");
  });

  describe("accessibility", () => {
    it.each(VARIANTS)(
      "has no a11y violations for variant '%s'",
      async (variant) => {
        const { container } = render(
          <Marker variant={variant}>Switched to a new branch</Marker>
        );
        expect(await axe(container)).toHaveNoViolations();
      }
    );
  });
});
