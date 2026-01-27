import * as React from "react"
import { cn } from "@/lib/utils"

// Ordered List
const OrderedList = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement> & {
    nested?: boolean
    native?: boolean
  }
>(({ className, nested, native, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "text-sm leading-relaxed text-foreground",
      native ? "list-decimal" : "list-none",
      nested ? "ml-carbon-05" : "ml-0",
      !native && "[counter-reset:list-counter]",
      className
    )}
    {...props}
  />
))
OrderedList.displayName = "OrderedList"

// Unordered List
const UnorderedList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    nested?: boolean
    native?: boolean
  }
>(({ className, nested, native, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "text-sm leading-relaxed text-foreground",
      native ? "list-disc" : "list-none",
      nested ? "ml-carbon-05" : "ml-0",
      className
    )}
    {...props}
  />
))
UnorderedList.displayName = "UnorderedList"

// List Item
const ListItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & {
    nested?: boolean
  }
>(({ className, nested, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "py-carbon-02",
      nested && "ml-carbon-05",
      // Custom counter styling for ordered lists
      "[ol:not(.native)_&]:before:content-[counter(list-counter)'.'] [ol:not(.native)_&]:before:mr-carbon-02 [ol:not(.native)_&]:[counter-increment:list-counter]",
      // Custom bullet for unordered lists
      "[ul:not(.native)_&]:before:content-['–'] [ul:not(.native)_&]:before:mr-carbon-02 [ul:not(.native)_&]:before:text-carbon-gray-50",
      className
    )}
    {...props}
  >
    {children}
  </li>
))
ListItem.displayName = "ListItem"

export { OrderedList, UnorderedList, ListItem }

