# Felix Pago Design System — Component Reference

> Companion to [DESIGN.md](./DESIGN.md). One entry per component in `@felix/ui`,
> with what it's for, how to use it, and the exact symbols it exports.
> Generated from the design-system site registry
> (`apps/design-system/src/components-registry.tsx`) — the same source that
> powers the live showcases at the docs site, where each entry also carries
> Spanish and Portuguese copy and a live HTML snippet.

**Import everything from the package root:**

```tsx
import { Button, Input, Dialog, DialogTrigger, DialogContent } from "@felix/ui";
```

**System-wide rules (from DESIGN.md):**

- One primary button per screen. Interactive elements are pill-shaped.
- Focus is always visible: turquoise ring via `--shadow-selection`.
- Cards use border **or** shadow, never both.
- Icons are Phosphor (duotone at rest, fill when active) — never Lucide.
- Copy is Spanish-first, informal _tú_; fees always visible, even when zero.

## Atoms · 19

### Avatar

Profile image with initials fallback, 5 sizes, and status.

**Usage.** Represents a person in recipient lists, headers, and receipts. Import it from @felix/ui together with AvatarFallback for initials when there's no photo. Control the size with size (xs to xl) and show a status dot with status (success, warning, danger, or neutral).

**Exports:** `Avatar`, `AvatarImage`, `AvatarFallback`

### Badge

Pill label for status and metadata.

**Usage.** Compact read-only label for status and metadata: promos, transfer states, beta features. Import it from @felix/ui and pick the style with variant: default, secondary, destructive, outline, ghost, or dark. It's not interactive; if you need an action, use Button or IconButton.

**Exports:** `Badge`

### Button

Primary action. 5 variants and 3 sizes; always a pill.

**Usage.** The main action on every screen, always pill-shaped. Import it from @felix/ui and choose variant (primary, secondary, ghost, line, or danger) and size (sm, md, or lg). It accepts disabled and fullWidth to span the full width. System rule: only one primary button per screen.

**Exports:** `Button`

### Checkbox

Multi-select. Compose with Label via id.

**Usage.** Select one or more independent options, like accepting terms or applying filters. Import it from @felix/ui and pair it with Label by connecting id and htmlFor. It supports defaultChecked and disabled; if there's no visible label, pass an aria-label.

**Exports:** `Checkbox`

### CoinLoader

Branded loader (Felix's coin) for longer waits.

**Usage.** Branded loader featuring Felix's coin for longer waits, like processing a transfer. Import it from @felix/ui, set the size with size (sm, md, or lg), and pass a descriptive label for screen readers. For short or inline loads, prefer Spinner or Dots.

**Exports:** `COIN_LOADER_DEFAULT_SRC`, `CoinLoader`

### Dots

Compact inline loading indicator.

**Usage.** Compact loading indicator for inline contexts, like inside a button or next to text. Import it from @felix/ui, pick the size with size (sm, md, or lg), and pass an accessible label. For longer branded waits, use CoinLoader.

**Exports:** `Dots`

### IconButton

Icon-only button. Same variants as Button. aria-label required.

**Usage.** Icon-only button for compact actions like edit, delete, or add. Import it from @felix/ui, pass the icon through the icon prop, and choose variant (primary, secondary, ghost, line, or danger) and size (sm, md, or lg), same as Button. The aria-label is required because there's no visible text.

**Exports:** `IconButton`

### Input

Text field with floating label and helper/error.

**Usage.** Single-line text field with a floating label, ideal for amounts, emails, and recipient data. Import it from @felix/ui and pass the text through the label prop. Use description for helper text below the field and error for the validation message, which replaces it and turns the field red.

**Exports:** `Input`

### Label

Form label. 4 variants.

**Usage.** Form label to accompany Input, Checkbox, Switch, or RadioGroup. Import it from @felix/ui and connect it to the control with htmlFor pointing to its id. Pick the style with variant: default, required, optional, or disabled.

**Exports:** `Label`

### Logo

Felix mark: logotype and symbol.

**Usage.** The Felix mark for headers, sidebars, and loading screens. Import it from @felix/ui and pick the form with type: logotype for the full wordmark, symbol for the standalone symbol, or symbol-circular for the circular version. Control the size through the height via style or className, without distorting it.

**Exports:** `Logo`

### Progress

Determinate progress bar.

**Usage.** Determinate progress bar for processes with measurable progress, like completing a profile or uploading a document. Import it from @felix/ui and pass the percentage with value (0 to 100), plus an aria-label describing the progress. If the progress is unknown, use Spinner or CoinLoader.

**Exports:** `Progress`

### RadioGroup

Single choice among options. Compose with Label.

**Usage.** Single choice among a few visible options, like the notification channel. Import RadioGroup and RadioGroupItem from @felix/ui, set the initial option with defaultValue, and pair each item with Label by connecting id and htmlFor. If the options call for more visual weight, use ChoiceCard.

**Exports:** `RadioGroup`, `RadioGroupItem`

### Separator

Horizontal or vertical divider, with or without a label.

**Usage.** Subtle divider to separate related blocks of content. Import it from @felix/ui; it's horizontal by default, and with orientation set to vertical it separates inline elements, like footer links. It accepts a label prop for divider text, like the classic or between sign-in methods.

**Exports:** `Separator`

### Skeleton

Loading placeholder: text, block, or circle.

**Usage.** Loading placeholder that mimics the shape of the content while data arrives. Import it from @felix/ui and pick the shape with type: text, block, or circle. Size it with className using utilities like w-full or size-12, and combine several to mirror the real layout.

**Exports:** `Skeleton`

### Slider

Select a single value or a range.

**Usage.** Pick a single value or a range by dragging along a track, useful for amounts or filters. Import it from @felix/ui and pass defaultValue as an array: one element for a single value, two for a range. Add an aria-label when there's no visible label.

**Exports:** `Slider`

### Spinner

Circular loading indicator.

**Usage.** Circular loading indicator for short, generic waits. Import it from @felix/ui, set the size with size (sm, md, or lg), and pass a label for accessibility. For longer branded waits use CoinLoader; for inline contexts, Dots.

**Exports:** `Spinner`

### Switch

On/off toggle. Compose with Label via id.

**Usage.** On/off toggle for preferences that apply instantly, like enabling notifications. Import it from @felix/ui and pair it with Label by connecting id and htmlFor. It supports defaultChecked and disabled; use aria-label when there's no visible label. For options confirmed with a button, prefer Checkbox.

**Exports:** `Switch`

### Text

Typographic component using the system scale.

**Usage.** Typographic component that applies the system scale without hand-rolled styles. Import it from @felix/ui and pick the hierarchy with variant: display-md for hero amounts, heading-1 for section titles, body for running text, and caption for metadata. Always use it instead of styling raw tags.

**Exports:** `Text`

### Textarea

Multi-line text input with floating label.

**Usage.** Multi-line text input with a floating label for messages and notes, like the note on a transfer. Import it from @felix/ui, pass the text through label, and control the initial height with rows. It shares styling and states with Input.

**Exports:** `Textarea`

## Molecules · 23

### Accordion

Collapsible sections. One open at a time.

**Usage.** Organizes content into collapsible sections where only one stays open at a time, ideal for FAQs. Import Accordion, AccordionItem, AccordionTrigger, and AccordionContent from @felix/ui. Use type set to single with collapsible to allow closing them all, and give each AccordionItem a unique value.

**Exports:** `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

### Alert

Contextual status message.

**Usage.** Status message that lives on the page without interrupting: transfer completed, on its way, or failed. Import Alert together with AlertTitle and AlertDescription from @felix/ui and pick the tone with variant: success, warning, or error. For transient notices use toast; Alert stays fixed in the layout.

**Exports:** `Alert`, `AlertTitle`, `AlertDescription`

### Breadcrumb

Hierarchical navigation trail.

**Usage.** Shows the hierarchical trail and lets users go back up levels in deep flows. Import Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, and BreadcrumbSeparator from @felix/ui. Use BreadcrumbLink with href for navigable levels and BreadcrumbPage for the current page.

**Exports:** `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

### Calendar

Calendar to pick a date.

**Usage.** Calendar to pick a date directly on the page, for example when scheduling a transfer. Import it from @felix/ui with mode set to single and control the selection with selected and onSelect. If you need the calendar inside a form field, use DatePicker.

**Exports:** `Calendar`

### Card

Content container. Border or shadow, never both.

**Usage.** Base container to group related information, like a transfer summary. Import Card with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter from @felix/ui and compose only the parts you need. System rule: a Card uses a border or a shadow, never both.

**Exports:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

### ChoiceCard

Mutually-exclusive option cards (rich radio).

**Usage.** Rich radio in card form for key decisions, like choosing between cash pickup and bank deposit. Import ChoiceCardGroup and ChoiceCard from @felix/ui: control the group with value and onValueChange, and give each card value, icon, title, and description. Use it when the options deserve more weight than a RadioGroup.

**Exports:** `ChoiceCard`, `ChoiceCardGroup`, `ChoiceCardLink`

### Collapse

Content that expands and collapses.

**Usage.** Shows or hides a block of secondary content, like the exchange rate detail. Import Collapse, CollapseTrigger, and CollapseContent from @felix/ui and control it with open and onOpenChange. Unlike Accordion, it's a single standalone block.

**Exports:** `Collapse`, `CollapseTrigger`, `CollapseContent`

### DatePicker

Field with a calendar in a popover.

**Usage.** Form field that opens a calendar in a popover, ideal for picking dates without taking over the screen. Import it from @felix/ui and control it with value and onChange; customize the empty text with placeholder. If the date is the focus of the screen, use Calendar directly.

**Exports:** `DatePicker`

### Dialog

Centered modal dialog for confirmations.

**Usage.** Centered modal for confirmations that demand full attention, like confirming a money transfer. Import Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, and DialogClose from @felix/ui. Wrap the opening button with DialogTrigger asChild and close it with DialogClose. For longer mobile flows, consider Drawer.

**Exports:** `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogBody`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`

### Drawer

Edge-anchored sliding panel (mobile-first).

**Usage.** Panel that slides in from the edge of the screen, mobile-first for details and quick actions. Import Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, and DrawerClose from @felix/ui, and open it by wrapping the trigger with DrawerTrigger asChild. For one-off confirmations on desktop, prefer Dialog.

**Exports:** `Drawer`, `DrawerClose`, `DrawerContent`, `DrawerDescription`, `DrawerFooter`, `DrawerHeader`, `DrawerOverlay`, `DrawerPortal`, `DrawerTitle`, `DrawerTrigger`

### DropdownMenu

Contextual menu anchored to a trigger.

**Usage.** Contextual action menu anchored to a button, like the account menu. Import DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, and DropdownMenuSeparator from @felix/ui. Wrap the trigger with DropdownMenuTrigger asChild and group actions with DropdownMenuSeparator. To pick a form value, use Select.

**Exports:** `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuPortal`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`

### HoverCard

Card that appears on hover.

**Usage.** Card with extra context that appears on hover, like a recipient's profile. Import HoverCard, HoverCardTrigger, and HoverCardContent from @felix/ui, wrapping the element with HoverCardTrigger asChild. Since there's no hover on touch, don't put critical information in it.

**Exports:** `HoverCard`, `HoverCardTrigger`, `HoverCardPortal`, `HoverCardContent`, `HoverCardArrow`, `HoverCardHeader`, `HoverCardBody`, `HoverCardFooter`, `HoverCardTitle`, `HoverCardDescription`

### NavigationMenu

Primary navigation with dropdown menus.

**Usage.** Horizontal primary navigation with dropdown menus, typical of the site header. Import NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, and NavigationMenuLink from @felix/ui. Use NavigationMenuTrigger with NavigationMenuContent for dropdowns and NavigationMenuLink with href for direct links.

**Exports:** `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`

### Pagination

Navigation across pages of results.

**Usage.** Navigation across long result sets, like the transfer history. Import Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, and PaginationEllipsis from @felix/ui. Mark the current page with isActive on PaginationLink and compress long ranges with PaginationEllipsis.

**Exports:** `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`

### Popover

Floating panel anchored to a trigger.

**Usage.** Floating panel anchored to a trigger for lightweight content, like the exchange rate detail. Import Popover, PopoverTrigger, and PopoverContent from @felix/ui, wrapping the button with PopoverTrigger asChild. Unlike Tooltip it opens on click and can hold interactive elements.

**Exports:** `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverPortal`, `PopoverContent`, `PopoverArrow`, `PopoverHeader`, `PopoverBody`, `PopoverFooter`, `PopoverTitle`, `PopoverDescription`, `PopoverClose`

### Select

Select one option from a list.

**Usage.** Pick one option from a dropdown list, like the destination country. Import Select, SelectTrigger, SelectValue, SelectContent, and SelectItem from @felix/ui. Set the placeholder on SelectValue and give each SelectItem a unique value. With few options, consider RadioGroup to keep them all visible.

**Exports:** `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectPortal`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`

### Sheet

Side panel for secondary flows.

**Usage.** Side panel for secondary flows that don't warrant a page change, like a transfer's detail. Import Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, and SheetFooter from @felix/ui. Open it by wrapping the trigger with SheetTrigger asChild and close it with SheetClose.

**Exports:** `Sheet`, `SheetTrigger`, `SheetPortal`, `SheetClose`, `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetBody`, `SheetFooter`, `SheetTitle`, `SheetDescription`

### SidebarFooter

Sidebar footer with the user's account.

**Usage.** Sidebar footer showing the active user's account. Import it from @felix/ui and pass name, email, and an avatar, usually an Avatar with AvatarFallback at size sm. It goes as the Sidebar's last child, below SidebarBody.

**Exports:** `SidebarFooter`

### Stepper

Step progress through a flow.

**Usage.** Shows step-by-step progress through a flow, like amount, recipient, and confirmation. Import Stepper from @felix/ui and define each step with Stepper.Step as children. Set the current step with activeIndex (zero-based); previous steps are marked as completed.

**Exports:** `Stepper`

### Table

Tabular data with a header.

**Usage.** Presents tabular data like the transfer history. Import Table, TableHeader, TableBody, TableRow, TableHead, and TableCell from @felix/ui. Use TableHead for header cells and TableCell for data cells. For long lists, add Pagination.

**Exports:** `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

### Tabs

Switchable views under one area.

**Usage.** Switches between same-level views within one area, like transfers and top-ups. Import Tabs, TabsList, TabsTrigger, and TabsContent from @felix/ui. Set the initial tab with defaultValue and link each TabsTrigger to its TabsContent using the same value.

**Exports:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

### Toast

Transient notification. Fire with toast(...).

**Usage.** Transient notification that confirms an action without interrupting, like a completed transfer. Mount the Toaster once in the app (you can place it with position) and import the toast function from @felix/ui. Fire it with toast(title, options) passing a description, or use toast.secondary for the alternate style.

**Exports:** `Toaster`

### Tooltip

Brief label on hover or focus.

**Usage.** Brief label that clarifies a control on hover or keyboard focus. Import Tooltip, TooltipProvider, TooltipTrigger, and TooltipContent from @felix/ui. Wrap the area with TooltipProvider and the trigger with TooltipTrigger asChild. Short text only and never essential information: there's no hover on touch.

**Exports:** `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipPortal`, `TooltipArrow`, `TooltipContent`

## Organisms · 1

### Sidebar

Full side navigation: header, sections, and footer.

**Usage.** The app's full side navigation: brand on top, link sections, and the account at the bottom. Import Sidebar, SidebarHeader, SidebarBody, SidebarSection, and SidebarNavItem from @felix/ui, and close it with SidebarFooter. Each SidebarNavItem takes href, icon, and active to mark the current route; group links with SidebarSection and its title prop.

**Exports:** `Sidebar`, `SidebarHeader`, `SidebarBody`, `SidebarSection`, `SidebarSectionTitle`, `SidebarNavItem`

---

_43 components · generated from the design-system registry. To regenerate after editing the registry, run `node scripts/generate-components-md.mjs`._
