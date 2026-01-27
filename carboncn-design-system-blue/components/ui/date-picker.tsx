import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minDate?: Date
  maxDate?: Date
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onChange, placeholder = "Select date", disabled, className, minDate, maxDate }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(() => value || new Date())

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    // const daysInPrevMonth = new Date(year, month, 0).getDate() // Available for prev month display

    const prevMonth = () => {
      setViewDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
      setViewDate(new Date(year, month + 1, 1))
    }

    const selectDate = (day: number) => {
      const selected = new Date(year, month, day)
      onChange?.(selected)
      setOpen(false)
    }

    const isDisabled = (day: number) => {
      const date = new Date(year, month, day)
      if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true
      if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true
      return false
    }

    const isSelected = (day: number) => {
      if (!value) return false
      return (
        value.getDate() === day &&
        value.getMonth() === month &&
        value.getFullYear() === year
      )
    }

    const isToday = (day: number) => {
      const today = new Date()
      return (
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year
      )
    }

    // Build calendar grid
    const calendarDays: (number | null)[] = []
    
    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push(null)
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day)
    }

    const formatDate = (date: Date) => {
      return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center justify-between border border-transparent border-b-carbon-gray-50 bg-carbon-gray-10 px-4 py-2 text-sm transition-all duration-fast-02 motion-productive",
              "focus-visible:outline-none focus-visible:border-2 focus-visible:border-carbon-blue-60",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:bg-carbon-gray-90 dark:border-b-carbon-gray-60",
              !value && "text-carbon-gray-50",
              className
            )}
          >
            <span>{value ? formatDate(value) : placeholder}</span>
            <CalendarIcon className="h-4 w-4 text-carbon-gray-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            {/* Header with month/year navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-semibold">
                {MONTHS[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="h-8 w-8 flex items-center justify-center text-xs font-medium text-carbon-gray-50"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div key={index} className="h-8 w-8">
                  {day !== null && (
                    <button
                      type="button"
                      disabled={isDisabled(day)}
                      onClick={() => selectDate(day)}
                      className={cn(
                        "h-8 w-8 flex items-center justify-center text-sm transition-colors duration-fast-02",
                        "hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                        isSelected(day) && "bg-carbon-blue-60 text-white hover:bg-carbon-blue-70",
                        isToday(day) && !isSelected(day) && "border border-carbon-blue-60"
                      )}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-carbon-gray-20 dark:border-carbon-gray-70">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onChange?.(undefined)
                  setOpen(false)
                }}
              >
                Clear
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const today = new Date()
                  setViewDate(today)
                  onChange?.(today)
                  setOpen(false)
                }}
              >
                Today
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }

