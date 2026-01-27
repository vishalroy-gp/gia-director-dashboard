// CarbonCN Sparkline Component
// Compact inline charts for tables, cards, and dashboards

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts"
import { chartColors } from "./index"
import { cn } from "@/lib/utils"

export interface SparklineProps {
  data: number[]
  height?: number
  width?: number | string
  color?: string
  variant?: "line" | "area" | "bar"
  strokeWidth?: number
  showTrend?: boolean
  className?: string
}

export function Sparkline({
  data,
  height = 32,
  width = 100,
  color = chartColors.blue,
  variant = "line",
  strokeWidth = 2,
  showTrend = false,
  className,
}: SparklineProps) {
  if (!data?.length) return null

  // Convert simple array to recharts data format
  const chartData = data.map((value, index) => ({ value, index }))
  
  // Calculate trend
  const firstValue = data[0]
  const lastValue = data[data.length - 1]
  const trend = lastValue - firstValue
  const trendPercent = firstValue !== 0 ? ((trend / firstValue) * 100).toFixed(1) : "0"
  const trendColor = trend > 0 ? chartColors.green : trend < 0 ? chartColors.red : chartColors.gray50

  const renderChart = () => {
    switch (variant) {
      case "area":
        return (
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={strokeWidth}
              isAnimationActive={false}
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart data={chartData}>
            <Bar
              dataKey="value"
              fill={color}
              isAnimationActive={false}
            />
          </BarChart>
        )
      default:
        return (
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={strokeWidth}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        )
    }
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div style={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      {showTrend && (
        <span 
          className="text-xs font-medium"
          style={{ color: trendColor }}
        >
          {trend >= 0 ? "+" : ""}{trendPercent}%
        </span>
      )}
    </div>
  )
}

// Convenience components
export function LineSparkline(props: Omit<SparklineProps, "variant">) {
  return <Sparkline {...props} variant="line" />
}

export function AreaSparkline(props: Omit<SparklineProps, "variant">) {
  return <Sparkline {...props} variant="area" />
}

export function BarSparkline(props: Omit<SparklineProps, "variant">) {
  return <Sparkline {...props} variant="bar" />
}

