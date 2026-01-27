import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Separator } from "./separator"

// Sidebar context for managing state
interface SidebarContextType {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  collapsible: boolean
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Sidebar Provider
interface SidebarProviderProps {
  children: React.ReactNode
  defaultExpanded?: boolean
  collapsible?: boolean
}

function SidebarProvider({
  children,
  defaultExpanded = true,
  collapsible = true,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, collapsible }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Main Sidebar component
const sidebarVariants = cva(
  "flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "",
        inset: "rounded-lg m-2 border",
        floating: "rounded-lg m-2 shadow-lg border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant, ...props }, ref) => {
    const { expanded, collapsible } = useSidebar()

    return (
      <aside
        ref={ref}
        data-expanded={expanded}
        className={cn(
          sidebarVariants({ variant }),
          expanded ? "w-64" : collapsible ? "w-16" : "w-64",
          className
        )}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

// Sidebar Header
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center px-4 border-b border-border", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

// Sidebar Content
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-2", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

// Sidebar Footer
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto border-t border-border p-4", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

// Sidebar Group
const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

// Sidebar Group Label
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = useSidebar()

  if (!expanded) return null

  return (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// Sidebar Group Content
const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

// Sidebar Menu
const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

// Sidebar Menu Item
const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

// Sidebar Menu Button
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, tooltip, children, ...props }, ref) => {
    const { expanded } = useSidebar()

    return (
      <button
        ref={ref}
        title={!expanded ? tooltip : undefined}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive && "bg-accent text-accent-foreground",
          !expanded && "justify-center px-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

// Sidebar Trigger (toggle button)
const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { expanded, setExpanded, collapsible } = useSidebar()

  if (!collapsible) return null

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-sm"
      onClick={() => setExpanded(!expanded)}
      className={cn("h-8 w-8", className)}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

// Sidebar Separator
const SidebarSeparator = React.forwardRef<
  React.ComponentRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn("my-2", className)}
    {...props}
  />
))
SidebarSeparator.displayName = "SidebarSeparator"

// Sidebar Inset (main content wrapper)
const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto", className)}
    {...props}
  />
))
SidebarInset.displayName = "SidebarInset"

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
  SidebarInset,
  useSidebar,
}

