import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const loadingVariants = cva("", {
  variants: {
    size: {
      small: "h-4 w-4",
      normal: "h-12 w-12",
      large: "h-20 w-20",
    },
  },
  defaultVariants: {
    size: "normal",
  },
})

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  active?: boolean
  withOverlay?: boolean
  description?: string
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      size,
      active = true,
      withOverlay = false,
      description = "Loading",
      ...props
    },
    ref
  ) => {
    if (!active) return null

    const spinner = (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={description}
        className={cn("relative", loadingVariants({ size, className }))}
        {...props}
      >
        {/* Carbon loading spinner - animated circles */}
        <svg
          className="animate-spin"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-carbon-blue-60"
            cx="50"
            cy="50"
            r="44"
            fill="none"
            strokeWidth="8"
            strokeDasharray="276.46"
            strokeDashoffset="69.115"
            strokeLinecap="butt"
          />
        </svg>
        <span className="sr-only">{description}</span>
      </div>
    )

    if (withOverlay) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-gray-100/60 dark:bg-carbon-gray-100/80">
          <div className="flex flex-col items-center gap-carbon-04">
            {spinner}
            {size !== "small" && (
              <p className="text-sm text-white">{description}</p>
            )}
          </div>
        </div>
      )
    }

    return spinner
  }
)
Loading.displayName = "Loading"

// Loading Button overlay (for button states)
const ButtonLoading = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("absolute inset-0 flex items-center justify-center", className)}
    {...props}
  >
    <Loading size="small" />
  </span>
))
ButtonLoading.displayName = "ButtonLoading"

export { Loading, ButtonLoading, loadingVariants }

