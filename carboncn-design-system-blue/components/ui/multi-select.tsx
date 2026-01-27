import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  invalidText?: string
  helperText?: string
  label?: string
  hideLabel?: boolean
  id?: string
  className?: string
  direction?: "top" | "bottom"
  filterable?: boolean
  clearable?: boolean
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select options",
      disabled = false,
      invalid = false,
      invalidText,
      helperText,
      label,
      hideLabel = false,
      id,
      className,
      direction = "bottom",
      filterable = false,
      clearable = true,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [filterText, setFilterText] = React.useState("")
    const inputId = id || React.useId()
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
          setFilterText("")
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const filteredOptions = React.useMemo(() => {
      if (!filterText) return options
      return options.filter((option) =>
        option.label.toLowerCase().includes(filterText.toLowerCase())
      )
    }, [options, filterText])

    const handleToggle = (optionValue: string) => {
      if (disabled) return
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
      onChange?.(newValue)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.([])
    }

    const handleRemoveTag = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.(value.filter((v) => v !== optionValue))
    }

    const selectedLabels = value
      .map((v) => options.find((o) => o.value === v)?.label)
      .filter(Boolean)

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              "mb-carbon-02",
              hideLabel && "sr-only"
            )}
          >
            {label}
          </Label>
        )}

        <div ref={containerRef} className="relative">
          {/* Trigger button */}
          <button
            type="button"
            id={inputId}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className={cn(
              "w-full h-10 px-carbon-05 bg-carbon-gray-10 dark:bg-carbon-gray-90",
              "border-b-2 border-carbon-gray-50 dark:border-carbon-gray-70",
              "flex items-center justify-between gap-carbon-03 text-sm text-left",
              "transition-colors duration-fast-02",
              "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-80",
              "focus:outline-none focus:border-carbon-blue-60",
              disabled && "opacity-50 cursor-not-allowed",
              invalid && "border-carbon-red-60",
              isOpen && "border-carbon-blue-60"
            )}
          >
            <span className="flex-1 truncate">
              {selectedLabels.length > 0
                ? `${selectedLabels.length} selected`
                : placeholder}
            </span>
            <div className="flex items-center gap-1">
              {clearable && value.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-carbon-gray-30 dark:hover:bg-carbon-gray-70 rounded-sm"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-fast-02",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </button>

          {/* Selected tags */}
          {value.length > 0 && (
            <div className="flex flex-wrap gap-carbon-02 mt-carbon-02">
              {value.map((v) => {
                const option = options.find((o) => o.value === v)
                if (!option) return null
                return (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 px-carbon-03 py-carbon-01 bg-carbon-gray-20 dark:bg-carbon-gray-70 text-xs"
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveTag(v, e)}
                      className="hover:text-carbon-red-60"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )
              })}
            </div>
          )}

          {/* Dropdown menu */}
          {isOpen && (
            <div
              role="listbox"
              aria-multiselectable="true"
              className={cn(
                "absolute z-50 w-full bg-carbon-gray-10 dark:bg-carbon-gray-90",
                "border border-carbon-gray-30 dark:border-carbon-gray-70 shadow-lg",
                "max-h-60 overflow-auto",
                direction === "top" ? "bottom-full mb-1" : "top-full mt-1"
              )}
            >
              {filterable && (
                <div className="p-carbon-03 border-b border-carbon-gray-20 dark:border-carbon-gray-80">
                  <input
                    type="text"
                    placeholder="Filter options..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-full px-carbon-03 py-carbon-02 bg-transparent border-b border-carbon-gray-50 text-sm focus:outline-none focus:border-carbon-blue-60"
                    autoFocus
                  />
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="p-carbon-04 text-sm text-carbon-gray-50">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={value.includes(option.value)}
                    disabled={option.disabled}
                    onClick={() => handleToggle(option.value)}
                    className={cn(
                      "w-full flex items-center gap-carbon-03 px-carbon-05 py-carbon-03 text-sm text-left cursor-pointer",
                      "transition-colors duration-fast-02",
                      "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-80",
                      "focus:outline-none focus:bg-carbon-gray-20 dark:focus:bg-carbon-gray-80",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span
                      className={cn(
                        "h-4 w-4 border flex items-center justify-center shrink-0",
                        value.includes(option.value)
                          ? "bg-carbon-blue-60 border-carbon-blue-60 text-white"
                          : "border-carbon-gray-50"
                      )}
                    >
                      {value.includes(option.value) && (
                        <Check className="h-3 w-3" />
                      )}
                    </span>
                    {option.label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Helper/Error text */}
        {(helperText || (invalid && invalidText)) && (
          <p
            className={cn(
              "mt-carbon-02 text-xs",
              invalid ? "text-carbon-red-60" : "text-carbon-gray-50"
            )}
          >
            {invalid ? invalidText : helperText}
          </p>
        )}
      </div>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }

