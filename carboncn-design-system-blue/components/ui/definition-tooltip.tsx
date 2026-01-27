import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const DefinitionTooltipProvider = TooltipPrimitive.Provider

const DefinitionTooltip = TooltipPrimitive.Root

const DefinitionTooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    className={cn(
      "border-b border-dotted border-carbon-gray-50 cursor-help",
      className
    )}
    {...props}
  >
    {children}
  </TooltipPrimitive.Trigger>
))
DefinitionTooltipTrigger.displayName = "DefinitionTooltipTrigger"

const DefinitionTooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    definition: string
    term?: string
  }
>(({ className, definition, term, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 max-w-xs overflow-hidden bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-md",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {term && (
      <p className="font-semibold mb-1">{term}</p>
    )}
    <p className="text-carbon-gray-30">{definition}</p>
  </TooltipPrimitive.Content>
))
DefinitionTooltipContent.displayName = "DefinitionTooltipContent"

export {
  DefinitionTooltip,
  DefinitionTooltipTrigger,
  DefinitionTooltipContent,
  DefinitionTooltipProvider,
}

