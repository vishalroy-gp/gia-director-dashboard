// CarbonCN Radar/Spider Chart Component
// For multi-dimensional comparisons

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface RadarChartProps extends BaseChartProps {
  data: Array<Record<string, unknown>>
  dataKeys: string[]
  angleKey: string
  colors?: string[]
  fillOpacity?: number
  outerRadius?: string | number
  formatter?: (value: number, name: string) => string
}

export function CarbonRadarChart({
  data,
  dataKeys,
  angleKey,
  colors,
  height = 350,
  fillOpacity = 0.3,
  outerRadius = "70%",
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter,
  className,
}: RadarChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const legendItems = dataKeys.map((key, index) => ({
    name: key,
    color: colors?.[index] || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsRadarChart
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
        >
          {showGrid && (
            <PolarGrid stroke={chartColors.gray20} />
          )}
          
          <PolarAngleAxis 
            dataKey={angleKey} 
            tick={{ fill: chartColors.gray70, fontSize: 12 }}
          />
          
          <PolarRadiusAxis 
            angle={30} 
            tick={{ fill: chartColors.gray50, fontSize: 10 }}
            axisLine={false}
          />
          
          {showTooltip && (
            <Tooltip content={<ChartTooltip formatter={formatter} />} />
          )}
          
          {dataKeys.map((key, index) => {
            const color = colors?.[index] || getChartColor(index)
            return (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={fillOpacity}
                strokeWidth={2}
              />
            )
          })}
        </RechartsRadarChart>
      </ChartContainer>
      
      {showLegend && dataKeys.length > 1 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

