import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InlineLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "active" | "finished" | "error" | "inactive"
  description?: string
  iconDescription?: string
}

const InlineLoading = React.forwardRef<HTMLDivElement, InlineLoadingProps>(
  (
    {
      status = "active",
      description = "Loading...",
      iconDescription,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {/* Spinner / Status icon */}
        <span className="shrink-0">
          {status === "active" && (
            <svg
              className="h-4 w-4 animate-spin text-carbon-blue-60"
              viewBox="0 0 16 16"
              fill="none"
              aria-label={iconDescription || "Loading"}
            >
              <circle
                className="opacity-25"
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M8 2a6 6 0 016 6h-2a4 4 0 00-4-4V2z"
              />
            </svg>
          )}
          {status === "finished" && (
            <Check
              className="h-4 w-4 text-carbon-green-60"
              aria-label={iconDescription || "Finished"}
            />
          )}
          {status === "error" && (
            <X
              className="h-4 w-4 text-carbon-red-60"
              aria-label={iconDescription || "Error"}
            />
          )}
          {status === "inactive" && (
            <span className="h-4 w-4" aria-hidden />
          )}
        </span>

        {/* Description */}
        {description && (
          <span
            className={cn(
              "text-sm",
              status === "active" && "text-foreground",
              status === "finished" && "text-carbon-green-60",
              status === "error" && "text-carbon-red-60",
              status === "inactive" && "text-carbon-gray-50"
            )}
          >
            {description}
          </span>
        )}
      </div>
    )
  }
)
InlineLoading.displayName = "InlineLoading"

export { InlineLoading }

