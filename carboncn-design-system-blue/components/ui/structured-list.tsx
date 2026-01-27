import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const StructuredList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selection?: boolean }
>(({ className, selection = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
))
StructuredList.displayName = "StructuredList"

const StructuredListHead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex border-b border-carbon-gray-30 dark:border-carbon-gray-70",
      className
    )}
    {...props}
  />
))
StructuredListHead.displayName = "StructuredListHead"

const StructuredListBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("divide-y divide-carbon-gray-20 dark:divide-carbon-gray-80", className)} {...props} />
))
StructuredListBody.displayName = "StructuredListBody"

interface StructuredListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
  onSelect?: () => void
  selection?: boolean
}

const StructuredListRow = React.forwardRef<HTMLDivElement, StructuredListRowProps>(
  ({ className, selected, onSelect, selection, children, ...props }, ref) => (
    <div
      ref={ref}
      role={selection ? "radio" : undefined}
      aria-checked={selection ? selected : undefined}
      onClick={selection ? onSelect : undefined}
      className={cn(
        "flex items-center py-carbon-05",
        selection && "cursor-pointer hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80",
        selected && "bg-carbon-gray-10 dark:bg-carbon-gray-80",
        className
      )}
      {...props}
    >
      {children}
      {selection && (
        <div className="shrink-0 w-12 flex items-center justify-center">
          {selected && <Check className="h-5 w-5 text-carbon-blue-60" />}
        </div>
      )}
    </div>
  )
)
StructuredListRow.displayName = "StructuredListRow"

const StructuredListCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { head?: boolean }
>(({ className, head = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 px-carbon-05",
      head ? "text-xs font-semibold text-carbon-gray-70 dark:text-carbon-gray-30 uppercase tracking-wider py-2" : "text-sm",
      className
    )}
    {...props}
  />
))
StructuredListCell.displayName = "StructuredListCell"

export {
  StructuredList,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
}

