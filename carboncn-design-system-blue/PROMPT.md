# CarbonCN Design System - Complete Guide for AI Assistants

You are integrating CarbonCN, a production-grade React component library that combines IBM Carbon Design System's enterprise patterns with shadcn/ui's composable, copy-paste architecture.

## Your Role

When generating UI code for this project:
1. Use ONLY components from this design system
2. Follow the exact patterns shown in this guide
3. Maintain accessibility as a non-negotiable requirement
4. Use the established color tokens, never hardcoded colors
5. Follow the 8px spacing grid strictly

## What Makes CarbonCN Different

- **No npm package** - Components are copied into your project
- **Full ownership** - Modify components as needed
- **Radix primitives** - Accessible by default
- **Tailwind-first** - Utility classes, not CSS modules
- **Carbon tokens** - Enterprise-grade design tokens

## Repository

For the latest components and updates, visit: https://github.com/GaragePlug-AI/carboncn-design-system


---

# Design Principles

## 1. Accessibility First (WCAG 2.1 AA)

Every component must be:
- Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- Screen reader compatible (proper ARIA attributes)
- Focusable with visible focus indicators
- Color contrast compliant (4.5:1 for text, 3:1 for UI)

## 2. Consistent 8px Grid

All spacing uses the Carbon spacing scale:
- `carbon-01`: 2px (0.125rem)
- `carbon-02`: 4px (0.25rem)
- `carbon-03`: 8px (0.5rem) - base unit
- `carbon-04`: 12px (0.75rem)
- `carbon-05`: 16px (1rem)
- `carbon-06`: 24px (1.5rem)
- `carbon-07`: 32px (2rem)
- `carbon-08`: 40px (2.5rem)
- `carbon-09`: 48px (3rem)
- `carbon-10`: 64px (4rem)

Use Tailwind classes: `p-carbon-05`, `gap-carbon-03`, `mb-carbon-07`

## 3. Semantic Color Tokens

Never use raw colors. Always use semantic tokens:

| Token | Purpose |
|-------|---------|
| `primary` | Main brand/action color |
| `secondary` | Secondary actions |
| `destructive` | Errors, deletions, danger |
| `muted` | Subdued backgrounds/text |
| `accent` | Highlights, hover states |
| `background` | Page/component backgrounds |
| `foreground` | Primary text color |
| `border` | Borders and dividers |

Usage: `bg-primary`, `text-foreground`, `border-border`

## 4. Motion Guidelines

Carbon defines two motion styles:

**Productive Motion** (default): For UI feedback
- Timing: `cubic-bezier(0.2, 0, 0.38, 0.9)`
- Class: `motion-productive`

**Expressive Motion**: For emphasis and delight
- Timing: `cubic-bezier(0.4, 0.14, 0.3, 1)`
- Class: `motion-expressive`

**Duration Scale:**
- `duration-fast-01`: 70ms (micro-interactions)
- `duration-fast-02`: 110ms (small elements)
- `duration-moderate-01`: 150ms (medium elements)
- `duration-moderate-02`: 240ms (large elements)


---

# Architecture & File Structure

## Project Structure

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/           # CarbonCN components go here
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── ...
│   ├── lib/
│   │   └── utils.ts      # cn() utility function
│   └── styles/
│       └── globals.css   # CSS variables & base styles
├── tailwind.config.js    # Extended with Carbon tokens
└── package.json
```

## The cn() Utility

All components use `cn()` for class merging:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Why cn()?**
- Merges Tailwind classes intelligently
- Last class wins (no specificity issues)
- Handles conditional classes cleanly


---

# Component Anatomy

Every CarbonCN component follows this exact pattern:

## Standard Template

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define variants with CVA
const componentVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 2. Extend HTML attributes + variant props
interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional custom props
}

// 3. Use forwardRef for ref forwarding
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

// 4. Export component and variants
export { Component, componentVariants }
```

## Why This Pattern?

1. **forwardRef** - Allows parent components to access DOM node
2. **CVA (class-variance-authority)** - Type-safe variants with IntelliSense
3. **cn()** - Merges Tailwind classes, last wins
4. **Spread props** - Forwards all HTML attributes automatically
5. **displayName** - Better React DevTools debugging

## Composition Pattern (Radix-based)

For complex components using Radix primitives:

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger

const DialogContent = React.forwardRef<...>(({ className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/50", className)} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn("fixed left-1/2 top-1/2 ...", className)}
      {...props}
    />
  </DialogPrimitive.Portal>
))

export { Dialog, DialogTrigger, DialogContent }
```


---

# Styling System

## CSS Variables (globals.css)

The theme is controlled via CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --primary: 217 91% 53%;       /* Carbon Blue 60 */
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 22%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 32%;
  --destructive: 0 84% 48%;
  --border: 0 0% 88%;
  --ring: 217 91% 53%;
  --radius: 0px;                /* Carbon uses sharp corners */
}

.dark {
  --background: 0 0% 9%;
  --foreground: 0 0% 96%;
  /* ... dark mode overrides */
}
```

## Tailwind Configuration

The Tailwind config extends with Carbon tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic tokens (use these)
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        destructive: "hsl(var(--destructive))",
        muted: "hsl(var(--muted))",
        // Carbon palette (for specific cases)
        carbon: {
          gray: { 10: "#f4f4f4", /* ... */ 100: "#161616" },
          blue: { 60: "#0f62fe", /* ... */ },
          // ... other colors
        }
      },
      spacing: {
        "carbon-01": "0.125rem",  // 2px
        "carbon-02": "0.25rem",   // 4px
        // ... full scale
      },
    },
  },
}
```

## Typography

IBM Plex is the standard font family:

```css
font-family: 'IBM Plex Sans', system-ui, sans-serif;
font-family: 'IBM Plex Mono', monospace; /* for code */
```

**Type Scale:**
- `.body-01`: 14px/20px - Default body text
- `.body-02`: 16px/24px - Larger body text
- `.label-01`: 12px/16px - Form labels
- `.caption-01`: 12px/16px - Captions, helper text


---

# Common Patterns

## Form Pattern

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function LoginForm() {
  return (
    <form className="space-y-carbon-05">
      <div className="space-y-carbon-02">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter email" />
      </div>
      
      <div className="space-y-carbon-02">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )
}
```

## Dialog Pattern

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## Loading State Pattern

```tsx
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/ui/loading"

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button disabled={isLoading}>
      {isLoading ? (
        <>
          <Loading className="mr-2 h-4 w-4" />
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  )
}
```

## Data Table Pattern

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

function UserTable({ users }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```


---

# Accessibility Guidelines

## Keyboard Navigation

All interactive components must support:

| Key | Action |
|-----|--------|
| Tab | Move focus to next element |
| Shift+Tab | Move focus to previous element |
| Enter/Space | Activate button/link |
| Escape | Close modal/dropdown |
| Arrow keys | Navigate within component |

## Focus Management

```tsx
// Focus ring is automatically applied via CSS:
*:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: var(--ring);
  ring-offset: 2px;
}
```

## ARIA Patterns

### Buttons
```tsx
// Loading button
<Button aria-disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? "Loading..." : "Submit"}
</Button>

// Icon-only button (needs aria-label)
<Button variant="ghost" size="icon" aria-label="Close menu">
  <X className="h-4 w-4" />
</Button>
```

### Forms
```tsx
// Always associate labels
<Label htmlFor="email">Email</Label>
<Input id="email" aria-describedby="email-error" />
<p id="email-error" className="text-destructive">Invalid email</p>
```

### Modals
```tsx
// Radix Dialog handles this automatically:
// - Traps focus inside modal
// - Returns focus on close
// - Has proper aria-modal, role="dialog"
```

## Color Contrast

- Text: 4.5:1 minimum (AA)
- Large text: 3:1 minimum
- UI components: 3:1 minimum

The design tokens are pre-configured to meet these ratios.


---

# Data Visualization (Enterprise Charts)

CarbonCN includes a comprehensive charting library built on Recharts with Carbon-authentic styling.

## Available Chart Types

| Category | Charts | Use Case |
|----------|--------|----------|
| **Basic** | BarChart, LineChart, AreaChart | Standard data visualization |
| **Comparison** | Grouped Bar, Stacked Bar, Horizontal Bar | Comparing categories |
| **Part-to-Whole** | PieChart, DonutChart | Proportions and distributions |
| **KPIs** | GaugeChart, Sparkline | Metrics and quick trends |
| **Combined** | ComboChart | Bar + Line overlay |
| **Matrix** | Heatmap | Correlation, activity calendars |
| **Hierarchy** | Treemap | Proportional nested data |
| **Multi-Dimension** | RadarChart | Multi-axis comparisons |
| **Pipeline** | FunnelChart | Conversion funnels |
| **Correlation** | ScatterChart | X-Y relationships |
| **Financial** | WaterfallChart | Cumulative changes |

## Chart Component Pattern

All charts follow a consistent API:

```tsx
import { CarbonBarChart } from "@/components/ui/charts/bar-chart"

<CarbonBarChart
  data={data}
  xKey="month"
  yKeys={["revenue", "target"]}
  height={300}
  showGrid={true}
  showLegend={true}
  showTooltip={true}
/>
```

## Chart Colors

Use the Carbon chart color palette for consistency:

```tsx
import { chartColors, getChartColor } from "@/components/ui/charts"

// Named colors
chartColors.blue      // #0f62fe
chartColors.cyan      // #1192e8
chartColors.teal      // #009d9a
chartColors.green     // #198038
chartColors.purple    // #8a3ffc
chartColors.magenta   // #d12771
chartColors.red       // #da1e28
chartColors.orange    // #eb6200

// Get color by index (cycles through palette)
getChartColor(0)  // blue
getChartColor(1)  // cyan
getChartColor(9)  // blue (wraps around)
```

## Shared Utilities

```tsx
import {
  ChartContainer,    // Responsive wrapper
  ChartCard,         // Card with title/description
  ChartTooltip,      // Carbon-styled tooltip
  ChartLegend,       // Interactive legend
  ChartEmptyState,   // No data placeholder
  ChartLoadingState, // Skeleton loader
  formatNumber,      // 1000 → 1K
  formatCurrency,    // 1000 → $1,000
  formatPercent,     // 0.15 → 15%
} from "@/components/ui/charts"
```

## Example: Dashboard with Charts

```tsx
import { CarbonBarChart } from "@/components/ui/charts/bar-chart"
import { CarbonDonutChart } from "@/components/ui/charts/pie-chart"
import { Sparkline } from "@/components/ui/charts/sparkline"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-carbon-06">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <CarbonBarChart
            data={revenueData}
            xKey="month"
            yKeys={["revenue", "target"]}
            height={300}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <CarbonDonutChart
            data={trafficData}
            centerValue="2.4K"
            centerLabel="Total"
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  )
}
```

## Carbon Chart Styling Rules

1. **No rounded corners** on bars (barRadius: 0)
2. **Linear interpolation** for lines (type: "linear"), not curved
3. **Horizontal grid lines only** (vertical: false)
4. **Gray grid color** (#e0e0e0)
5. **Dark tooltips** (bg-carbon-gray-100 with white text)
6. **Square legend indicators** (not circles)
7. **Hidden axis lines and tick marks**


---

# Migration Guides

## From Material UI (MUI)

| MUI Component | CarbonCN Equivalent |
|---------------|---------------------|
| `<Button variant="contained">` | `<Button>` (default) |
| `<Button variant="outlined">` | `<Button variant="tertiary">` |
| `<Button variant="text">` | `<Button variant="ghost">` |
| `<TextField>` | `<Input>` + `<Label>` |
| `<Select>` | `<Select>` + `<SelectTrigger>` + ... |
| `<Checkbox>` | `<Checkbox>` |
| `<Alert severity="error">` | `<Alert variant="destructive">` |
| `<Snackbar>` | `<Toaster>` + `toast()` |
| `<Dialog>` | `<Dialog>` (similar API) |
| `<Tabs>` | `<Tabs>` (similar API) |

**Key Differences:**
1. No ThemeProvider needed - CSS variables handle theming
2. No `sx` prop - use Tailwind classes directly
3. Components are separate files, not from a package
4. Form state is external - use react-hook-form

## From Chakra UI

| Chakra Component | CarbonCN Equivalent |
|------------------|---------------------|
| `<Button colorScheme="blue">` | `<Button variant="primary">` |
| `<Input>` | `<Input>` |
| `<Modal>` | `<Dialog>` |
| `<Drawer>` | `<Drawer>` or `<Sheet>` |
| `<Menu>` | `<DropdownMenu>` |
| `<Tooltip>` | `<Tooltip>` |
| `<Toast>` | `<Toaster>` |

**Key Differences:**
1. No ChakraProvider needed
2. No style props (`bg`, `p`, `m`) - use Tailwind
3. Different composition pattern for complex components

## From Bootstrap

| Bootstrap | CarbonCN Equivalent |
|-----------|---------------------|
| `btn btn-primary` | `<Button>` |
| `btn btn-outline-*` | `<Button variant="tertiary">` |
| `form-control` | `<Input>` |
| `form-select` | `<Select>` components |
| `modal` | `<Dialog>` |
| `nav-tabs` | `<Tabs>` |
| `alert` | `<Alert>` |
| `card` | `<Card>` |

**Key Differences:**
1. No jQuery dependency
2. No Bootstrap CSS - Tailwind only
3. Components are React-based, not class-based


---

# Theming

## Light/Dark Mode

The theme is controlled via a class on the root element:

```tsx
// In your root layout
<html className="dark">
  {/* Dark mode active */}
</html>
```

Components automatically respond to the theme class.

## Accent Colors

The primary color can be changed via CSS variables:

```css
/* Blue (default) */
:root { --primary: 217 91% 53%; }

/* Green */
.accent-green { --primary: 152 69% 31%; }

/* Purple */
.accent-purple { --primary: 271 81% 56%; }

/* Teal */
.accent-teal { --primary: 174 100% 24%; }

/* Custom */
:root { --primary: YOUR_HSL_VALUE; }
```

## Custom Theming

To create a custom theme:

1. Override CSS variables in your globals.css
2. Add both light and dark variants
3. Ensure color contrast meets WCAG guidelines

```css
:root {
  --primary: 280 100% 50%;           /* Custom purple */
  --primary-foreground: 0 0% 100%;
}

.dark {
  --primary: 280 100% 65%;           /* Lighter for dark mode */
}
```


---

# Do's and Don'ts

## DO

✅ Use semantic color tokens: `bg-primary`, `text-destructive`
✅ Use Carbon spacing: `p-carbon-05`, `gap-carbon-03`
✅ Use the `cn()` utility for all class merging
✅ Forward refs in custom components
✅ Use `asChild` prop for custom trigger elements
✅ Provide `aria-label` for icon-only buttons
✅ Use `Label` component with `htmlFor` for form inputs
✅ Let Radix handle focus management in overlays

## DON'T

❌ Hardcode colors: `bg-blue-500`, `text-red-600`
❌ Use arbitrary spacing: `p-3`, `mt-7` (use Carbon scale)
❌ Create `<div onClick>` instead of `<Button>`
❌ Forget loading states on async actions
❌ Use `variant="link"` for actual navigation (use `<Link>`)
❌ Nest interactive elements (button inside button)
❌ Override focus styles without providing alternatives
❌ Use inline styles for theming

## Code Quality

```tsx
// ✅ Good
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// ❌ Bad
<div 
  className="bg-red-500 text-white p-2 cursor-pointer"
  onClick={handleDelete}
>
  Delete
</div>
```

```tsx
// ✅ Good - Using composition
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>

// ❌ Bad - Breaking accessibility
<div onClick={() => setOpen(true)}>Open</div>
{open && <div className="modal">...</div>}
```


---

# Current Theme Configuration

This export is configured with the following accent color:

- **Accent:** blue
- **HSL Value:** 217 91% 53%

The `globals.css` file has been pre-configured with this as the default `--primary` color.


---

# Included Components

This export contains **92 components**. Their source files are in `components/ui/`.

| Component | File |
|-----------|------|
| Accordion | `accordion.tsx` |
| Actionable Notification | `actionable-notification.tsx` |
| Alert | `alert.tsx` |
| Aspect Ratio | `aspect-ratio.tsx` |
| Avatar | `avatar.tsx` |
| Breadcrumb | `breadcrumb.tsx` |
| Button | `button.tsx` |
| Card | `card.tsx` |
| Carousel | `carousel.tsx` |
| Chart | `chart.tsx` |
| Charts/area Chart | `charts/area-chart.tsx` |
| Charts/bar Chart | `charts/bar-chart.tsx` |
| Charts/combo Chart | `charts/combo-chart.tsx` |
| Charts/funnel Chart | `charts/funnel-chart.tsx` |
| Charts/gauge Chart | `charts/gauge-chart.tsx` |
| Charts/heatmap | `charts/heatmap.tsx` |
| Charts/index | `charts/index.tsx` |
| Charts/line Chart | `charts/line-chart.tsx` |
| Charts/pie Chart | `charts/pie-chart.tsx` |
| Charts/radar Chart | `charts/radar-chart.tsx` |
| Charts/scatter Chart | `charts/scatter-chart.tsx` |
| Charts/sparkline | `charts/sparkline.tsx` |
| Charts/treemap | `charts/treemap.tsx` |
| Charts/waterfall Chart | `charts/waterfall-chart.tsx` |
| Checkbox | `checkbox.tsx` |
| Code Snippet | `code-snippet.tsx` |
| Collapsible | `collapsible.tsx` |
| Combobox | `combobox.tsx` |
| Command | `command.tsx` |
| Content Switcher | `content-switcher.tsx` |
| Context Menu | `context-menu.tsx` |
| Copy Button | `copy-button.tsx` |
| Data Table | `data-table.tsx` |
| Date Picker | `date-picker.tsx` |
| Definition Tooltip | `definition-tooltip.tsx` |
| Dialog | `dialog.tsx` |
| Drawer | `drawer.tsx` |
| Dropdown Menu | `dropdown-menu.tsx` |
| File Uploader | `file-uploader.tsx` |
| Fluid Form | `fluid-form.tsx` |
| Form | `form.tsx` |
| Hover Card | `hover-card.tsx` |
| Inline Loading | `inline-loading.tsx` |
| Input Group | `input-group.tsx` |
| Input Otp | `input-otp.tsx` |
| Input | `input.tsx` |
| Kbd | `kbd.tsx` |
| Label | `label.tsx` |
| Layer | `layer.tsx` |
| Link | `link.tsx` |
| List | `list.tsx` |
| Loading | `loading.tsx` |
| Menu Button | `menu-button.tsx` |
| Menubar | `menubar.tsx` |
| Modal | `modal.tsx` |
| Multi Select | `multi-select.tsx` |
| Navigation Menu | `navigation-menu.tsx` |
| Notification | `notification.tsx` |
| Number Input | `number-input.tsx` |
| Overflow Menu | `overflow-menu.tsx` |
| Pagination | `pagination.tsx` |
| Popover | `popover.tsx` |
| Progress | `progress.tsx` |
| Radio Group | `radio-group.tsx` |
| Resizable | `resizable.tsx` |
| Scroll Area | `scroll-area.tsx` |
| Search | `search.tsx` |
| Select | `select.tsx` |
| Separator | `separator.tsx` |
| Sheet | `sheet.tsx` |
| Side Nav | `side-nav.tsx` |
| Sidebar | `sidebar.tsx` |
| Skeleton | `skeleton.tsx` |
| Slider | `slider.tsx` |
| Spinner | `spinner.tsx` |
| Structured List | `structured-list.tsx` |
| Switch | `switch.tsx` |
| Table | `table.tsx` |
| Tabs | `tabs.tsx` |
| Tag | `tag.tsx` |
| Tearsheet | `tearsheet.tsx` |
| Text Area | `text-area.tsx` |
| Textarea | `textarea.tsx` |
| Tile | `tile.tsx` |
| Time Picker | `time-picker.tsx` |
| Toaster | `toaster.tsx` |
| Toggle Group | `toggle-group.tsx` |
| Toggle Tip | `toggle-tip.tsx` |
| Toggle | `toggle.tsx` |
| Tooltip | `tooltip.tsx` |
| Tree View | `tree-view.tsx` |
| Ui Shell Header | `ui-shell-header.tsx` |


## Reading Component Source

When implementing or extending components:

1. **Read the source file** from `components/ui/` - it contains the complete implementation
2. **Follow the same patterns** - use CVA for variants, cn() for class merging, forwardRef for refs
3. **Check imports** - component dependencies are visible at the top of each file

The component files are the single source of truth. This guide provides the principles; the files provide the implementation.


---

# Quick Start

1. Copy the `components/ui/` folder to your project's `src/components/ui/`
2. Copy `lib/utils.ts` to your `src/lib/`
3. Merge `styles/globals.css` with your global styles
4. Merge `tailwind.config.js` with your Tailwind config
5. Install dependencies from `package.json`

You're ready to use CarbonCN components!

---

*Generated by CarbonCN Design System Export*
*For updates and more components, visit: https://github.com/GaragePlug-AI/carboncn-design-system*
