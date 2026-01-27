import * as React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

// Chart Container - Responsive wrapper
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, height = 300, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full", className)}
      style={{ height }}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
)
ChartContainer.displayName = "ChartContainer"

// Carbon color palette for charts
const chartColors = {
  blue: "#0f62fe",
  cyan: "#1192e8",
  teal: "#009d9a",
  green: "#198038",
  purple: "#8a3ffc",
  magenta: "#d12771",
  red: "#da1e28",
  orange: "#eb6200",
}

// Custom Tooltip
interface ChartTooltipProps {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload) return null

  return (
    <div className="bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-lg">
      {label && <p className="font-medium mb-1">{label}</p>}
      {payload.map((entry, index) => (
        <p key={index} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-carbon-gray-30">{entry.name}:</span>
          <span className="font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

// Export all recharts components with Carbon styling defaults
export {
  ChartContainer,
  ChartTooltip,
  chartColors,
  // Re-export recharts components
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
}

