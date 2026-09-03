import * as React from "react";
import { GitBranch } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

// Keep this union in sync with the `variant` keys declared on
// `markerVariants` below.
export type MarkerVariant = "default" | "separator" | "border";

// ─── Variants (Felix DS — Figma: Marker, node 1874:2193) ─────────────────────

const markerVariants = cva(
  cn(
    "flex w-full items-center gap-2 py-1",
    "font-sans text-sm leading-body tracking-normal text-muted-foreground",
    "[&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        // Inline system note: icon + text.
        default: "",
        // Centered label between two hairlines (e.g. a date divider).
        separator: "justify-center",
        // Like `default`, underlined by a hairline to close a group.
        border: "border-b border-border pt-1 pb-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MarkerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof markerVariants> {
  /**
   * Visual style.
   * - `default` — icon + text inline (system event in the thread).
   * - `separator` — centered text between two hairlines (e.g. "Today").
   * - `border` — icon + text with a bottom hairline.
   * @default "default"
   */
  variant?: MarkerVariant;
  /**
   * Leading icon for the `default` and `border` variants. Defaults to the
   * Phosphor `GitBranch` icon used in Figma. Pass `null` to render no icon.
   * Ignored by the `separator` variant.
   */
  icon?: React.ReactNode | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Marker — a low-emphasis line inside a chat thread that is not a message:
 * a system event ("Switched to a new branch") or a date divider ("Today").
 *
 * ```tsx
 * <Marker>Switched to a new branch</Marker>
 * <Marker variant="separator">Today</Marker>
 * <Marker variant="border">Switched to release-candidate</Marker>
 * ```
 */
const Marker = React.forwardRef<HTMLDivElement, MarkerProps>(
  ({ variant = "default", icon, className, children, ...rest }, ref) => {
    const isSeparator = variant === "separator";
    const resolvedIcon =
      icon === null ? null : (icon ?? <GitBranch aria-hidden="true" />);

    return (
      <div
        ref={ref}
        data-slot="marker"
        data-variant={variant}
        className={cn(markerVariants({ variant }), className)}
        {...rest}
      >
        {isSeparator ? (
          <>
            <span
              data-slot="marker-line"
              aria-hidden="true"
              className="h-px min-w-px flex-1 bg-border"
            />
            <span
              data-slot="marker-text"
              className="shrink-0 whitespace-nowrap text-center"
            >
              {children}
            </span>
            <span
              data-slot="marker-line"
              aria-hidden="true"
              className="h-px min-w-px flex-1 bg-border"
            />
          </>
        ) : (
          <>
            {resolvedIcon ? (
              <span
                data-slot="marker-icon"
                aria-hidden="true"
                className="inline-flex shrink-0"
              >
                {resolvedIcon}
              </span>
            ) : null}
            <span
              data-slot="marker-text"
              className="min-w-px flex-1 break-words"
            >
              {children}
            </span>
          </>
        )}
      </div>
    );
  }
);
Marker.displayName = "Marker";

export { Marker, markerVariants };
