import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Checkbox } from "./checkbox"

// Data Table Root
interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, size = "lg", ...props }, ref) => (
    <div
      ref={ref}
      data-size={size}
      className={cn("w-full", className)}
      {...props}
    />
  )
)
DataTable.displayName = "DataTable"

// Table Toolbar
interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-carbon-04 px-carbon-05 py-carbon-04 bg-carbon-gray-10 dark:bg-carbon-gray-80",
        className
      )}
      {...props}
    >
      <div>
        {title && <h4 className="text-sm font-semibold">{title}</h4>}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-carbon-03">{children}</div>
    </div>
  )
)
DataTableToolbar.displayName = "DataTableToolbar"

// Table Search
const DataTableSearch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    expanded?: boolean
    onExpandedChange?: (expanded: boolean) => void
  }
>(({ className, expanded = true, onExpandedChange, ...props }, ref) => {
  if (!expanded) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onExpandedChange?.(true)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-carbon-03 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={ref}
        type="search"
        placeholder="Search..."
        className="pl-8 h-8 w-[200px]"
        {...props}
      />
    </div>
  )
})
DataTableSearch.displayName = "DataTableSearch"

// Table Container (scrollable wrapper)
const DataTableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-auto", className)}
    {...props}
  />
))
DataTableContainer.displayName = "DataTableContainer"

// Table element
const DataTableContent = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full border-collapse", className)}
    {...props}
  />
))
DataTableContent.displayName = "DataTableContent"

// Table Header
const DataTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-carbon-gray-20 dark:bg-carbon-gray-70",
      className
    )}
    {...props}
  />
))
DataTableHeader.displayName = "DataTableHeader"

// Table Body
const DataTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
DataTableBody.displayName = "DataTableBody"

// Header Row
const DataTableHeaderRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b border-carbon-gray-30 dark:border-carbon-gray-60", className)}
    {...props}
  />
))
DataTableHeaderRow.displayName = "DataTableHeaderRow"

// Table Row
interface DataTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  disabled?: boolean
}

const DataTableRow = React.forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ className, selected, disabled, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "border-b border-carbon-gray-20 dark:border-carbon-gray-70",
        "transition-colors duration-fast-02",
        "hover:bg-carbon-gray-20/50 dark:hover:bg-carbon-gray-70/50",
        selected && "bg-carbon-blue-10 dark:bg-carbon-blue-90",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    />
  )
)
DataTableRow.displayName = "DataTableRow"

// Header Cell
interface DataTableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sorted?: "asc" | "desc" | false
  onSort?: () => void
}

const DataTableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  DataTableHeaderCellProps
>(({ className, sortable, sorted, onSort, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-carbon-05 text-left text-xs font-semibold text-foreground uppercase tracking-wide",
      // Size variants
      "[data-size='xs']_&]:h-6 [data-size='xs']_&]:px-carbon-03",
      "[data-size='sm']_&]:h-8 [data-size='sm']_&]:px-carbon-03",
      "[data-size='md']_&]:h-10",
      "[data-size='xl']_&]:h-16",
      sortable && "cursor-pointer select-none hover:bg-carbon-gray-30 dark:hover:bg-carbon-gray-60",
      className
    )}
    onClick={sortable ? onSort : undefined}
    aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
    {...props}
  >
    <div className="flex items-center gap-carbon-02">
      {children}
      {sortable && (
        <span className="shrink-0">
          {sorted === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : sorted === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          )}
        </span>
      )}
    </div>
  </th>
))
DataTableHeaderCell.displayName = "DataTableHeaderCell"

// Table Cell
const DataTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "h-12 px-carbon-05 text-sm",
      // Size variants
      "[data-size='xs']_&]:h-6 [data-size='xs']_&]:px-carbon-03 [data-size='xs']_&]:text-xs",
      "[data-size='sm']_&]:h-8 [data-size='sm']_&]:px-carbon-03 [data-size='sm']_&]:text-xs",
      "[data-size='md']_&]:h-10",
      "[data-size='xl']_&]:h-16",
      className
    )}
    {...props}
  />
))
DataTableCell.displayName = "DataTableCell"

// Checkbox cell for selection
interface DataTableSelectCellProps {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  ariaLabel?: string
}

const DataTableSelectCell = React.forwardRef<HTMLTableCellElement, DataTableSelectCellProps>(
  ({ checked, indeterminate, onCheckedChange, ariaLabel = "Select row" }, ref) => (
    <td ref={ref} className="w-12 px-carbon-03">
      <Checkbox
        checked={indeterminate ? "indeterminate" : checked}
        onCheckedChange={onCheckedChange}
        aria-label={ariaLabel}
      />
    </td>
  )
)
DataTableSelectCell.displayName = "DataTableSelectCell"

// Table Batch Actions Bar
interface DataTableBatchActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedCount: number
  onCancel?: () => void
}

const DataTableBatchActions = React.forwardRef<HTMLDivElement, DataTableBatchActionsProps>(
  ({ className, selectedCount, onCancel, children, ...props }, ref) => {
    if (selectedCount === 0) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-carbon-04 px-carbon-05 py-carbon-03 bg-carbon-blue-60 text-white",
          className
        )}
        {...props}
      >
        <span className="text-sm font-medium">
          {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
        </span>
        <div className="flex items-center gap-carbon-02">{children}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="ml-auto text-white hover:text-white hover:bg-white/20"
        >
          Cancel
        </Button>
      </div>
    )
  }
)
DataTableBatchActions.displayName = "DataTableBatchActions"

// Pagination
interface DataTablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalItems: number
  pageSize: number
  currentPage: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
  (
    {
      className,
      totalItems,
      pageSize,
      currentPage,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 25, 50, 100],
      ...props
    },
    ref
  ) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-carbon-05 py-carbon-03 bg-carbon-gray-10 dark:bg-carbon-gray-80 border-t border-carbon-gray-20 dark:border-carbon-gray-70",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-carbon-04">
          <label className="text-xs text-muted-foreground">
            Items per page:
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="ml-carbon-02 bg-transparent border-b border-carbon-gray-50 text-foreground focus:outline-none focus:border-carbon-blue-60"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <span className="text-xs text-muted-foreground">
            {startItem}–{endItem} of {totalItems} items
          </span>
        </div>

        <div className="flex items-center gap-carbon-01">
          <span className="text-xs text-muted-foreground mr-carbon-02">
            {currentPage} of {totalPages} pages
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }
)
DataTablePagination.displayName = "DataTablePagination"

export {
  DataTable,
  DataTableToolbar,
  DataTableSearch,
  DataTableContainer,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
  DataTableHeaderRow,
  DataTableRow,
  DataTableHeaderCell,
  DataTableCell,
  DataTableSelectCell,
  DataTableBatchActions,
  DataTablePagination,
}

