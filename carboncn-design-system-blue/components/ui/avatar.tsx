import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden bg-carbon-gray-20 dark:bg-carbon-gray-70 text-carbon-gray-70 dark:text-carbon-gray-30 font-medium shrink-0",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  initials?: string
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, src, alt, initials, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    // Reset error state when src changes
    React.useEffect(() => {
      setImageError(false)
    }, [src])

    const showImage = src && !imageError
    const showInitials = !showImage && initials
    const showFallback = !showImage && !showInitials

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, className }))}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || "Avatar"}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        )}
        {showInitials && (
          <span aria-label={alt || initials}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        )}
        {showFallback && (
          fallback || <User className="h-1/2 w-1/2" aria-hidden="true" />
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

// Avatar Group for stacking multiple avatars
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  size?: VariantProps<typeof avatarVariants>["size"]
  children: React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = "md", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleChildren = max ? childArray.slice(0, max) : childArray
    const remainingCount = max ? Math.max(0, childArray.length - max) : 0

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className="ring-2 ring-background rounded-full"
            style={{ zIndex: visibleChildren.length - index }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size, shape: "circle" }),
              "ring-2 ring-background bg-carbon-gray-30 dark:bg-carbon-gray-60 text-carbon-gray-80 dark:text-carbon-gray-20"
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

// Avatar with status indicator
export interface AvatarWithStatusProps extends AvatarProps {
  status?: "online" | "offline" | "busy" | "away"
}

const statusColors = {
  online: "bg-carbon-green-50",
  offline: "bg-carbon-gray-50",
  busy: "bg-carbon-red-50",
  away: "bg-carbon-yellow-30",
}

const AvatarWithStatus = React.forwardRef<HTMLDivElement, AvatarWithStatusProps>(
  ({ status, size = "md", className, ...props }, ref) => {
    const statusSize = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
      "2xl": "h-4 w-4",
    }

    return (
      <div ref={ref} className={cn("relative inline-block", className)}>
        <Avatar size={size} {...props} />
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
              statusColors[status],
              statusSize[size || "md"]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)
AvatarWithStatus.displayName = "AvatarWithStatus"

export { Avatar, AvatarGroup, AvatarWithStatus, avatarVariants }

