// CarbonCN Waterfall Chart Component
// For financial analysis, showing cumulative effects

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts"
import {
  ChartContainer,
  ChartEmptyState,
  ChartLoadingState,
  chartColors,
  axisStyle,
  gridStyle,
  formatNumber,
  type BaseChartProps,
} from "./index"
import { cn } from "@/lib/utils"

export interface WaterfallChartData {
  name: string
  value: number
  isTotal?: boolean
}

export interface WaterfallChartProps extends BaseChartProps {
  data: WaterfallChartData[]
  colors?: {
    positive?: string
    negative?: string
    total?: string
  }
  showConnectors?: boolean
  formatter?: (value: number) => string
}

export function CarbonWaterfallChart({
  data,
  height = 350,
  colors = {
    positive: chartColors.green,
    negative: chartColors.red,
    total: chartColors.blue,
  },
  showGrid = true,
  showTooltip = true,
  loading = false,
  empty = false,
  emptyMessage,
  formatter = formatNumber,
  className,
}: WaterfallChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  // Process data to create waterfall structure
  // Each bar needs: start position (invisible) and value (visible)
  let cumulative = 0
  const processedData = data.map((item) => {
    const start = item.isTotal ? 0 : cumulative
    const end = item.isTotal ? item.value : cumulative + item.value
    
    if (!item.isTotal) {
      cumulative += item.value
    }
    
    return {
      ...item,
      start: Math.min(start, end),
      end: Math.max(start, end),
      displayValue: item.value,
      isPositive: item.value >= 0,
    }
  })

  const getColor = (item: typeof processedData[0]) => {
    if (item.isTotal) return colors.total
    return item.isPositive ? colors.positive : colors.negative
  }

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {showGrid && <CartesianGrid {...gridStyle} />}
          
          <XAxis dataKey="name" {...axisStyle} />
          <YAxis {...axisStyle} />
          
          {/* Zero reference line */}
          <ReferenceLine y={0} stroke={chartColors.gray50} strokeWidth={1} />
          
          {showTooltip && (
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null
                const data = payload[0].payload
                return (
                  <div className="bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-lg min-w-[100px]">
                    <p className="font-medium mb-1">{data.name}</p>
                    <p className="flex justify-between gap-4">
                      <span className="text-carbon-gray-30">
                        {data.isTotal ? "Total" : data.isPositive ? "Increase" : "Decrease"}
                      </span>
                      <span 
                        style={{ 
                          color: data.isTotal ? colors.total : 
                                 data.isPositive ? colors.positive : colors.negative 
                        }}
                      >
                        {data.isPositive && !data.isTotal ? "+" : ""}{formatter(data.displayValue)}
                      </span>
                    </p>
                  </div>
                )
              }}
            />
          )}
          
          {/* Invisible bar for positioning */}
          <Bar dataKey="start" stackId="waterfall" fill="transparent" />
          
          {/* Visible value bar */}
          <Bar 
            dataKey={(d: typeof processedData[0]) => d.end - d.start} 
            stackId="waterfall"
            radius={0}
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3" style={{ backgroundColor: colors.positive }} />
          <span className="text-muted-foreground">Increase</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3" style={{ backgroundColor: colors.negative }} />
          <span className="text-muted-foreground">Decrease</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3" style={{ backgroundColor: colors.total }} />
          <span className="text-muted-foreground">Total</span>
        </div>
      </div>
    </div>
  )
}

