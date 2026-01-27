import * as React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Carbon UI Shell Header - 48px height, dark background
const UIShellHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "fixed top-0 left-0 right-0 z-50 h-12 bg-carbon-gray-100 text-white flex items-center",
      className
    )}
    {...props}
  />
))
UIShellHeader.displayName = "UIShellHeader"

// Skip to content link for accessibility
const SkipToContent = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, children = "Skip to main content", ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "absolute left-0 z-[60] -translate-y-full bg-carbon-blue-60 px-4 py-2 text-white transition-transform focus:translate-y-0",
      className
    )}
    {...props}
  >
    {children}
  </a>
))
SkipToContent.displayName = "SkipToContent"

// Header menu button (hamburger)
interface HeaderMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

const HeaderMenuButton = React.forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={isActive ? "Close menu" : "Open menu"}
      aria-expanded={isActive}
      className={cn(
        "h-12 w-12 flex items-center justify-center transition-colors duration-fast-02",
        "hover:bg-carbon-gray-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
        isActive && "bg-carbon-gray-80",
        className
      )}
      {...props}
    >
      {isActive ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  )
)
HeaderMenuButton.displayName = "HeaderMenuButton"

// Header name/logo section
interface HeaderNameProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  prefix?: string
}

const HeaderName = React.forwardRef<HTMLAnchorElement, HeaderNameProps>(
  ({ className, prefix, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "flex items-center h-12 px-4 text-sm font-semibold transition-colors duration-fast-02",
        "hover:bg-carbon-gray-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
        className
      )}
      {...props}
    >
      {prefix && <span className="font-normal opacity-60 mr-1">{prefix}</span>}
      {children}
    </a>
  )
)
HeaderName.displayName = "HeaderName"

// Header navigation container
const HeaderNavigation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("hidden md:flex items-center h-full", className)}
    {...props}
  />
))
HeaderNavigation.displayName = "HeaderNavigation"

// Header nav menu (ul)
const HeaderMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center h-full", className)}
    {...props}
  />
))
HeaderMenu.displayName = "HeaderMenu"

// Header menu item
interface HeaderMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isActive?: boolean
}

const HeaderMenuItem = React.forwardRef<HTMLLIElement, HeaderMenuItemProps>(
  ({ className, isActive, children, ...props }, ref) => (
    <li ref={ref} className={cn("h-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(
              "flex items-center h-full px-4 text-sm transition-colors duration-fast-02",
              "hover:bg-carbon-gray-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
              isActive && "border-b-3 border-white bg-carbon-gray-90",
              (child as React.ReactElement<{ className?: string }>).props.className
            ),
          })
        }
        return child
      })}
    </li>
  )
)
HeaderMenuItem.displayName = "HeaderMenuItem"

// Header global bar (right side actions)
const HeaderGlobalBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center h-full ml-auto", className)}
    {...props}
  />
))
HeaderGlobalBar.displayName = "HeaderGlobalBar"

// Header global action button
const HeaderGlobalAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "h-12 w-12 flex items-center justify-center transition-colors duration-fast-02",
      "hover:bg-carbon-gray-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white",
      isActive && "bg-carbon-gray-80",
      className
    )}
    {...props}
  />
))
HeaderGlobalAction.displayName = "HeaderGlobalAction"

// Header panel (dropdown panels for global actions)
interface HeaderPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean
}

const HeaderPanel = React.forwardRef<HTMLDivElement, HeaderPanelProps>(
  ({ className, expanded, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-12 right-0 w-64 bg-carbon-gray-90 text-white shadow-lg transition-transform duration-moderate-02 motion-productive",
        expanded ? "translate-x-0" : "translate-x-full",
        className
      )}
      {...props}
    />
  )
)
HeaderPanel.displayName = "HeaderPanel"

export {
  UIShellHeader,
  SkipToContent,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
}

