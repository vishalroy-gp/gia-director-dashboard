// CarbonCN Area Chart Component
// Supports: default, stacked variants

import {
  AreaChart as RechartsAreaChart,
  Area,
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

export interface AreaChartProps extends BaseChartProps {
  data: Array<Record<string, unknown>>
  xKey: string
  yKeys: string[]
  colors?: string[]
  variant?: "default" | "stacked"
  fillOpacity?: number
  strokeWidth?: number
  curveType?: "linear" | "smooth"
  formatter?: (value: number, name: string) => string
}

export function CarbonAreaChart({
  data,
  xKey,
  yKeys,
  colors,
  variant = "default",
  height = 300,
  fillOpacity = 0.3,
  strokeWidth = 2,
  curveType = "linear",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter,
  className,
}: AreaChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const isStacked = variant === "stacked"
  const curve = curveType === "smooth" ? "monotone" : "linear"
  
  const legendItems = yKeys.map((key, index) => ({
    name: key,
    color: colors?.[index] || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {showGrid && <CartesianGrid {...gridStyle} />}
          
          <XAxis dataKey={xKey} {...axisStyle} />
          <YAxis {...axisStyle} />
          
          {showTooltip && (
            <Tooltip content={<ChartTooltip formatter={formatter} />} />
          )}
          
          {yKeys.map((key, index) => {
            const color = colors?.[index] || getChartColor(index)
            return (
              <Area
                key={key}
                type={curve}
                dataKey={key}
                fill={color}
                fillOpacity={fillOpacity}
                stroke={color}
                strokeWidth={strokeWidth}
                stackId={isStacked ? "stack" : undefined}
              />
            )
          })}
        </RechartsAreaChart>
      </ChartContainer>
      
      {showLegend && yKeys.length > 1 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

// Convenience export
export function StackedAreaChart(props: Omit<AreaChartProps, "variant">) {
  return <CarbonAreaChart {...props} variant="stacked" />
}

