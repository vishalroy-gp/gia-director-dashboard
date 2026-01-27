// CarbonCN Gauge/Meter Chart Component
// For KPI displays and progress indicators

import {
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ChartContainer,
  ChartLoadingState,
  chartColors,
  formatNumber,
} from "./index"
import { cn } from "@/lib/utils"

export interface GaugeChartProps {
  value: number
  min?: number
  max?: number
  height?: number
  colors?: {
    background?: string
    value?: string
  }
  label?: string
  unit?: string
  showValue?: boolean
  valueFormatter?: (value: number) => string
  loading?: boolean
  className?: string
  thresholds?: Array<{ value: number; color: string }>
}

export function CarbonGaugeChart({
  value,
  min = 0,
  max = 100,
  height = 200,
  colors,
  label,
  unit = "",
  showValue = true,
  valueFormatter,
  loading = false,
  className,
  thresholds,
}: GaugeChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />

  // Calculate percentage
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1)

  // Determine color based on thresholds
  let valueColor = colors?.value || chartColors.blue
  if (thresholds) {
    for (const threshold of thresholds.sort((a, b) => b.value - a.value)) {
      if (value >= threshold.value) {
        valueColor = threshold.color
        break
      }
    }
  }

  const bgColor = colors?.background || chartColors.gray20

  // Data for the gauge (half donut)
  const data = [
    { value: percentage * 100, color: valueColor },
    { value: (1 - percentage) * 100, color: bgColor },
  ]

  const displayValue = valueFormatter 
    ? valueFormatter(value) 
    : `${formatNumber(value)}${unit}`

  return (
    <div className={cn("w-full relative", className)}>
      <ChartContainer height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="90%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      
      {/* Center content */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ paddingTop: height * 0.15 }}
      >
        {showValue && (
          <span className="text-3xl font-semibold">{displayValue}</span>
        )}
        {label && (
          <span className="text-sm text-muted-foreground mt-1">{label}</span>
        )}
      </div>
      
      {/* Min/Max labels */}
      <div 
        className="absolute bottom-4 left-0 right-0 flex justify-between px-8 text-xs text-muted-foreground"
      >
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

// Convenience component for percentage gauges
export function PercentageGauge(props: Omit<GaugeChartProps, "min" | "max" | "unit">) {
  return (
    <CarbonGaugeChart 
      {...props} 
      min={0} 
      max={100} 
      unit="%" 
      valueFormatter={(v) => `${v.toFixed(0)}%`}
    />
  )
}

