// CarbonCN Pie and Donut Chart Components

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartEmptyState,
  ChartLoadingState,
  getChartColor,
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface PieChartData {
  name: string
  value: number
  color?: string
}

export interface PieChartProps extends BaseChartProps {
  data: PieChartData[]
  colors?: string[]
  innerRadius?: number
  outerRadius?: number
  paddingAngle?: number
  formatter?: (value: number, name: string) => string
  showLabels?: boolean
  labelType?: "name" | "value" | "percent"
}

export function CarbonPieChart({
  data,
  colors,
  height = 300,
  innerRadius = 0,
  outerRadius = 90,
  paddingAngle = 0,
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  loading = false,
  empty = false,
  emptyMessage,
  formatter,
  className,
}: PieChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const legendItems = data.map((item, index) => ({
    name: item.name,
    color: item.color || colors?.[index] || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsPieChart>
          <Pie
            data={data as unknown as Array<Record<string, unknown>>}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            dataKey="value"
            nameKey="name"
            stroke="none"
            label={showLabels}
            labelLine={showLabels}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors?.[index] || getChartColor(index)} 
              />
            ))}
          </Pie>
          
          {showTooltip && (
            <Tooltip content={<ChartTooltip formatter={formatter} />} />
          )}
        </RechartsPieChart>
      </ChartContainer>
      
      {showLegend && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

// Donut Chart - Pie with inner radius
export interface DonutChartProps extends Omit<PieChartProps, "innerRadius"> {
  innerRadius?: number
  centerLabel?: string
  centerValue?: string | number
}

export function CarbonDonutChart({
  innerRadius = 60,
  centerLabel,
  centerValue,
  height = 300,
  ...props
}: DonutChartProps) {
  return (
    <div className="relative">
      <CarbonPieChart 
        {...props} 
        height={height}
        innerRadius={innerRadius} 
      />
      
      {(centerLabel || centerValue) && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ height }}
        >
          {centerValue && (
            <span className="text-2xl font-semibold">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-sm text-muted-foreground">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

