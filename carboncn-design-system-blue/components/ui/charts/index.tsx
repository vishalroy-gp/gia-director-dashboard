// CarbonCN Enterprise Charts - Shared Utilities
// Built on Recharts with Carbon Design System styling

import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

// ============ CARBON CHART COLORS ============
export const chartColors = {
  // Primary palette
  blue: "#0f62fe",
  cyan: "#1192e8",
  teal: "#009d9a",
  green: "#198038",
  purple: "#8a3ffc",
  magenta: "#d12771",
  red: "#da1e28",
  orange: "#eb6200",
  yellow: "#f1c21b",
  
  // Extended palette for large datasets
  blue70: "#0043ce",
  cyan70: "#00539a",
  teal70: "#005d5d",
  green70: "#0e6027",
  purple70: "#6929c4",
  magenta70: "#9f1853",
  
  // Grays for backgrounds/grids
  gray10: "#f4f4f4",
  gray20: "#e0e0e0",
  gray30: "#c6c6c6",
  gray50: "#8d8d8d",
  gray70: "#525252",
  gray100: "#161616",
}

// Color array for easy iteration
export const chartColorArray = [
  chartColors.blue,
  chartColors.cyan,
  chartColors.teal,
  chartColors.purple,
  chartColors.green,
  chartColors.magenta,
  chartColors.orange,
  chartColors.red,
  chartColors.yellow,
]

// Get chart color by index (cycles through palette)
export function getChartColor(index: number): string {
  return chartColorArray[index % chartColorArray.length]
}

// ============ FORMATTERS ============
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toLocaleString()
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

// ============ CHART CONTAINER ============
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, height = 300, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full", className)}
      style={{ height }}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
)
ChartContainer.displayName = "ChartContainer"

// ============ CHART CARD ============
interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

export const ChartCard = React.forwardRef<HTMLDivElement, ChartCardProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border border-border",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="p-carbon-05 pb-carbon-03">
          {title && <h3 className="text-base font-medium">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="p-carbon-05 pt-0">{children}</div>
    </div>
  )
)
ChartCard.displayName = "ChartCard"

// ============ CHART TOOLTIP ============
interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color?: string
    dataKey?: string
    payload?: Record<string, unknown>
  }>
  label?: string
  formatter?: (value: number, name: string) => string
}

export function ChartTooltip({ 
  active, 
  payload, 
  label,
  formatter = (v) => formatNumber(v)
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-carbon-gray-100 text-white px-carbon-04 py-carbon-03 text-sm shadow-lg min-w-[120px]">
      {label && <p className="font-medium mb-1 text-carbon-gray-30">{label}</p>}
      {payload.map((entry, index) => (
        <p key={index} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span
              className="w-2 h-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-carbon-gray-30">{entry.name}</span>
          </span>
          <span className="font-medium">{formatter(entry.value, entry.name)}</span>
        </p>
      ))}
    </div>
  )
}

// ============ CHART LEGEND ============
interface ChartLegendProps {
  items: Array<{ name: string; color: string }>
  className?: string
  onToggle?: (name: string) => void
  activeItems?: string[]
}

export function ChartLegend({ 
  items, 
  className,
  onToggle,
  activeItems 
}: ChartLegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-4 justify-center mt-3", className)}>
      {items.map((item) => {
        const isActive = !activeItems || activeItems.includes(item.name)
        return (
          <button
            key={item.name}
            onClick={() => onToggle?.(item.name)}
            className={cn(
              "flex items-center gap-2 text-sm transition-opacity",
              onToggle && "cursor-pointer hover:opacity-80",
              !isActive && "opacity-40"
            )}
            type="button"
          >
            <span
              className="w-3 h-3"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}</span>
          </button>
        )
      })}
    </div>
  )
}

// ============ CHART EMPTY STATE ============
interface ChartEmptyStateProps {
  message?: string
  height?: number
  className?: string
}

export function ChartEmptyState({ 
  message = "No data available",
  height = 200,
  className 
}: ChartEmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center text-muted-foreground text-sm",
        className
      )}
      style={{ height }}
    >
      <div className="text-center">
        <svg 
          className="w-12 h-12 mx-auto mb-3 opacity-30"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
        <p>{message}</p>
      </div>
    </div>
  )
}

// ============ CHART LOADING STATE ============
interface ChartLoadingStateProps {
  height?: number
  className?: string
}

export function ChartLoadingState({ 
  height = 200,
  className 
}: ChartLoadingStateProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        className
      )}
      style={{ height }}
    >
      <div className="animate-pulse flex flex-col items-center gap-3 w-full px-6">
        <div className="flex items-end gap-2 h-24 w-full max-w-xs">
          <div className="bg-muted w-1/5 h-1/2 rounded-none" />
          <div className="bg-muted w-1/5 h-3/4 rounded-none" />
          <div className="bg-muted w-1/5 h-full rounded-none" />
          <div className="bg-muted w-1/5 h-2/3 rounded-none" />
          <div className="bg-muted w-1/5 h-1/3 rounded-none" />
        </div>
        <div className="bg-muted h-2 w-32 rounded-none" />
      </div>
    </div>
  )
}

// ============ BASE CHART PROPS ============
export interface BaseChartProps {
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  className?: string
}

// ============ AXIS STYLES ============
export const axisStyle = {
  axisLine: false,
  tickLine: false,
  tick: { fill: chartColors.gray70, fontSize: 12 },
}

export const gridStyle = {
  strokeDasharray: "0",
  stroke: chartColors.gray20,
  vertical: false,
}

// Re-export recharts components for convenience
export {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  Treemap,
  Funnel,
  FunnelChart,
  LabelList,
  ReferenceLine,
  ReferenceArea,
  ComposedChart,
} from "recharts"

