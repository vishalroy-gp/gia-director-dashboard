import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { MoreVertical, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const OverflowMenu = DropdownMenuPrimitive.Root

const OverflowMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    size?: "sm" | "md" | "lg"
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizeStyles = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center transition-colors duration-fast-02 motion-productive",
        "hover:bg-carbon-gray-10 active:bg-carbon-gray-20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "dark:hover:bg-carbon-gray-80 dark:active:bg-carbon-gray-70",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <MoreVertical className="h-5 w-5" />
    </DropdownMenuPrimitive.Trigger>
  )
})
OverflowMenuTrigger.displayName = "OverflowMenuTrigger"

const OverflowMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[160px] overflow-hidden bg-white text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "dark:bg-carbon-gray-80",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
OverflowMenuContent.displayName = "OverflowMenuContent"

const OverflowMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    danger?: boolean
  }
>(({ className, danger, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center px-4 py-3 text-sm outline-none transition-colors duration-fast-01",
      "focus:bg-carbon-gray-10 dark:focus:bg-carbon-gray-70",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      danger && "text-carbon-red-60 focus:bg-carbon-red-10 dark:focus:bg-carbon-red-90",
      className
    )}
    {...props}
  />
))
OverflowMenuItem.displayName = "OverflowMenuItem"

const OverflowMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("h-px bg-carbon-gray-20 dark:bg-carbon-gray-70", className)}
    {...props}
  />
))
OverflowMenuSeparator.displayName = "OverflowMenuSeparator"

const OverflowMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center py-3 pl-10 pr-4 text-sm outline-none transition-colors duration-fast-01",
      "focus:bg-carbon-gray-10 dark:focus:bg-carbon-gray-70",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-carbon-blue-60" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
OverflowMenuCheckboxItem.displayName = "OverflowMenuCheckboxItem"

export {
  OverflowMenu,
  OverflowMenuTrigger,
  OverflowMenuContent,
  OverflowMenuItem,
  OverflowMenuSeparator,
  OverflowMenuCheckboxItem,
}

