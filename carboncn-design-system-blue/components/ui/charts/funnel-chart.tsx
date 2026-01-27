// CarbonCN Funnel Chart Component
// For sales pipelines, conversion funnels, and process stages

import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  Tooltip,
  Cell,
  LabelList,
} from "recharts"
import {
  ChartContainer,
  ChartEmptyState,
  ChartLoadingState,
  getChartColor,
  formatNumber,
} from "./index"
import { cn } from "@/lib/utils"

export interface FunnelChartData {
  name: string
  value: number
  color?: string
}

export interface FunnelChartProps {
  data: FunnelChartData[]
  height?: number
  colors?: string[]
  showTooltip?: boolean
  showLabels?: boolean
  showValues?: boolean
  valueFormatter?: (value: number) => string
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  className?: string
}

export function CarbonFunnelChart({
  data,
  height = 300,
  colors,
  showTooltip = true,
  showLabels = true,
  showValues = true,
  valueFormatter = formatNumber,
  loading = false,
  empty = false,
  emptyMessage,
  className,
}: FunnelChartProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  // Calculate conversion rates
  const dataWithRates = data.map((item, index) => ({
    ...item,
    rate: index === 0 ? 100 : Math.round((item.value / data[0].value) * 100),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsFunnelChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <Funnel
            dataKey="value"
            data={dataWithRates}
            isAnimationActive
          >
            {dataWithRates.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors?.[index] || getChartColor(index)} 
              />
            ))}
            
            {showLabels && (
              <LabelList
                position="right"
                fill="#525252"
                fontSize={12}
                dataKey="name"
              />
            )}
            
            {showValues && (
              <LabelList
                position="left"
                fill="#525252"
                fontSize={12}
                dataKey="value"
              />
            )}
          </Funnel>
          
          {showTooltip && (
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null
                const item = payload[0].payload as FunnelChartData & { rate: number }
                return (
                  <div className="bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-lg min-w-[120px]">
                    <p className="font-medium mb-1">{item.name}</p>
                    <p className="flex justify-between gap-4">
                      <span className="text-carbon-gray-30">Value</span>
                      <span>{valueFormatter(item.value)}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span className="text-carbon-gray-30">Rate</span>
                      <span>{item.rate}%</span>
                    </p>
                  </div>
                )
              }}
            />
          )}
        </RechartsFunnelChart>
      </ChartContainer>
      
      {/* Legend below chart */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {dataWithRates.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span 
              className="w-3 h-3"
              style={{ backgroundColor: item.color || colors?.[index] || getChartColor(index) }}
            />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-medium">({item.rate}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
