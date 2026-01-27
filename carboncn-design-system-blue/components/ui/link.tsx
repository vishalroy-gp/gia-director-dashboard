import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors duration-fast-02 motion-productive focus:outline-none focus-visible:underline focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Standard link - blue with underline on hover
        default: [
          "text-carbon-blue-60 hover:text-carbon-blue-70 dark:text-carbon-blue-40 dark:hover:text-carbon-blue-30",
          "hover:underline",
        ],
        // Inline link - inherits color, underline by default
        inline: [
          "text-inherit underline underline-offset-2",
          "hover:text-carbon-blue-60 dark:hover:text-carbon-blue-40",
        ],
        // Visited link
        visited: [
          "text-carbon-purple-60 dark:text-carbon-purple-40",
          "hover:underline",
        ],
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean
  renderIcon?: React.ReactNode
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      external,
      renderIcon,
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Auto-add security attributes for external links
    const externalProps = external
      ? {
          target: target || "_blank",
          rel: rel || "noopener noreferrer",
        }
      : { target, rel }

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, size, disabled, className }))}
        aria-disabled={disabled || undefined}
        {...externalProps}
        {...props}
      >
        {children}
        {renderIcon}
        {external && !renderIcon && (
          <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
        )}
      </a>
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }

