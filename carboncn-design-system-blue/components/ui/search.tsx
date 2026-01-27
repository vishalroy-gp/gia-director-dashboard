import * as React from "react"
import { Search as SearchIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg"
  onClear?: () => void
}

const sizeStyles = {
  sm: "h-8 text-sm pl-8 pr-8",
  md: "h-10 text-sm pl-10 pr-10",
  lg: "h-12 text-base pl-12 pr-12",
}

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
}

const iconPositions = {
  sm: "left-2",
  md: "left-3",
  lg: "left-4",
}

const clearPositions = {
  sm: "right-2",
  md: "right-3",
  lg: "right-4",
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, size = "md", value, onClear, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ""

    return (
      <div className="relative">
        <SearchIcon
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-carbon-gray-50",
            iconSizes[size],
            iconPositions[size]
          )}
        />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            "w-full bg-carbon-gray-10 border border-transparent border-b-carbon-gray-50 transition-all duration-fast-02 motion-productive",
            "placeholder:text-carbon-gray-50",
            "focus-visible:outline-none focus-visible:border-2 focus-visible:border-carbon-blue-60",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-carbon-gray-20",
            "dark:bg-carbon-gray-90 dark:placeholder:text-carbon-gray-40 dark:border-b-carbon-gray-60",
            // Hide default search cancel button
            "[&::-webkit-search-cancel-button]:hidden",
            sizeStyles[size],
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-carbon-gray-50 hover:text-foreground focus:outline-none",
              clearPositions[size]
            )}
          >
            <X className={iconSizes[size]} />
          </button>
        )}
      </div>
    )
  }
)
Search.displayName = "Search"

export { Search }

