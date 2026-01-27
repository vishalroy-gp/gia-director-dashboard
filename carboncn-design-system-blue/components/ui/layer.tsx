import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Layer context for nested elevation
interface LayerContextType {
  level: number
}

const LayerContext = React.createContext<LayerContextType>({ level: 0 })

function useLayer() {
  return React.useContext(LayerContext)
}

const layerVariants = cva("", {
  variants: {
    level: {
      0: "bg-background", // Base layer
      1: "bg-carbon-gray-10 dark:bg-carbon-gray-90", // First elevation
      2: "bg-carbon-gray-20 dark:bg-carbon-gray-80", // Second elevation
      3: "bg-carbon-gray-30 dark:bg-carbon-gray-70", // Third elevation
    },
  },
  defaultVariants: {
    level: 0,
  },
})

export interface LayerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layerVariants> {
  /**
   * Override the automatic level calculation
   */
  level?: 0 | 1 | 2 | 3
}

const Layer = React.forwardRef<HTMLDivElement, LayerProps>(
  ({ className, level: levelProp, children, ...props }, ref) => {
    const parentLayer = useLayer()

    // Auto-increment level based on parent, or use provided level
    const currentLevel = levelProp !== undefined
      ? levelProp
      : Math.min(parentLayer.level + 1, 3) as 0 | 1 | 2 | 3

    return (
      <LayerContext.Provider value={{ level: currentLevel }}>
        <div
          ref={ref}
          className={cn(layerVariants({ level: currentLevel }), className)}
          data-layer-level={currentLevel}
          {...props}
        >
          {children}
        </div>
      </LayerContext.Provider>
    )
  }
)
Layer.displayName = "Layer"

// Utility component for inline layer context
const LayerProvider = ({ level, children }: { level: number; children: React.ReactNode }) => (
  <LayerContext.Provider value={{ level }}>
    {children}
  </LayerContext.Provider>
)

export { Layer, LayerProvider, useLayer, layerVariants }

