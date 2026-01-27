import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

// Context for tab variant
const TabsVariantContext = React.createContext<"line" | "contained">("line")

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: "line" | "contained"
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "line", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-12 items-center gap-0",
        variant === "line" && "border-b border-carbon-gray-20 dark:border-carbon-gray-70",
        variant === "contained" && "bg-carbon-gray-10 dark:bg-carbon-gray-80",
        className
      )}
      {...props}
    />
  </TabsVariantContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext)
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-normal transition-all duration-fast-02 motion-productive",
        "text-carbon-gray-70 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Line variant (underline indicator)
        variant === "line" && [
          "border-b-2 border-transparent",
          "data-[state=active]:border-carbon-blue-60 data-[state=active]:text-foreground data-[state=active]:font-medium",
        ],
        // Contained variant (filled background)
        variant === "contained" && [
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:shadow-sm",
          "dark:data-[state=active]:bg-carbon-gray-90",
        ],
        "dark:text-carbon-gray-30 dark:data-[state=active]:text-carbon-gray-10",
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-carbon-05 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

