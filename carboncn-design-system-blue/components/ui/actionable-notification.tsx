import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const actionableNotificationVariants = cva(
  "flex items-start gap-carbon-04 p-carbon-05 pr-carbon-09 relative transition-all duration-fast-02",
  {
    variants: {
      kind: {
        success: [
          "bg-[hsl(var(--success-bg))] border-l-3 border-[hsl(var(--success))]",
          "[&_svg]:text-[hsl(var(--success))]",
        ],
        info: [
          "bg-[hsl(var(--info-bg))] border-l-3 border-[hsl(var(--info))]",
          "[&_svg]:text-[hsl(var(--info))]",
        ],
        warning: [
          "bg-[hsl(var(--warning-bg))] border-l-3 border-[hsl(var(--warning))]",
          "[&_svg]:text-[hsl(var(--warning))]",
        ],
        error: [
          "bg-[hsl(var(--error-bg))] border-l-3 border-[hsl(var(--error))]",
          "[&_svg]:text-[hsl(var(--error))]",
        ],
      },
      inline: {
        true: "",
        false: "shadow-sm",
      },
      lowContrast: {
        true: "bg-carbon-gray-10 dark:bg-carbon-gray-90",
        false: "",
      },
    },
    defaultVariants: {
      kind: "info",
      inline: false,
      lowContrast: false,
    },
  }
)

const iconMap = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
}

export interface ActionableNotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionableNotificationVariants> {
  title?: string
  subtitle?: string
  actionButtonLabel?: string
  onActionClick?: () => void
  onClose?: () => void
  hideCloseButton?: boolean
  hasFocus?: boolean
}

const ActionableNotification = React.forwardRef<
  HTMLDivElement,
  ActionableNotificationProps
>(
  (
    {
      className,
      kind = "info",
      inline,
      lowContrast,
      title,
      subtitle,
      actionButtonLabel,
      onActionClick,
      onClose,
      hideCloseButton = false,
      hasFocus,
      children,
      ...props
    },
    ref
  ) => {
    const Icon = iconMap[kind || "info"]

    return (
      <div
        ref={ref}
        role="alert"
        tabIndex={hasFocus ? 0 : undefined}
        className={cn(
          actionableNotificationVariants({ kind, inline, lowContrast, className })
        )}
        {...props}
      >
        <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-carbon-02">
            {title && (
              <span className="font-semibold text-sm">{title}</span>
            )}
            {subtitle && (
              <span className="text-sm text-muted-foreground">{subtitle}</span>
            )}
          </div>

          {children && <div className="mt-carbon-02 text-sm">{children}</div>}

          {actionButtonLabel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onActionClick}
              className="mt-carbon-03 -ml-3 text-carbon-blue-60 hover:text-carbon-blue-70 dark:text-carbon-blue-40 dark:hover:text-carbon-blue-30"
            >
              {actionButtonLabel}
            </Button>
          )}
        </div>

        {!hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-carbon-04 right-carbon-04 p-1 rounded-sm hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60"
            aria-label="Close notification"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    )
  }
)
ActionableNotification.displayName = "ActionableNotification"

export { ActionableNotification, actionableNotificationVariants }

