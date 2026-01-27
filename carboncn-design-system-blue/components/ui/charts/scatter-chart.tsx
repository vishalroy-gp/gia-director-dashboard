// CarbonCN Scatter Chart Component
// For correlation analysis and data clustering

import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
  Cell,
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartEmptyState,
  ChartLoadingState,
  chartColors,
  getChartColor,
  axisStyle,
  gridStyle,
  formatNumber,
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface ScatterChartDataPoint {
  x: number
  y: number
  z?: number // For bubble size
  name?: string
  color?: string
}

export interface ScatterChartSeries {
  name: string
  data: ScatterChartDataPoint[]
  color?: string
}

export interface ScatterChartProps extends BaseChartProps {
  series: ScatterChartSeries[]
  xLabel?: string
  yLabel?: string
  zRange?: [number, number] // For bubble size range
  colors?: string[]
  formatter?: (value: number, name: string) => string
}

export function CarbonScatterChart({
  series,
  height = 350,
  xLabel,
  yLabel,
  zRange = [50, 400],
  colors,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter = formatNumber,
  className,
}: ScatterChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !series?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  const legendItems = series.map((s, index) => ({
    name: s.name,
    color: s.color || colors?.[index] || getChartColor(index),
  }))

  // Check if any series has z data (bubble chart)
  const hasBubbles = series.some(s => s.data.some(d => d.z !== undefined))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
          {showGrid && <CartesianGrid {...gridStyle} />}
          
          <XAxis 
            type="number" 
            dataKey="x" 
            name={xLabel || "x"} 
            {...axisStyle}
            label={xLabel ? { 
              value: xLabel, 
              position: "bottom", 
              offset: 0,
              style: { fill: chartColors.gray70, fontSize: 12 }
            } : undefined}
          />
          
          <YAxis 
            type="number" 
            dataKey="y" 
            name={yLabel || "y"} 
            {...axisStyle}
            label={yLabel ? { 
              value: yLabel, 
              angle: -90, 
              position: "insideLeft",
              style: { fill: chartColors.gray70, fontSize: 12 }
            } : undefined}
          />
          
          {hasBubbles && (
            <ZAxis 
              type="number" 
              dataKey="z" 
              range={zRange} 
            />
          )}
          
          {showTooltip && (
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null
                const data = payload[0].payload
                return (
                  <div className="bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-lg min-w-[120px]">
                    {data.name && <p className="font-medium mb-1">{data.name}</p>}
                    <p className="flex justify-between gap-4">
                      <span className="text-carbon-gray-30">{xLabel || "X"}</span>
                      <span>{formatter(data.x, "x")}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-carbon-gray-30">{yLabel || "Y"}</span>
                      <span>{formatter(data.y, "y")}</span>
                    </p>
                    {data.z !== undefined && (
                      <p className="flex justify-between gap-4">
                        <span className="text-carbon-gray-30">Size</span>
                        <span>{formatter(data.z, "z")}</span>
                      </p>
                    )}
                  </div>
                )
              }}
            />
          )}
          
          {series.map((s, index) => {
            const color = s.color || colors?.[index] || getChartColor(index)
            return (
              <Scatter
                key={s.name}
                name={s.name}
                data={s.data}
                fill={color}
              >
                {s.data.map((entry, i) => (
                  <Cell 
                    key={`cell-${i}`} 
                    fill={entry.color || color} 
                  />
                ))}
              </Scatter>
            )
          })}
        </RechartsScatterChart>
      </ChartContainer>
      
      {showLegend && series.length > 1 && (
        <ChartLegend items={legendItems} />
      )}
    </div>
  )
}

// Bubble Chart - Scatter with z-axis for size
export function BubbleChart(props: ScatterChartProps) {
  return <CarbonScatterChart {...props} />
}

