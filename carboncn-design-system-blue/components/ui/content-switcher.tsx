import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContentSwitcherProps {
  options: { value: string; label: string; disabled?: boolean }[]
  value: string
  onChange: (value: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeStyles = {
  sm: "h-8 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
}

const ContentSwitcher = React.forwardRef<HTMLDivElement, ContentSwitcherProps>(
  ({ options, value, onChange, size = "md", className }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn("inline-flex", className)}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            role="tab"
            aria-selected={value === option.value}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center justify-center px-4 font-normal transition-colors duration-fast-02 motion-productive",
              "border border-carbon-gray-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              sizeStyles[size],
              // First button
              index === 0 && "border-r-0",
              // Middle buttons
              index > 0 && index < options.length - 1 && "border-r-0",
              // Selected state
              value === option.value
                ? "bg-carbon-gray-100 text-white border-carbon-gray-100 dark:bg-carbon-gray-10 dark:text-carbon-gray-100 dark:border-carbon-gray-10"
                : "bg-transparent text-foreground hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  }
)
ContentSwitcher.displayName = "ContentSwitcher"

export { ContentSwitcher }

