import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full border bg-carbon-gray-10 px-4 py-3 text-sm transition-colors duration-fast-02 motion-productive resize-y",
          "placeholder:text-carbon-gray-50",
          "focus-visible:outline-none focus-visible:border-2 focus-visible:border-carbon-blue-60 focus-visible:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-carbon-gray-20",
          error ? "border-2 border-carbon-red-60" : "border-carbon-gray-50",
          "dark:bg-carbon-gray-90 dark:placeholder:text-carbon-gray-40",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

