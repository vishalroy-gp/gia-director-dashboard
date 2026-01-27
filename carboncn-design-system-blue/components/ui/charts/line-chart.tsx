// CarbonCN Line Chart Component
// Supports: default, multi-line, step variants

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartEmptyState,
  ChartLoadingState,
  getChartColor,
  axisStyle,
  gridStyle,
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface LineChartProps extends BaseChartProps {
  data: Array<Record<string, unknown>>
  xKey: string
  yKeys: string[]
  colors?: string[]
  variant?: "default" | "step" | "smooth"
  strokeWidth?: number
  showDots?: boolean
  dotRadius?: number
  formatter?: (value: number, name: string) => string
}

export function CarbonLineChart({
  data,
  xKey,
  yKeys,
  colors,
  variant = "default",
  height = 300,
  strokeWidth = 2,
  showDots = true,
  dotRadius = 4,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter,
  className,
}: LineChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const curveType = variant === "step" ? "stepAfter" : variant === "smooth" ? "monotone" : "linear"
  
  const legendItems = yKeys.map((key, index) => ({
    name: key,
    color: colors?.[index] || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {showGrid && <CartesianGrid {...gridStyle} />}
          
          <XAxis dataKey={xKey} {...axisStyle} />
          <YAxis {...axisStyle} />
          
          {showTooltip && (
            <Tooltip 
              content={<ChartTooltip formatter={formatter} />}
            />
          )}
          
          {yKeys.map((key, index) => {
            const color = colors?.[index] || getChartColor(index)
            return (
              <Line
                key={key}
                type={curveType}
                dataKey={key}
                stroke={color}
                strokeWidth={strokeWidth}
                dot={showDots ? { r: dotRadius, fill: color } : false}
                activeDot={showDots ? { r: dotRadius + 2, fill: color } : false}
              />
            )
          })}
        </RechartsLineChart>
      </ChartContainer>
      
      {showLegend && yKeys.length > 1 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

// Convenience exports
export function StepLineChart(props: Omit<LineChartProps, "variant">) {
  return <CarbonLineChart {...props} variant="step" />
}

export function SmoothLineChart(props: Omit<LineChartProps, "variant">) {
  return <CarbonLineChart {...props} variant="smooth" />
}

