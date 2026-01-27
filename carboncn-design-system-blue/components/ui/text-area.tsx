import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  labelText?: string
  hideLabel?: boolean
  helperText?: string
  invalid?: boolean
  invalidText?: string
  warn?: boolean
  warnText?: string
  enableCounter?: boolean
  maxCount?: number
  light?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      labelText,
      hideLabel = false,
      helperText,
      invalid = false,
      invalidText,
      warn = false,
      warnText,
      enableCounter = false,
      maxCount,
      light = false,
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId()
    const displayLabel = label || labelText
    const [charCount, setCharCount] = React.useState(
      String(value || defaultValue || "").length
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

    // Sync external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length)
      }
    }, [value])

    return (
      <div className={cn("w-full", className)}>
        {displayLabel && (
          <div className="flex items-center justify-between mb-carbon-02">
            <Label
              htmlFor={inputId}
              className={cn(
                "text-xs text-muted-foreground",
                hideLabel && "sr-only",
                disabled && "text-carbon-gray-50"
              )}
            >
              {displayLabel}
            </Label>
            {enableCounter && (
              <span
                className={cn(
                  "text-xs text-muted-foreground",
                  maxCount && charCount > maxCount && "text-carbon-red-60"
                )}
              >
                {charCount}
                {maxCount && ` / ${maxCount}`}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={
            invalid
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            "w-full min-h-[128px] px-carbon-05 py-carbon-03 text-sm",
            "bg-carbon-gray-10 dark:bg-carbon-gray-90",
            "border-b-2 border-carbon-gray-50 dark:border-carbon-gray-70",
            "placeholder:text-carbon-gray-50",
            "transition-colors duration-fast-02",
            "hover:border-carbon-gray-60 dark:hover:border-carbon-gray-60",
            "focus:outline-none focus:border-carbon-blue-60 focus:ring-2 focus:ring-carbon-blue-60 focus:ring-inset",
            invalid && "border-carbon-red-60 focus:border-carbon-red-60 focus:ring-carbon-red-60",
            warn && !invalid && "border-carbon-yellow-30",
            disabled && "opacity-50 cursor-not-allowed bg-carbon-gray-20 dark:bg-carbon-gray-80",
            light && "bg-white dark:bg-carbon-gray-100",
            "resize-y"
          )}
          {...props}
        />

        {/* Helper / Error / Warning text */}
        {(helperText || (invalid && invalidText) || (warn && warnText)) && (
          <p
            id={invalid ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              "mt-carbon-02 text-xs",
              invalid
                ? "text-carbon-red-60"
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
TextArea.displayName = "TextArea"

export { TextArea }

