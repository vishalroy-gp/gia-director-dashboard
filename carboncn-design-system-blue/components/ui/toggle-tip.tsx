import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToggleTip = PopoverPrimitive.Root

const ToggleTipTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center h-5 w-5 text-carbon-gray-50 hover:text-foreground transition-colors duration-fast-02",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    {children || <Info className="h-4 w-4" />}
  </PopoverPrimitive.Trigger>
))
ToggleTipTrigger.displayName = "ToggleTipTrigger"

const ToggleTipContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showClose?: boolean
  }
>(({ className, children, sideOffset = 4, showClose = true, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-[280px] bg-carbon-gray-100 p-carbon-04 text-sm text-white shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">{children}</div>
        {showClose && (
          <PopoverPrimitive.Close className="shrink-0 text-carbon-gray-40 hover:text-white focus:outline-none">
            <X className="h-4 w-4" />
          </PopoverPrimitive.Close>
        )}
      </div>
      <PopoverPrimitive.Arrow className="fill-carbon-gray-100" />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
ToggleTipContent.displayName = "ToggleTipContent"

export { ToggleTip, ToggleTipTrigger, ToggleTipContent }

