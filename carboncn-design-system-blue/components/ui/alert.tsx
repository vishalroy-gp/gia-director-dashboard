import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full border-l-3 p-carbon-05 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-foreground",
        info: "bg-[hsl(var(--info-bg))] text-foreground border-[hsl(var(--info))] [&>svg]:text-[hsl(var(--info))]",
        success: "bg-[hsl(var(--success-bg))] text-foreground border-[hsl(var(--success))] [&>svg]:text-[hsl(var(--success))]",
        warning: "bg-[hsl(var(--warning-bg))] text-foreground dark:text-carbon-gray-10 border-[hsl(var(--warning))] [&>svg]:text-[hsl(var(--warning))]",
        error: "bg-[hsl(var(--error-bg))] text-foreground border-[hsl(var(--error))] [&>svg]:text-[hsl(var(--error))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> {
  onClose?: () => void
  hideIcon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", onClose, hideIcon, children, ...props }, ref) => {
    const Icon = iconMap[variant || "default"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {!hideIcon && <Icon className="h-5 w-5" />}
        {children}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-sm hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }

