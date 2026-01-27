import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full text-xs font-normal transition-colors duration-fast-02",
  {
    variants: {
      variant: {
        gray: "bg-carbon-gray-20 text-carbon-gray-100 dark:bg-carbon-gray-70 dark:text-carbon-gray-10",
        blue: "bg-carbon-blue-10 text-carbon-blue-70 dark:bg-carbon-blue-80 dark:text-carbon-blue-20",
        green: "bg-carbon-green-10 text-carbon-green-70 dark:bg-carbon-green-80 dark:text-carbon-green-20",
        red: "bg-carbon-red-10 text-carbon-red-70 dark:bg-carbon-red-80 dark:text-carbon-red-20",
        purple: "bg-carbon-purple-10 text-carbon-purple-70 dark:bg-carbon-purple-80 dark:text-carbon-purple-20",
        teal: "bg-carbon-teal-10 text-carbon-teal-70 dark:bg-carbon-teal-80 dark:text-carbon-teal-20",
        yellow: "bg-carbon-yellow-10 text-carbon-yellow-70 dark:bg-carbon-yellow-80 dark:text-carbon-yellow-20",
      },
      size: {
        sm: "h-[18px] px-2 text-xs",
        md: "h-6 px-2 text-xs",
        lg: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "md",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  dismissible?: boolean
  onDismiss?: () => void
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, dismissible, onDismiss, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size, className }))}
        {...props}
      >
        {children}
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-1 hover:opacity-70 focus:outline-none"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }

