import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const notificationVariants = cva(
  "relative flex w-full items-start gap-3 p-carbon-05 text-sm",
  {
    variants: {
      variant: {
        info: "bg-carbon-blue-10 text-carbon-blue-70 dark:bg-carbon-blue-90 dark:text-carbon-blue-30",
        success: "bg-carbon-green-10 text-carbon-green-70 dark:bg-carbon-green-90 dark:text-carbon-green-30",
        warning: "bg-carbon-yellow-10 text-carbon-gray-100 dark:bg-carbon-yellow-90 dark:text-carbon-gray-10",
        error: "bg-carbon-red-10 text-carbon-red-70 dark:bg-carbon-red-90 dark:text-carbon-red-30",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof notificationVariants> {
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant = "info", title, dismissible, onDismiss, children, ...props }, ref) => {
    const Icon = iconMap[variant || "info"]

    return (
      <div
        ref={ref}
        className={cn(notificationVariants({ variant, className }))}
        {...props}
      >
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 hover:opacity-70 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    )
  }
)
Notification.displayName = "Notification"

export { Notification, notificationVariants }

