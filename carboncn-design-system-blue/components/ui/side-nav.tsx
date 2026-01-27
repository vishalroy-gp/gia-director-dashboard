import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  expanded?: boolean
  isRail?: boolean // Rail mode = collapsed to icons only
}

const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  ({ className, expanded = true, isRail = false, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Side navigation"
      className={cn(
        "fixed top-12 left-0 bottom-0 bg-carbon-gray-90 text-white transition-all duration-moderate-02 motion-productive z-40",
        expanded ? "w-64" : "w-0",
        isRail && !expanded && "w-12",
        className
      )}
      {...props}
    />
  )
)
SideNav.displayName = "SideNav"

// Side nav items container
const SideNavItems = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("py-4", className)}
    {...props}
  />
))
SideNavItems.displayName = "SideNavItems"

// Side nav link
interface SideNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  icon?: React.ReactNode
}

const SideNavLink = React.forwardRef<HTMLAnchorElement, SideNavLinkProps>(
  ({ className, isActive, icon, children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-fast-02 cursor-pointer",
          "hover:bg-carbon-gray-80 hover:text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
          isActive ? "bg-carbon-gray-80 text-white border-l-3 border-carbon-blue-60" : "text-carbon-gray-30",
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>}
        <span className="truncate">{children}</span>
      </a>
    </li>
  )
)
SideNavLink.displayName = "SideNavLink"

// Side nav menu (expandable section)
interface SideNavMenuProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  isActive?: boolean
}

const SideNavMenu = React.forwardRef<HTMLLIElement, SideNavMenuProps>(
  ({ className, title, icon, defaultOpen = false, isActive, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
      <li ref={ref} className={className} {...props}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-fast-02",
            "hover:bg-carbon-gray-80 hover:text-white",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
            isActive ? "text-white" : "text-carbon-gray-30"
          )}
        >
          {icon && <span className="shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>}
          <span className="truncate flex-1 text-left">{title}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-fast-02",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <ul
          className={cn(
            "overflow-hidden transition-all duration-moderate-01",
            isOpen ? "max-h-96" : "max-h-0"
          )}
        >
          {children}
        </ul>
      </li>
    )
  }
)
SideNavMenu.displayName = "SideNavMenu"

// Side nav menu item (child of SideNavMenu)
interface SideNavMenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
}

const SideNavMenuItem = React.forwardRef<HTMLAnchorElement, SideNavMenuItemProps>(
  ({ className, isActive, children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        className={cn(
          "flex items-center pl-12 pr-4 py-2 text-sm transition-colors duration-fast-02 cursor-pointer",
          "hover:bg-carbon-gray-80 hover:text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
          isActive ? "text-white bg-carbon-gray-80" : "text-carbon-gray-30",
          className
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  )
)
SideNavMenuItem.displayName = "SideNavMenuItem"

// Side nav divider
const SideNavDivider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("my-2 border-carbon-gray-70", className)}
    {...props}
  />
))
SideNavDivider.displayName = "SideNavDivider"

// Side nav footer (bottom section)
const SideNavFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute bottom-0 left-0 right-0 border-t border-carbon-gray-70 bg-carbon-gray-90",
      className
    )}
    {...props}
  />
))
SideNavFooter.displayName = "SideNavFooter"

export {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SideNavDivider,
  SideNavFooter,
}

