// CarbonCN Bar Chart Component
// Supports: default, grouped, stacked, horizontal variants

import {
  BarChart as RechartsBarChart,
  Bar,
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
  chartColors,
  getChartColor,
  axisStyle,
  gridStyle,
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface BarChartProps extends BaseChartProps {
  data: Array<Record<string, unknown>>
  xKey: string
  yKeys: string[]
  colors?: string[]
  variant?: "default" | "grouped" | "stacked" | "horizontal"
  barRadius?: number
  barGap?: number
  formatter?: (value: number, name: string) => string
}

export function CarbonBarChart({
  data,
  xKey,
  yKeys,
  colors,
  variant = "default",
  height = 300,
  barRadius = 0,
  barGap = 4,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter,
  className,
}: BarChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const isHorizontal = variant === "horizontal"
  const isStacked = variant === "stacked"
  
  const legendItems = yKeys.map((key, index) => ({
    name: key,
    color: colors?.[index] || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsBarChart
          data={data}
          layout={isHorizontal ? "vertical" : "horizontal"}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          barGap={barGap}
        >
          {showGrid && (
            <CartesianGrid 
              {...gridStyle} 
              horizontal={!isHorizontal}
              vertical={isHorizontal}
            />
          )}
          
          {isHorizontal ? (
            <>
              <XAxis type="number" {...axisStyle} />
              <YAxis type="category" dataKey={xKey} {...axisStyle} width={80} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} {...axisStyle} />
              <YAxis {...axisStyle} />
            </>
          )}
          
          {showTooltip && (
            <Tooltip 
              content={<ChartTooltip formatter={formatter} />}
              cursor={{ fill: chartColors.gray10 }}
            />
          )}
          
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors?.[index] || getChartColor(index)}
              radius={barRadius}
              stackId={isStacked ? "stack" : undefined}
            />
          ))}
        </RechartsBarChart>
      </ChartContainer>
      
      {showLegend && yKeys.length > 1 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

// Convenience exports for specific variants
export function GroupedBarChart(props: Omit<BarChartProps, "variant">) {
  return <CarbonBarChart {...props} variant="grouped" />
}

export function StackedBarChart(props: Omit<BarChartProps, "variant">) {
  return <CarbonBarChart {...props} variant="stacked" />
}

export function HorizontalBarChart(props: Omit<BarChartProps, "variant">) {
  return <CarbonBarChart {...props} variant="horizontal" />
}

