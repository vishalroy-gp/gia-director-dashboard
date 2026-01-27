import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const tileVariants = cva(
  "block p-carbon-05 transition-all duration-fast-02 motion-productive",
  {
    variants: {
      variant: {
        // Read-only tile - just a container
        default: "bg-carbon-gray-10 dark:bg-carbon-gray-80",
        // Clickable tile - interactive
        clickable: [
          "bg-carbon-gray-10 dark:bg-carbon-gray-80 cursor-pointer",
          "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-inset",
        ],
        // Selectable tile - can be selected
        selectable: [
          "bg-carbon-gray-10 dark:bg-carbon-gray-80 cursor-pointer relative",
          "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-inset",
        ],
        // Expandable tile
        expandable: [
          "bg-carbon-gray-10 dark:bg-carbon-gray-80 cursor-pointer",
          "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-inset",
        ],
      },
      light: {
        true: "bg-white dark:bg-carbon-gray-90",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      light: false,
    },
  }
)

// Base Tile component
export interface TileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tileVariants> {}

const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  ({ className, variant, light, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tileVariants({ variant, light, className }))}
      {...props}
    />
  )
)
Tile.displayName = "Tile"

// Clickable Tile
export interface ClickableTileProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<VariantProps<typeof tileVariants>, "variant"> {}

const ClickableTile = React.forwardRef<HTMLAnchorElement, ClickableTileProps>(
  ({ className, light, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(tileVariants({ variant: "clickable", light, className }))}
      {...props}
    />
  )
)
ClickableTile.displayName = "ClickableTile"

// Selectable Tile
export interface SelectableTileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    Omit<VariantProps<typeof tileVariants>, "variant"> {
  selected?: boolean
}

const SelectableTile = React.forwardRef<HTMLInputElement, SelectableTileProps>(
  ({ className, light, selected, children, id, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={selected}
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            tileVariants({ variant: "selectable", light }),
            "peer-checked:border-2 peer-checked:border-carbon-blue-60",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-carbon-blue-60 peer-focus-visible:ring-inset",
            className
          )}
        >
          {children}
          <span
            className={cn(
              "absolute top-3 right-3 h-5 w-5 border-2 flex items-center justify-center transition-colors",
              selected
                ? "bg-carbon-blue-60 border-carbon-blue-60 text-white"
                : "border-carbon-gray-50 bg-transparent"
            )}
          >
            {selected && <Check className="h-3 w-3" />}
          </span>
        </label>
      </div>
    )
  }
)
SelectableTile.displayName = "SelectableTile"

// Expandable Tile
export interface ExpandableTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof tileVariants>, "variant"> {
  expanded?: boolean
  onExpandChange?: (expanded: boolean) => void
  tileCollapsedLabel?: string
  tileExpandedLabel?: string
  aboveTheFold?: React.ReactNode
  belowTheFold?: React.ReactNode
}

const ExpandableTile = React.forwardRef<HTMLDivElement, ExpandableTileProps>(
  (
    {
      className,
      light,
      expanded: controlledExpanded,
      onExpandChange,
      tileCollapsedLabel = "Show more",
      tileExpandedLabel = "Show less",
      aboveTheFold,
      belowTheFold,
      ...props
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(false)
    const expanded = controlledExpanded ?? internalExpanded

    const handleToggle = () => {
      const newExpanded = !expanded
      setInternalExpanded(newExpanded)
      onExpandChange?.(newExpanded)
    }

    return (
      <div
        ref={ref}
        className={cn(tileVariants({ variant: "expandable", light, className }))}
        {...props}
      >
        {aboveTheFold}
        <div
          className={cn(
            "overflow-hidden transition-all duration-moderate-02",
            expanded ? "max-h-96 opacity-100 mt-carbon-04" : "max-h-0 opacity-0"
          )}
        >
          {belowTheFold}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={expanded}
          className="mt-carbon-04 text-sm text-carbon-blue-60 hover:text-carbon-blue-70 focus:outline-none focus-visible:underline"
        >
          {expanded ? tileExpandedLabel : tileCollapsedLabel}
        </button>
      </div>
    )
  }
)
ExpandableTile.displayName = "ExpandableTile"

// Radio Tile (single selection)
export interface RadioTileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    Omit<VariantProps<typeof tileVariants>, "variant"> {}

const RadioTile = React.forwardRef<HTMLInputElement, RadioTileProps>(
  ({ className, light, children, id, checked, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <div className="relative">
        <input
          ref={ref}
          type="radio"
          id={inputId}
          checked={checked}
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            tileVariants({ variant: "selectable", light }),
            "peer-checked:border-2 peer-checked:border-carbon-blue-60",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-carbon-blue-60 peer-focus-visible:ring-inset",
            className
          )}
        >
          {children}
          <span
            className={cn(
              "absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
              checked
                ? "border-carbon-blue-60"
                : "border-carbon-gray-50"
            )}
          >
            {checked && (
              <span className="h-2.5 w-2.5 rounded-full bg-carbon-blue-60" />
            )}
          </span>
        </label>
      </div>
    )
  }
)
RadioTile.displayName = "RadioTile"

export { Tile, ClickableTile, SelectableTile, ExpandableTile, RadioTile, tileVariants }

