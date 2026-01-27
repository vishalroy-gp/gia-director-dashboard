import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export interface MenuButtonItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
  divider?: boolean
  icon?: React.ReactNode
}

export interface MenuButtonProps extends Omit<ButtonProps, "onClick"> {
  label: string
  items: MenuButtonItem[]
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      className,
      label,
      items,
      align = "start",
      side = "bottom",
      variant = "primary",
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant={variant}
            size={size}
            disabled={disabled}
            className={cn("gap-2", className)}
            {...props}
          >
            {label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} side={side}>
          {items.map((item, index) => {
            if (item.divider) {
              return <DropdownMenuSeparator key={index} />
            }

            return (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                disabled={item.disabled}
                className={cn(item.danger && "text-carbon-red-60 focus:text-carbon-red-60")}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
MenuButton.displayName = "MenuButton"

// Split Menu Button - Primary action + dropdown
export interface SplitMenuButtonProps extends Omit<ButtonProps, "onClick"> {
  label: string
  onClick?: () => void
  items: MenuButtonItem[]
  align?: "start" | "center" | "end"
}

const SplitMenuButton = React.forwardRef<HTMLButtonElement, SplitMenuButtonProps>(
  (
    {
      className,
      label,
      onClick,
      items,
      align = "start",
      variant = "primary",
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="inline-flex">
        <Button
          ref={ref}
          variant={variant}
          size={size}
          disabled={disabled}
          onClick={onClick}
          className={cn("rounded-r-none border-r-0", className)}
          {...props}
        >
          {label}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
              disabled={disabled}
              className="rounded-l-none px-2"
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={align}>
            {items.map((item, index) => {
              if (item.divider) {
                return <DropdownMenuSeparator key={index} />
              }

              return (
                <DropdownMenuItem
                  key={index}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={cn(item.danger && "text-carbon-red-60 focus:text-carbon-red-60")}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
)
SplitMenuButton.displayName = "SplitMenuButton"

export { MenuButton, SplitMenuButton }

