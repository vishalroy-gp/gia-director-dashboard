import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

// Fluid Form - Full-width form layout with connected fields
const FluidForm = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
))
FluidForm.displayName = "FluidForm"

// Fluid Form Group - Groups connected fields together
const FluidFormGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    legendText?: string
  }
>(({ className, legendText, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  >
    {legendText && (
      <legend className="text-sm font-semibold mb-carbon-04">{legendText}</legend>
    )}
    <div className="flex flex-wrap">
      {children}
    </div>
  </div>
))
FluidFormGroup.displayName = "FluidFormGroup"

// Fluid Text Input
export interface FluidTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  invalid?: boolean
  invalidText?: string
  warn?: boolean
  warnText?: string
}

const FluidTextInput = React.forwardRef<HTMLInputElement, FluidTextInputProps>(
  (
    {
      className,
      label,
      helperText,
      invalid = false,
      invalidText,
      warn = false,
      warnText,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId()

    return (
      <div
        className={cn(
          "relative flex-1 min-w-[200px]",
          disabled && "opacity-50",
          className
        )}
      >
        <div
          className={cn(
            "relative bg-carbon-gray-10 dark:bg-carbon-gray-90 h-16",
            "border-l-2 border-carbon-blue-60",
            "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-80",
            "focus-within:border-l-2 focus-within:border-carbon-blue-60",
            invalid && "border-l-carbon-red-60",
            warn && !invalid && "border-l-carbon-yellow-30"
          )}
        >
          <Label
            htmlFor={inputId}
            className={cn(
              "absolute left-carbon-04 top-carbon-03 text-xs text-muted-foreground transition-all",
              disabled && "text-carbon-gray-50"
            )}
          >
            {label}
          </Label>
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "absolute bottom-0 left-0 right-0 h-10 px-carbon-04 bg-transparent text-sm",
              "focus:outline-none",
              "placeholder:text-carbon-gray-50",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />
        </div>
        {(helperText || (invalid && invalidText) || (warn && warnText)) && (
          <p
            className={cn(
              "px-carbon-04 py-carbon-02 text-xs",
              invalid
                ? "text-carbon-red-60 bg-carbon-red-10"
                : warn
                ? "text-carbon-yellow-30 dark:text-carbon-yellow-40"
                : "text-carbon-gray-50"
            )}
          >
            {invalid ? invalidText : warn ? warnText : helperText}
          </p>
        )}
      </div>
    )
  }
)
FluidTextInput.displayName = "FluidTextInput"

// Fluid Textarea
export interface FluidTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  invalid?: boolean
  invalidText?: string
}

const FluidTextArea = React.forwardRef<HTMLTextAreaElement, FluidTextAreaProps>(
  (
    {
      className,
      label,
      helperText,
      invalid = false,
      invalidText,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId()

    return (
      <div
        className={cn(
          "relative w-full border border-carbon-gray-30 dark:border-carbon-gray-70",
          disabled && "opacity-50",
          className
        )}
      >
        <div
          className={cn(
            "relative bg-carbon-gray-10 dark:bg-carbon-gray-90 min-h-[120px]",
            "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-80",
            "focus-within:ring-2 focus-within:ring-inset focus-within:ring-carbon-blue-60",
            invalid && "ring-2 ring-inset ring-carbon-red-60"
          )}
        >
          <Label
            htmlFor={inputId}
            className={cn(
              "absolute left-carbon-04 top-carbon-03 text-xs text-muted-foreground",
              disabled && "text-carbon-gray-50"
            )}
          >
            {label}
          </Label>
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "absolute top-7 left-0 right-0 bottom-0 px-carbon-04 py-carbon-02 bg-transparent text-sm resize-none",
              "focus:outline-none",
              "placeholder:text-carbon-gray-50",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />
        </div>
        {(helperText || (invalid && invalidText)) && (
          <p
            className={cn(
              "px-carbon-04 py-carbon-02 text-xs",
              invalid
                ? "text-carbon-red-60 bg-carbon-red-10"
                : "text-carbon-gray-50"
            )}
          >
            {invalid ? invalidText : helperText}
          </p>
        )}
      </div>
    )
  }
)
FluidTextArea.displayName = "FluidTextArea"

export { FluidForm, FluidFormGroup, FluidTextInput, FluidTextArea }

