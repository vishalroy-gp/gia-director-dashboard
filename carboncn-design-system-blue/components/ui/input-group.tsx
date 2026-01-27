import * as React from "react"
import { cn } from "@/lib/utils"

// Input Group - Container for input with addons
const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-stretch", className)}
    {...props}
  />
))
InputGroup.displayName = "InputGroup"

// Input Addon - Prefix or suffix for input
interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right"
}

const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, position = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-carbon-04 bg-carbon-gray-20 dark:bg-carbon-gray-80 border-b-2 border-carbon-gray-50 dark:border-carbon-gray-70 text-sm text-muted-foreground",
        position === "left" && "border-r-0",
        position === "right" && "border-l-0",
        className
      )}
      {...props}
    />
  )
)
InputAddon.displayName = "InputAddon"

// Input Element wrapper for use within InputGroup
const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex-1 h-10 px-carbon-04 bg-carbon-gray-10 dark:bg-carbon-gray-90",
      "border-b-2 border-carbon-gray-50 dark:border-carbon-gray-70",
      "text-sm placeholder:text-carbon-gray-50",
      "focus:outline-none focus:border-carbon-blue-60 focus:ring-2 focus:ring-carbon-blue-60 focus:ring-inset",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      // Remove border radius when in group
      "first:rounded-l-none last:rounded-r-none",
      className
    )}
    {...props}
  />
))
InputGroupInput.displayName = "InputGroupInput"

// Input Button - Button addon for input group
interface InputButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: "left" | "right"
}

const InputButton = React.forwardRef<HTMLButtonElement, InputButtonProps>(
  ({ className, position = "right", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex items-center justify-center px-carbon-04 bg-carbon-blue-60 text-white text-sm font-medium",
        "hover:bg-carbon-blue-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        position === "left" && "border-r-0",
        position === "right" && "border-l-0",
        className
      )}
      {...props}
    />
  )
)
InputButton.displayName = "InputButton"

export { InputGroup, InputAddon, InputGroupInput, InputButton }

