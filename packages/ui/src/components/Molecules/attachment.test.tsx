import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Attachment,
  type AttachmentSize,
  type AttachmentState,
  type AttachmentType,
} from "./attachment";

const SIZES: AttachmentSize[] = ["sm", "md", "lg"];
const STATES: AttachmentState[] = ["default", "error", "loading"];
const TYPES: AttachmentType[] = ["file", "image"];

const MATRIX = SIZES.flatMap((size) =>
  STATES.flatMap((state) => TYPES.map((type) => ({ size, state, type })))
);

describe("Attachment", () => {
  it("renders name and meta", () => {
    render(<Attachment name="report-final.pdf" meta="PDF · 2.4 MB" />);
    expect(screen.getByText("report-final.pdf")).toBeInTheDocument();
    expect(screen.getByText("PDF · 2.4 MB")).toBeInTheDocument();
  });

  it("omits the meta line when not provided", () => {
    const { container } = render(<Attachment name="report-final.pdf" />);
    expect(container.querySelector("[data-slot='attachment-meta']")).toBeNull();
  });

  it("defaults to size='sm', state='default', type='file'", () => {
    const { container } = render(<Attachment name="a.pdf" />);
    const root = container.querySelector("[data-slot='attachment']")!;
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-state", "default");
    expect(root).toHaveAttribute("data-type", "file");
  });

  it.each(MATRIX)(
    "mirrors size=$size state=$state type=$type as data attributes",
    ({ size, state, type }) => {
      const { container } = render(
        <Attachment size={size} state={state} type={type} name="a" meta="b" />
      );
      const root = container.querySelector("[data-slot='attachment']")!;
      expect(root).toHaveAttribute("data-size", size);
      expect(root).toHaveAttribute("data-state", state);
      expect(root).toHaveAttribute("data-type", type);
    }
  );

  it("renders a progress bar only while loading", () => {
    const { container, rerender } = render(
      <Attachment name="a.pdf" meta="Uploading... 45%" state="loading" />
    );
    const bar = container.querySelector("[data-slot='attachment-progress']");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("role", "progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "45");

    rerender(<Attachment name="a.pdf" meta="PDF · 2.4 MB" />);
    expect(
      container.querySelector("[data-slot='attachment-progress']")
    ).toBeNull();
  });

  it("uses the `progress` prop to size the bar", () => {
    const { container } = render(
      <Attachment name="a.pdf" state="loading" progress={80} />
    );
    expect(
      container.querySelector("[data-slot='attachment-progress']")
    ).toHaveAttribute("aria-valuenow", "80");
  });

  it("uses the danger palette in the error state", () => {
    const { container } = render(
      <Attachment name="a.pdf" meta="PDF · 2.4 MB" state="error" />
    );
    expect(container.querySelector("[data-slot='attachment']")).toHaveClass(
      "border-interactive-danger-active"
    );
    expect(
      container.querySelector("[data-slot='attachment-meta']")
    ).toHaveClass("text-destructive");
  });

  it("switches to the vertical card layout for large images", () => {
    const { container } = render(
      <Attachment type="image" size="lg" name="photo.jpg" meta="JPG · 3.8 MB" />
    );
    const root = container.querySelector("[data-slot='attachment']")!;
    expect(root).toHaveClass("flex-col");
    expect(root).toHaveClass("w-40");
    // Close button floats over the thumbnail.
    const icon = container.querySelector("[data-slot='attachment-icon']")!;
    expect(
      icon.querySelector("[data-slot='attachment-close']")
    ).toBeInTheDocument();
  });

  it("keeps the row layout for large files", () => {
    const { container } = render(
      <Attachment type="file" size="lg" name="a.pdf" meta="PDF · 2.4 MB" />
    );
    const root = container.querySelector("[data-slot='attachment']")!;
    expect(root).not.toHaveClass("flex-col");
    expect(root).toHaveClass("gap-4");
    expect(root).toHaveClass("p-4");
  });

  it("renders a custom icon when `icon` is provided", () => {
    render(
      <Attachment name="a.pdf" icon={<svg data-testid="custom-icon" />} />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("calls onRemove and exposes the close button by its label", () => {
    const onRemove = vi.fn();
    render(
      <Attachment
        name="a.pdf"
        onRemove={onRemove}
        removeLabel="Quitar archivo"
      />
    );
    const btn = screen.getByRole("button", { name: "Quitar archivo" });
    fireEvent.click(btn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("merges custom className and forwards native attributes", () => {
    render(
      <Attachment
        name="a.pdf"
        className="custom-root"
        data-testid="root"
        aria-label="Adjunto"
      />
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveClass("custom-root");
    expect(root).toHaveAttribute("aria-label", "Adjunto");
  });

  describe("accessibility", () => {
    it.each(MATRIX)(
      "has no a11y violations for size=$size state=$state type=$type",
      async ({ size, state, type }) => {
        const { container } = render(
          <Attachment
            size={size}
            state={state}
            type={type}
            name="report-final.pdf"
            meta={state === "loading" ? "Uploading... 45%" : "PDF · 2.4 MB"}
          />
        );
        expect(await axe(container)).toHaveNoViolations();
      }
    );
  });
});
