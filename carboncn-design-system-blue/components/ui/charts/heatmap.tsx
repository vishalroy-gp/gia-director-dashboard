// CarbonCN Heatmap Component
// For correlation matrices, activity calendars, and intensity grids

import * as React from "react"
import { chartColors } from "./index"
import { cn } from "@/lib/utils"

export interface HeatmapCell {
  x: string | number
  y: string | number
  value: number
}

export interface HeatmapProps {
  data: HeatmapCell[]
  xLabels: string[]
  yLabels: string[]
  height?: number
  colors?: {
    low?: string
    mid?: string
    high?: string
  }
  showValues?: boolean
  showTooltip?: boolean
  cellSize?: number
  cellGap?: number
  valueFormatter?: (value: number) => string
  loading?: boolean
  className?: string
}

// Interpolate between two colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex = (c: string) => parseInt(c, 16)
  const r1 = hex(color1.slice(1, 3))
  const g1 = hex(color1.slice(3, 5))
  const b1 = hex(color1.slice(5, 7))
  const r2 = hex(color2.slice(1, 3))
  const g2 = hex(color2.slice(3, 5))
  const b2 = hex(color2.slice(5, 7))
  
  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)
  
  return `rgb(${r}, ${g}, ${b})`
}

export function CarbonHeatmap({
  data,
  xLabels,
  yLabels,
  height,
  colors = {
    low: "#e0e0e0",
    mid: "#78a9ff",
    high: "#0f62fe",
  },
  showValues = false,
  showTooltip = true,
  cellSize = 40,
  cellGap = 2,
  valueFormatter = (v) => v.toFixed(0),
  loading = false,
  className,
}: HeatmapProps) {
  const [tooltip, setTooltip] = React.useState<{
    x: number
    y: number
    content: string
  } | null>(null)

  if (loading) {
    return (
      <div className={cn("animate-pulse bg-muted", className)} style={{ height: height || 200 }} />
    )
  }

  // Calculate min/max for color scaling
  const values = data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || 1

  // Build a lookup map
  const dataMap = new Map<string, number>()
  data.forEach(d => {
    dataMap.set(`${d.x}-${d.y}`, d.value)
  })

  const getCellColor = (value: number) => {
    const normalized = (value - minValue) / range
    if (normalized < 0.5) {
      return interpolateColor(colors.low!, colors.mid!, normalized * 2)
    }
    return interpolateColor(colors.mid!, colors.high!, (normalized - 0.5) * 2)
  }

  const gridWidth = xLabels.length * (cellSize + cellGap) + 60 // +60 for y-axis labels
  const gridHeight = yLabels.length * (cellSize + cellGap) + 30 // +30 for x-axis labels

  return (
    <div className={cn("relative overflow-auto", className)}>
      <svg 
        width={gridWidth} 
        height={height || gridHeight}
        className="font-sans"
      >
        {/* Y-axis labels */}
        {yLabels.map((label, yi) => (
          <text
            key={`y-${yi}`}
            x={55}
            y={yi * (cellSize + cellGap) + cellSize / 2 + 4}
            textAnchor="end"
            className="text-xs fill-muted-foreground"
          >
            {label}
          </text>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, xi) => (
          <text
            key={`x-${xi}`}
            x={60 + xi * (cellSize + cellGap) + cellSize / 2}
            y={yLabels.length * (cellSize + cellGap) + 15}
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            {label}
          </text>
        ))}

        {/* Cells */}
        {yLabels.map((yLabel, yi) => (
          xLabels.map((xLabel, xi) => {
            const value = dataMap.get(`${xLabel}-${yLabel}`) ?? 0
            const x = 60 + xi * (cellSize + cellGap)
            const y = yi * (cellSize + cellGap)
            
            return (
              <g key={`${xi}-${yi}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={getCellColor(value)}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={() => {
                    if (showTooltip) {
                      setTooltip({
                        x: x + cellSize / 2,
                        y: y - 8,
                        content: `${xLabel}, ${yLabel}: ${valueFormatter(value)}`,
                      })
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
                {showValues && (
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2 + 4}
                    textAnchor="middle"
                    className="text-xs fill-foreground pointer-events-none"
                    style={{ 
                      fill: (value - minValue) / range > 0.6 ? "white" : "currentColor" 
                    }}
                  >
                    {valueFormatter(value)}
                  </text>
                )}
              </g>
            )
          })
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltip.x - 60}
              y={tooltip.y - 24}
              width={120}
              height={20}
              rx={2}
              fill={chartColors.gray100}
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 10}
              textAnchor="middle"
              className="text-xs fill-white"
            >
              {tooltip.content}
            </text>
          </g>
        )}
      </svg>

      {/* Color legend */}
      <div className="flex items-center gap-2 mt-4 ml-16">
        <span className="text-xs text-muted-foreground">{valueFormatter(minValue)}</span>
        <div 
          className="h-3 w-24 rounded-sm"
          style={{
            background: `linear-gradient(to right, ${colors.low}, ${colors.mid}, ${colors.high})`,
          }}
        />
        <span className="text-xs text-muted-foreground">{valueFormatter(maxValue)}</span>
      </div>
    </div>
  )
}

// Calendar heatmap variant
export interface CalendarHeatmapProps {
  data: Array<{ date: string; value: number }>
  startDate?: Date
  endDate?: Date
  colors?: { low?: string; mid?: string; high?: string }
  cellSize?: number
  valueFormatter?: (value: number) => string
  className?: string
}

export function CalendarHeatmap({
  data,
  startDate = new Date(new Date().getFullYear(), 0, 1),
  endDate = new Date(),
  colors = {
    low: "#e0e0e0",
    mid: "#78a9ff", 
    high: "#0f62fe",
  },
  cellSize = 12,
  valueFormatter = (v) => v.toFixed(0),
  className,
}: CalendarHeatmapProps) {
  // Create date map
  const dataMap = new Map<string, number>()
  data.forEach(d => dataMap.set(d.date, d.value))

  const values = data.map(d => d.value)
  const minValue = Math.min(...values, 0)
  const maxValue = Math.max(...values, 1)
  const range = maxValue - minValue || 1

  const getCellColor = (value: number | undefined) => {
    if (value === undefined) return colors.low
    const normalized = (value - minValue) / range
    if (normalized < 0.5) {
      return interpolateColor(colors.low!, colors.mid!, normalized * 2)
    }
    return interpolateColor(colors.mid!, colors.high!, (normalized - 0.5) * 2)
  }

  // Generate weeks
  const weeks: Date[][] = []
  let currentDate = new Date(startDate)
  currentDate.setDate(currentDate.getDate() - currentDate.getDay()) // Start from Sunday
  
  while (currentDate <= endDate) {
    const week: Date[] = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    weeks.push(week)
  }

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""]
  const gap = 2

  return (
    <div className={cn("overflow-auto", className)}>
      <svg 
        width={weeks.length * (cellSize + gap) + 30} 
        height={7 * (cellSize + gap) + 10}
      >
        {/* Day labels */}
        {dayLabels.map((label, i) => (
          <text
            key={i}
            x={0}
            y={i * (cellSize + gap) + cellSize - 2}
            className="text-[10px] fill-muted-foreground"
          >
            {label}
          </text>
        ))}

        {/* Cells */}
        {weeks.map((week, wi) => (
          week.map((date, di) => {
            const dateStr = date.toISOString().split("T")[0]
            const value = dataMap.get(dateStr)
            const isInRange = date >= startDate && date <= endDate
            
            if (!isInRange) return null

            return (
              <rect
                key={dateStr}
                x={30 + wi * (cellSize + gap)}
                y={di * (cellSize + gap)}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill={getCellColor(value)}
                className="cursor-pointer"
              >
                <title>{`${dateStr}: ${value !== undefined ? valueFormatter(value) : "No data"}`}</title>
              </rect>
            )
          })
        ))}
      </svg>
    </div>
  )
}

