import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CodeSnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
  copyable?: boolean
  variant?: "single" | "multi" | "inline"
}

const CodeSnippet = React.forwardRef<HTMLDivElement, CodeSnippetProps>(
  (
    {
      code,
      language,
      showLineNumbers = false,
      copyable = true,
      variant = "single",
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const lines = code.split("\n")

    if (variant === "inline") {
      return (
        <code
          className={cn(
            "inline px-1.5 py-0.5 font-mono text-sm bg-carbon-gray-20 dark:bg-carbon-gray-80",
            className
          )}
        >
          {code}
        </code>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-carbon-gray-100 text-carbon-gray-10 font-mono text-sm",
          className
        )}
        {...props}
      >
        {/* Header with language label and copy button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-carbon-gray-80">
          {language && (
            <span className="text-xs text-carbon-gray-40 uppercase">{language}</span>
          )}
          {!language && <span />}
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs text-carbon-gray-40 hover:text-carbon-gray-10 transition-colors focus:outline-none"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>

        {/* Code content */}
        <div
          className={cn(
            "overflow-x-auto p-4",
            variant === "single" && "whitespace-nowrap"
          )}
        >
          {variant === "multi" && showLineNumbers ? (
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, index) => (
                  <tr key={index}>
                    <td className="pr-4 text-right text-carbon-gray-50 select-none w-8">
                      {index + 1}
                    </td>
                    <td className="whitespace-pre">{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <pre className="whitespace-pre">{code}</pre>
          )}
        </div>
      </div>
    )
  }
)
CodeSnippet.displayName = "CodeSnippet"

export { CodeSnippet }

