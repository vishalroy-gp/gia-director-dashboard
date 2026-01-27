import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

export interface CopyButtonProps {
  value: string
  onCopied?: (value: string) => void
  feedbackDuration?: number
  className?: string
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, value, onCopied, feedbackDuration = 2000 }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onCopied?.(value)

        setTimeout(() => {
          setCopied(false)
        }, feedbackDuration)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            className={cn("h-8 w-8", className)}
          >
            {copied ? (
              <Check className="h-4 w-4 text-carbon-green-50" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {copied ? "Copied!" : "Copy to clipboard"}
        </TooltipContent>
      </Tooltip>
    )
  }
)
CopyButton.displayName = "CopyButton"

// Inline copy button for text
export interface CopyTextProps {
  value: string
  onCopied?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

const CopyText = React.forwardRef<HTMLSpanElement, CopyTextProps>(
  ({ className, value, onCopied, children }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onCopied?.(value)

        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    return (
      <span
        ref={ref}
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-1 cursor-pointer hover:text-primary transition-colors",
          className
        )}
      >
        {children || value}
        {copied ? (
          <Check className="h-3 w-3 text-carbon-green-50" />
        ) : (
          <Copy className="h-3 w-3 opacity-50" />
        )}
      </span>
    )
  }
)
CopyText.displayName = "CopyText"

export { CopyButton, CopyText }
