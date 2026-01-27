// CarbonCN Treemap Component
// For hierarchical data visualization

import {
  Treemap as RechartsTreemap,
  Tooltip,
} from "recharts"
import {
  ChartContainer,
  ChartEmptyState,
  ChartLoadingState,
  getChartColor,
  formatNumber,
} from "./index"
import { cn } from "@/lib/utils"

export interface TreemapDataNode {
  name: string
  value?: number
  color?: string
  children?: TreemapDataNode[]
  [key: string]: unknown
}

export interface TreemapProps {
  data: TreemapDataNode[]
  height?: number
  colors?: string[]
  showTooltip?: boolean
  showLabels?: boolean
  aspectRatio?: number
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  valueFormatter?: (value: number) => string
  className?: string
}

// Custom content renderer for treemap cells
function CustomTreemapContent(props: {
  x?: number
  y?: number
  width?: number
  height?: number
  name?: string
  value?: number
  color?: string
  index?: number
  showLabels?: boolean
}) {
  const { x = 0, y = 0, width = 0, height = 0, name = "", value = 0, color, index = 0, showLabels = true } = props
  const fontSize = Math.min(width / 8, height / 3, 14)
  const showText = showLabels && width > 40 && height > 30

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color || getChartColor(index)}
        stroke="#fff"
        strokeWidth={2}
        className="cursor-pointer transition-opacity hover:opacity-80"
      />
      {showText && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - fontSize / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize}
            fontWeight={500}
          >
            {name.length > width / 8 ? `${name.slice(0, Math.floor(width / 8))}...` : name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + fontSize / 2 + 4}
            textAnchor="middle"
            fill="rgba(255,255,255,0.8)"
            fontSize={fontSize * 0.8}
          >
            {formatNumber(value)}
          </text>
        </>
      )}
    </g>
  )
}

export function CarbonTreemap({
  data,
  height = 400,
  colors,
  showTooltip = true,
  showLabels = true,
  aspectRatio = 4 / 3,
  loading = false,
  empty = false,
  emptyMessage,
  valueFormatter = formatNumber,
  className,
}: TreemapProps) {
  if (loading) return <ChartLoadingState height={height} className={className} />
  if (empty || !data?.length) return <ChartEmptyState height={height} message={emptyMessage} className={className} />

  // Add colors to data if not provided
  const coloredData = data.map((node, index) => ({
    ...node,
    color: node.color || colors?.[index] || getChartColor(index),
  }))

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer height={height}>
        <RechartsTreemap
          data={coloredData}
          dataKey="value"
          aspectRatio={aspectRatio}
          stroke="#fff"
          content={<CustomTreemapContent showLabels={showLabels} />}
        >
          {showTooltip && (
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]) return null
                const item = payload[0].payload as TreemapDataNode
                return (
                  <div className="bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-lg">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-carbon-gray-30">{valueFormatter(item.value || 0)}</p>
                  </div>
                )
              }}
            />
          )}
        </RechartsTreemap>
      </ChartContainer>
    </div>
  )
}
