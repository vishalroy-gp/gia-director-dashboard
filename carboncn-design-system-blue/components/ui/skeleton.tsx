import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-carbon-gray-10 via-carbon-gray-20 to-carbon-gray-10 dark:from-carbon-gray-80 dark:via-carbon-gray-70 dark:to-carbon-gray-80 bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }

