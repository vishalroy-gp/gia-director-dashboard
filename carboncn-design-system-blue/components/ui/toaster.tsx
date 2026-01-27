import * as React from "react"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Toast {
  id: string
  variant?: "info" | "success" | "warning" | "error"
  title?: string
  description?: string
  duration?: number
}

interface ToasterContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToasterContext = React.createContext<ToasterContextType | undefined>(undefined)

export const useToast = () => {
  const context = React.useContext(ToasterContext)
  if (!context) {
    throw new Error("useToast must be used within a Toaster")
  }
  return context
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const variantStyles = {
  info: "bg-carbon-blue-10 text-carbon-blue-70 border-l-4 border-l-carbon-blue-60 dark:bg-carbon-blue-90 dark:text-carbon-blue-30",
  success: "bg-carbon-green-10 text-carbon-green-70 border-l-4 border-l-carbon-green-60 dark:bg-carbon-green-90 dark:text-carbon-green-30",
  warning: "bg-carbon-yellow-10 text-carbon-gray-100 border-l-4 border-l-carbon-yellow-30 dark:bg-carbon-yellow-90",
  error: "bg-carbon-red-10 text-carbon-red-70 border-l-4 border-l-carbon-red-60 dark:bg-carbon-red-90 dark:text-carbon-red-30",
}

export const Toaster: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { id, duration: 5000, variant: "info", ...toast }
    
    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after duration (Carbon spec: 5-8 seconds)
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, newToast.duration)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container - top-right positioning per Carbon spec */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-[400px] pointer-events-none">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.variant || "info"]
          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex items-start gap-3 p-carbon-05 shadow-lg animate-in slide-in-from-right-full duration-moderate-02",
                variantStyles[toast.variant || "info"]
              )}
            >
              <Icon className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="font-semibold text-sm">{toast.title}</p>
                )}
                {toast.description && (
                  <p className="text-sm opacity-90 mt-1">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToasterContext.Provider>
  )
}

// Convenience function to create a toast (must be used within Toaster context)
export const toast = {
  info: (title: string, description?: string) => ({ variant: "info" as const, title, description }),
  success: (title: string, description?: string) => ({ variant: "success" as const, title, description }),
  warning: (title: string, description?: string) => ({ variant: "warning" as const, title, description }),
  error: (title: string, description?: string) => ({ variant: "error" as const, title, description }),
}

