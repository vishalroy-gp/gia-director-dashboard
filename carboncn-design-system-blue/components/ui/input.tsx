import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  warning?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, warning, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border border-transparent border-b-carbon-gray-50 bg-carbon-gray-10 px-4 py-2 text-sm transition-all duration-fast-02 motion-productive",
          "placeholder:text-carbon-gray-50",
          // Carbon focus: full 2px border, not just bottom
          "focus-visible:outline-none focus-visible:border-2 focus-visible:border-carbon-blue-60 focus-visible:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-carbon-gray-20 disabled:border-transparent",
          // Error state: full 2px red border
          error && "border-2 border-carbon-red-60",
          // Warning state: full 2px yellow border  
          warning && "border-2 border-carbon-yellow-30",
          "dark:bg-carbon-gray-90 dark:placeholder:text-carbon-gray-40 dark:border-b-carbon-gray-60",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

