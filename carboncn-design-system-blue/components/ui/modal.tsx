import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose = DialogPrimitive.Close
const ModalPortal = DialogPrimitive.Portal

const modalContentVariants = cva(
  "fixed z-50 bg-background shadow-lg flex flex-col overflow-hidden focus:outline-none",
  {
    variants: {
      size: {
        xs: "w-[320px]",
        sm: "w-[400px]",
        md: "w-[500px]",
        lg: "w-[768px]",
        // Full width with margins
        full: "w-[calc(100vw-64px)] max-w-[1056px]",
      },
      danger: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      danger: false,
    },
  }
)

const ModalOverlay = React.forwardRef<
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
ModalOverlay.displayName = "ModalOverlay"

interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean
}

const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, size, danger, showCloseButton = true, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        modalContentVariants({ size, danger }),
        "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
        "max-h-[84vh]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "duration-moderate-02 motion-productive",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-carbon-gray-50 hover:text-foreground hover:bg-carbon-gray-20 dark:hover:bg-carbon-gray-70 transition-colors duration-fast-02 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-carbon-blue-60">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = "ModalContent"

// Carbon Modal Header - 48px tall, with label and title
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label?: string
  }
>(({ className, label, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-carbon-05 pt-carbon-05 pb-carbon-04 pr-12", className)}
    {...props}
  >
    {label && (
      <p className="text-xs text-muted-foreground mb-carbon-01">{label}</p>
    )}
    {children}
  </div>
))
ModalHeader.displayName = "ModalHeader"

const ModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-normal leading-tight", className)}
    {...props}
  />
))
ModalTitle.displayName = "ModalTitle"

const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-carbon-02", className)}
    {...props}
  />
))
ModalDescription.displayName = "ModalDescription"

// Carbon Modal Body - scrollable content area
const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto px-carbon-05 py-carbon-04", className)}
    {...props}
  />
))
ModalBody.displayName = "ModalBody"

// Carbon Modal Footer - fixed at bottom, full-width buttons
interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  danger?: boolean
}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, danger, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-stretch border-t-0",
        "[&>button]:flex-1 [&>button]:h-16 [&>button]:rounded-none",
        danger && "[&>button:last-child]:bg-carbon-red-60 [&>button:last-child]:hover:bg-carbon-red-70 [&>button:last-child]:text-white",
        className
      )}
      {...props}
    />
  )
)
ModalFooter.displayName = "ModalFooter"

// Passive Modal (no actions, just info with close)
interface PassiveModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  children?: React.ReactNode
  className?: string
}

const PassiveModal = React.forwardRef<HTMLDivElement, PassiveModalProps>(
  ({ open, onOpenChange, title, children, className }, ref) => (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent ref={ref} size="sm" className={className}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
)
PassiveModal.displayName = "PassiveModal"

// Danger Modal preset
interface DangerModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  children?: React.ReactNode
}

const DangerModal = React.forwardRef<HTMLDivElement, DangerModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      primaryButtonText = "Delete",
      secondaryButtonText = "Cancel",
      onPrimaryClick,
      onSecondaryClick,
      children,
    },
    ref
  ) => (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent ref={ref} size="sm" danger>
        <ModalHeader label="Danger zone">
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        {children && <ModalBody>{children}</ModalBody>}
        <ModalFooter danger>
          <Button
            variant="ghost"
            onClick={() => {
              onSecondaryClick?.()
              onOpenChange?.(false)
            }}
          >
            {secondaryButtonText}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onPrimaryClick?.()
              onOpenChange?.(false)
            }}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
)
DangerModal.displayName = "DangerModal"

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  PassiveModal,
  DangerModal,
  modalContentVariants,
}

