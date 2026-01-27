import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  invalidText?: string
  helperText?: string
  warn?: boolean
  warnText?: string
  label?: string
  hideLabel?: boolean
  id?: string
  className?: string
  direction?: "top" | "bottom"
  allowCustomValue?: boolean
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value = "",
      onChange,
      placeholder = "Search...",
      disabled = false,
      invalid = false,
      invalidText,
      helperText,
      warn = false,
      warnText,
      label,
      hideLabel = false,
      id,
      className,
      direction = "bottom",
      allowCustomValue = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const inputId = id || React.useId()
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLUListElement>(null)

    // Sync input value with controlled value
    React.useEffect(() => {
      const selectedOption = options.find((o) => o.value === value)
      setInputValue(selectedOption?.label || value)
    }, [value, options])

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
          // Reset input if no valid selection
          if (!allowCustomValue) {
            const selectedOption = options.find((o) => o.value === value)
            setInputValue(selectedOption?.label || "")
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [value, options, allowCustomValue])

    const filteredOptions = React.useMemo(() => {
      if (!inputValue) return options
      return options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    }, [options, inputValue])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      setIsOpen(true)
      setHighlightedIndex(-1)

      if (allowCustomValue) {
        onChange?.(e.target.value)
      }
    }

    const handleSelect = (option: ComboboxOption) => {
      if (option.disabled) return
      setInputValue(option.label)
      onChange?.(option.value)
      setIsOpen(false)
      setHighlightedIndex(-1)
    }

    const handleClear = () => {
      setInputValue("")
      onChange?.("")
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            )
          }
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex])
          }
          break
        case "Escape":
          setIsOpen(false)
          break
      }
    }

    // Scroll highlighted option into view
    React.useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const item = listRef.current.children[highlightedIndex] as HTMLElement
        item?.scrollIntoView({ block: "nearest" })
      }
    }, [highlightedIndex])

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn("mb-carbon-02", hideLabel && "sr-only")}
          >
            {label}
          </Label>
        )}

        <div ref={containerRef} className="relative">
          {/* Input field */}
          <div
            className={cn(
              "relative flex items-center bg-carbon-gray-10 dark:bg-carbon-gray-90",
              "border-b-2 border-carbon-gray-50 dark:border-carbon-gray-70",
              "transition-colors duration-fast-02",
              "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-80",
              disabled && "opacity-50 cursor-not-allowed",
              invalid && "border-carbon-red-60",
              warn && !invalid && "border-carbon-yellow-30",
              isOpen && "border-carbon-blue-60"
            )}
          >
            <input
              ref={inputRef}
              type="text"
              id={inputId}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={placeholder}
              autoComplete="off"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              className={cn(
                "w-full h-10 px-carbon-05 bg-transparent text-sm",
                "focus:outline-none",
                "placeholder:text-carbon-gray-50"
              )}
            />
            <div className="flex items-center gap-1 pr-carbon-03">
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={disabled}
                  className="p-1 hover:bg-carbon-gray-30 dark:hover:bg-carbon-gray-70 rounded-sm"
                  aria-label="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className="p-1"
                tabIndex={-1}
                aria-label="Toggle options"
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-fast-02",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <ul
              ref={listRef}
              role="listbox"
              className={cn(
                "absolute z-50 w-full bg-carbon-gray-10 dark:bg-carbon-gray-90",
                "border border-carbon-gray-30 dark:border-carbon-gray-70 shadow-lg",
                "max-h-60 overflow-auto",
                direction === "top" ? "bottom-full mb-1" : "top-full mt-1"
              )}
            >
              {filteredOptions.length === 0 ? (
                <li className="p-carbon-04 text-sm text-carbon-gray-50">
                  No results found
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "flex items-center gap-carbon-03 px-carbon-05 py-carbon-03 text-sm cursor-pointer",
                      "transition-colors duration-fast-02",
                      option.value === value &&
                        "bg-carbon-gray-20 dark:bg-carbon-gray-80",
                      highlightedIndex === index &&
                        "bg-carbon-gray-20 dark:bg-carbon-gray-80",
                      !option.disabled &&
                        "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-80",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="flex-1">{option.label}</span>
                    {option.value === value && (
                      <Check className="h-4 w-4 text-carbon-blue-60" />
                    )}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Helper/Warning/Error text */}
        {(helperText || (invalid && invalidText) || (warn && warnText)) && (
          <p
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
Combobox.displayName = "Combobox"

export { Combobox }

