import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  // 20px touch target wrapper (Carbon spec: 16x16 visual with 20px touch target)
  <span className="inline-flex items-center justify-center h-5 w-5">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 border border-carbon-gray-50 bg-transparent transition-colors duration-fast-02 motion-productive",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-carbon-blue-60 data-[state=checked]:border-carbon-blue-60 data-[state=checked]:text-white",
        "data-[state=indeterminate]:bg-carbon-blue-60 data-[state=indeterminate]:border-carbon-blue-60 data-[state=indeterminate]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {props.checked === "indeterminate" ? (
          <Minus className="h-3 w-3" />
        ) : (
          <Check className="h-3 w-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </span>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

