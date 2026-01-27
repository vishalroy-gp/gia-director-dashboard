import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  size?: "sm" | "md" | "lg"
  min?: number
  max?: number
  step?: number
  value?: number
  onChange?: (value: number) => void
  error?: boolean
  warning?: boolean
}

const sizeStyles = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
}

const buttonSizeStyles = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      size = "md",
      min,
      max,
      step = 1,
      value = 0,
      onChange,
      error,
      warning,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleIncrement = () => {
      if (max !== undefined && value >= max) return
      onChange?.(value + step)
    }

    const handleDecrement = () => {
      if (min !== undefined && value <= min) return
      onChange?.(value - step)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      if (!isNaN(newValue)) {
        if (min !== undefined && newValue < min) return
        if (max !== undefined && newValue > max) return
        onChange?.(newValue)
      }
    }

    return (
      <div className={cn("inline-flex", className)}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || (min !== undefined && value <= min)}
          className={cn(
            "inline-flex items-center justify-center border border-r-0 border-carbon-gray-50 bg-carbon-gray-10 transition-colors duration-fast-02",
            "hover:bg-carbon-gray-20 disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "dark:bg-carbon-gray-90 dark:hover:bg-carbon-gray-80",
            buttonSizeStyles[size]
          )}
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            "w-20 text-center border border-carbon-gray-50 bg-carbon-gray-10 transition-all duration-fast-02 motion-productive",
            "focus-visible:outline-none focus-visible:border-2 focus-visible:border-carbon-blue-60",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:bg-carbon-gray-90",
            // Hide spin buttons
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            error && "border-2 border-carbon-red-60",
            warning && "border-2 border-carbon-yellow-30",
            sizeStyles[size]
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
          className={cn(
            "inline-flex items-center justify-center border border-l-0 border-carbon-gray-50 bg-carbon-gray-10 transition-colors duration-fast-02",
            "hover:bg-carbon-gray-20 disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "dark:bg-carbon-gray-90 dark:hover:bg-carbon-gray-80",
            buttonSizeStyles[size]
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }

