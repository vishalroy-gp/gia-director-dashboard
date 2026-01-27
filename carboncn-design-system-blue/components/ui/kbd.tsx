import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono text-xs",
  {
    variants: {
      variant: {
        default: [
          "px-1.5 py-0.5 min-w-[1.5rem]",
          "bg-carbon-gray-20 dark:bg-carbon-gray-70",
          "border border-carbon-gray-30 dark:border-carbon-gray-60",
          "rounded-sm shadow-sm",
        ],
        outline: [
          "px-1.5 py-0.5 min-w-[1.5rem]",
          "border border-carbon-gray-50",
          "rounded-sm",
        ],
        ghost: [
          "px-1 py-0.5",
          "text-muted-foreground",
        ],
      },
      size: {
        sm: "text-[10px] px-1 py-0",
        md: "text-xs px-1.5 py-0.5",
        lg: "text-sm px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(kbdVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

// Keyboard shortcut display helper
interface KeyboardShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[]
  separator?: string
}

const KeyboardShortcut = React.forwardRef<HTMLSpanElement, KeyboardShortcutProps>(
  ({ className, keys, separator = "+", ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <Kbd>{key}</Kbd>
          {index < keys.length - 1 && (
            <span className="text-muted-foreground text-xs">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  )
)
KeyboardShortcut.displayName = "KeyboardShortcut"

export { Kbd, KeyboardShortcut, kbdVariants }

