import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface TimePickerProps {
  value?: string // Format: "HH:mm" or "HH:mm:ss"
  onChange?: (value: string) => void
  label?: string
  hideLabel?: boolean
  helperText?: string
  invalid?: boolean
  invalidText?: string
  disabled?: boolean
  id?: string
  className?: string
  use24Hour?: boolean
  showSeconds?: boolean
  placeholder?: string
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value = "",
      onChange,
      label,
      hideLabel = false,
      helperText,
      invalid = false,
      invalidText,
      disabled = false,
      id,
      className,
      use24Hour = true,
      showSeconds = false,
      placeholder = "Select time",
    },
    ref
  ) => {
    const inputId = id || React.useId()
    const [isOpen, setIsOpen] = React.useState(false)
    const [hours, setHours] = React.useState("")
    const [minutes, setMinutes] = React.useState("")
    const [seconds, setSeconds] = React.useState("")
    const [period, setPeriod] = React.useState<"AM" | "PM">("AM")

    // Parse value into components
    React.useEffect(() => {
      if (value) {
        const parts = value.split(":")
        let h = parseInt(parts[0] || "0", 10)
        const m = parts[1] || "00"
        const s = parts[2] || "00"

        if (!use24Hour) {
          if (h >= 12) {
            setPeriod("PM")
            if (h > 12) h -= 12
          } else {
            setPeriod("AM")
            if (h === 0) h = 12
          }
        }

        setHours(h.toString().padStart(2, "0"))
        setMinutes(m)
        setSeconds(s)
      }
    }, [value, use24Hour])

    const updateValue = (h: string, m: string, s: string, p: "AM" | "PM") => {
      let hour = parseInt(h, 10)
      if (isNaN(hour)) return

      if (!use24Hour) {
        if (p === "PM" && hour !== 12) hour += 12
        if (p === "AM" && hour === 12) hour = 0
      }

      const timeString = showSeconds
        ? `${hour.toString().padStart(2, "0")}:${m}:${s}`
        : `${hour.toString().padStart(2, "0")}:${m}`

      onChange?.(timeString)
    }

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, 2)
      const max = use24Hour ? 23 : 12
      const min = use24Hour ? 0 : 1
      let num = parseInt(val, 10)
      if (num > max) num = max
      if (num < min && val !== "") num = min
      const newHours = isNaN(num) ? "" : num.toString().padStart(2, "0")
      setHours(newHours)
      if (newHours) updateValue(newHours, minutes || "00", seconds || "00", period)
    }

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, 2)
      let num = parseInt(val, 10)
      if (num > 59) num = 59
      const newMinutes = isNaN(num) ? "" : num.toString().padStart(2, "0")
      setMinutes(newMinutes)
      if (hours && newMinutes) updateValue(hours, newMinutes, seconds || "00", period)
    }

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, 2)
      let num = parseInt(val, 10)
      if (num > 59) num = 59
      const newSeconds = isNaN(num) ? "" : num.toString().padStart(2, "0")
      setSeconds(newSeconds)
      if (hours && minutes) updateValue(hours, minutes, newSeconds, period)
    }

    const togglePeriod = () => {
      const newPeriod = period === "AM" ? "PM" : "AM"
      setPeriod(newPeriod)
      if (hours && minutes) updateValue(hours, minutes, seconds || "00", newPeriod)
    }

    const displayValue = value
      ? use24Hour
        ? value
        : `${hours}:${minutes}${showSeconds ? `:${seconds}` : ""} ${period}`
      : ""

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

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                id={inputId}
                value={displayValue}
                placeholder={placeholder}
                readOnly
                disabled={disabled}
                error={invalid}
                className="pr-10 cursor-pointer"
                onClick={() => !disabled && setIsOpen(true)}
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-carbon-05" align="start">
            <div className="flex items-end gap-1">
              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs text-muted-foreground">Hour</Label>
                <Input
                  value={hours}
                  onChange={handleHoursChange}
                  className="w-16 h-10 text-center px-2 text-base font-medium"
                  placeholder="00"
                  maxLength={2}
                />
              </div>
              <span className="text-xl font-bold pb-2">:</span>
              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs text-muted-foreground">Min</Label>
                <Input
                  value={minutes}
                  onChange={handleMinutesChange}
                  className="w-16 h-10 text-center px-2 text-base font-medium"
                  placeholder="00"
                  maxLength={2}
                />
              </div>
              {showSeconds && (
                <>
                  <span className="text-xl font-bold pb-2">:</span>
                  <div className="flex flex-col items-center gap-1">
                    <Label className="text-xs text-muted-foreground">Sec</Label>
                    <Input
                      value={seconds}
                      onChange={handleSecondsChange}
                      className="w-16 h-10 text-center px-2 text-base font-medium"
                      placeholder="00"
                      maxLength={2}
                    />
                  </div>
                </>
              )}
              {!use24Hour && (
                <div className="flex flex-col items-center gap-1">
                  <Label className="text-xs text-muted-foreground">Period</Label>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={togglePeriod}
                    className="w-14 h-10"
                  >
                    {period}
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

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
TimePicker.displayName = "TimePicker"

export { TimePicker }

