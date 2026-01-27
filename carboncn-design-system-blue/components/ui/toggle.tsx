import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors duration-fast-02 motion-productive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "bg-carbon-gray-10 dark:bg-carbon-gray-80",
          "hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70",
          "data-[state=on]:bg-carbon-gray-80 data-[state=on]:text-white dark:data-[state=on]:bg-carbon-gray-10 dark:data-[state=on]:text-carbon-gray-100",
        ],
        outline: [
          "border border-carbon-gray-50",
          "hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80",
          "data-[state=on]:border-carbon-blue-60 data-[state=on]:bg-carbon-blue-10 dark:data-[state=on]:bg-carbon-blue-90",
        ],
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

