import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  }
  
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-carbon-gray-30 border-t-carbon-blue-60",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}

export { Spinner }

