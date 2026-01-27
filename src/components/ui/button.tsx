import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-normal transition-colors duration-fast-02 motion-productive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Carbon Primary - blue filled
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        // Carbon Secondary - gray filled
        secondary: "bg-carbon-gray-80 text-white hover:bg-carbon-gray-70 active:bg-carbon-gray-60",
        // Carbon Tertiary - blue outline
        tertiary: "border border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20",
        // Carbon Ghost - minimal
        ghost: "text-primary bg-transparent hover:bg-carbon-gray-10 dark:hover:bg-carbon-gray-80 active:bg-carbon-gray-20 dark:active:bg-carbon-gray-70",
        // Carbon Danger - red filled
        danger: "bg-carbon-red-60 text-white hover:bg-carbon-red-70 active:bg-carbon-red-80",
        // Carbon Danger Tertiary - red outline
        "danger-tertiary": "border border-carbon-red-60 text-carbon-red-60 bg-transparent hover:bg-carbon-red-10 active:bg-carbon-red-20",
        // Carbon Danger Ghost
        "danger-ghost": "text-carbon-red-60 bg-transparent hover:bg-carbon-red-10 active:bg-carbon-red-20",
        // Additional variants for compatibility
        outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        // Standard sizes - symmetric padding, centered text
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-4 text-base",
        xl: "h-16 px-4 text-base",
        "2xl": "h-20 px-4 text-base",
        // Field sizes - for buttons alongside input fields (Carbon's field-attached buttons)
        // These have asymmetric padding for trailing icon space
        "field-sm": "h-8 pl-3 pr-12 text-sm",
        "field-md": "h-10 pl-4 pr-14 text-sm",
        "field-lg": "h-12 pl-4 pr-16 text-base",
        // Icon only buttons
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-md": "h-10 w-10",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
