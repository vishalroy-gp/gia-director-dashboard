// CarbonCN Combo Chart Component
// Combines Bar and Line charts

import {
  ComposedChart,
  Bar,
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
  chartColors,
  getChartColor,
  axisStyle,
  gridStyle,
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface ComboChartSeries {
  key: string
  type: "bar" | "line"
  color?: string
  yAxisId?: "left" | "right"
}

export interface ComboChartProps extends BaseChartProps {
  data: Array<Record<string, unknown>>
  xKey: string
  series: ComboChartSeries[]
  showRightAxis?: boolean
  barRadius?: number
  lineStrokeWidth?: number
  formatter?: (value: number, name: string) => string
}

export function CarbonComboChart({
  data,
  xKey,
  series,
  height = 300,
  showRightAxis = false,
  barRadius = 0,
  lineStrokeWidth = 2,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter,
  className,
}: ComboChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const legendItems = series.map((s, index) => ({
    name: s.key,
    color: s.color || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: showRightAxis ? 40 : 20, bottom: 20, left: 20 }}
        >
          {showGrid && <CartesianGrid {...gridStyle} />}
          
          <XAxis dataKey={xKey} {...axisStyle} />
          <YAxis yAxisId="left" {...axisStyle} />
          {showRightAxis && (
            <YAxis yAxisId="right" orientation="right" {...axisStyle} />
          )}
          
          {showTooltip && (
            <Tooltip 
              content={<ChartTooltip formatter={formatter} />}
              cursor={{ fill: chartColors.gray10 }}
            />
          )}
          
          {series.map((s, index) => {
            const color = s.color || getChartColor(index)
            const yAxisId = s.yAxisId || "left"
            
            if (s.type === "bar") {
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  fill={color}
                  radius={barRadius}
                  yAxisId={yAxisId}
                />
              )
            } else {
              return (
                <Line
                  key={s.key}
                  type="linear"
                  dataKey={s.key}
                  stroke={color}
                  strokeWidth={lineStrokeWidth}
                  dot={{ r: 4, fill: color }}
                  yAxisId={yAxisId}
                />
              )
            }
          })}
        </ComposedChart>
      </ChartContainer>
      
      {showLegend && series.length > 1 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

