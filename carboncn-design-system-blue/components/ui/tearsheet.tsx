import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, ChevronLeft } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const Tearsheet = DialogPrimitive.Root
const TearsheetTrigger = DialogPrimitive.Trigger
const TearsheetClose = DialogPrimitive.Close
const TearsheetPortal = DialogPrimitive.Portal

const TearsheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-carbon-gray-100/60 dark:bg-carbon-gray-100/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
TearsheetOverlay.displayName = "TearsheetOverlay"

const tearsheetVariants = cva(
  "fixed z-50 bg-background flex flex-col focus:outline-none",
  {
    variants: {
      size: {
        narrow: "w-[480px]",
        wide: "w-[640px]",
        full: "w-full max-w-[calc(100vw-64px)]",
      },
    },
    defaultVariants: {
      size: "wide",
    },
  }
)

interface TearsheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof tearsheetVariants> {
  hasBackButton?: boolean
  onBack?: () => void
}

const TearsheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  TearsheetContentProps
>(({ className, size, hasBackButton, onBack, children, ...props }, ref) => (
  <TearsheetPortal>
    <TearsheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        tearsheetVariants({ size }),
        "inset-y-0 right-0 h-full shadow-xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        "duration-300 ease-out",
        className
      )}
      {...props}
    >
      {hasBackButton && (
        <button
          onClick={onBack}
          className="absolute left-4 top-4 p-2 rounded-sm hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <DialogPrimitive.Close className="absolute right-4 top-4 p-2 rounded-sm hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </TearsheetPortal>
))
TearsheetContent.displayName = "TearsheetContent"

const TearsheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label?: string
    description?: string
  }
>(({ className, label, description, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-carbon-07 pt-carbon-07 pb-carbon-05 border-b border-border",
      className
    )}
    {...props}
  >
    {label && (
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
    )}
    {children}
    {description && (
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    )}
  </div>
))
TearsheetHeader.displayName = "TearsheetHeader"

const TearsheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-2xl font-normal", className)}
    {...props}
  />
))
TearsheetTitle.displayName = "TearsheetTitle"

const TearsheetBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto px-carbon-07 py-carbon-05", className)}
    {...props}
  />
))
TearsheetBody.displayName = "TearsheetBody"

const TearsheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-carbon-03 px-carbon-07 py-carbon-05 border-t border-border bg-carbon-gray-10 dark:bg-carbon-gray-90",
      className
    )}
    {...props}
  />
))
TearsheetFooter.displayName = "TearsheetFooter"

// Influencer area (left side content for context)
const TearsheetInfluencer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-64 shrink-0 border-r border-border bg-carbon-gray-10 dark:bg-carbon-gray-90 p-carbon-05",
      className
    )}
    {...props}
  />
))
TearsheetInfluencer.displayName = "TearsheetInfluencer"

export {
  Tearsheet,
  TearsheetPortal,
  TearsheetOverlay,
  TearsheetTrigger,
  TearsheetClose,
  TearsheetContent,
  TearsheetHeader,
  TearsheetTitle,
  TearsheetBody,
  TearsheetFooter,
  TearsheetInfluencer,
  tearsheetVariants,
}

