import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricItemProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: LucideIcon;
  accentColor: string;
  isStandout?: boolean;
}

export function MetricItem({
  label,
  value,
  trend,
  trendValue,
  icon: Icon,
  accentColor,
}: MetricItemProps) {
  return (
    <div className="flex flex-col gap-1 py-2 group/metric">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Technical Icon Box */}
          <div
            className="w-5 h-5 flex items-center justify-center bg-background border border-border rounded-[var(--radius)]"
          >
            <Icon className="w-3 h-3 transition-colors" style={{ color: accentColor }} strokeWidth={2.5} />
          </div>
          <span className="text-[12px] leading-4 text-muted-foreground uppercase tracking-[0.16px] font-bold">
            {label}
          </span>
        </div>

        {trend && trendValue && (
          <div
            className={cn(
              "text-[11px] font-semibold leading-4 px-2 py-0.5 flex items-center gap-1",
              trend === "up" && "text-[#24a148] bg-[#defbe6]",
              trend === "down" && "text-[#da1e28] bg-[#fff1f1]",
              trend === "neutral" && "text-[#525252] bg-[#f4f4f4]"
            )}
          >
            <span className="text-[10px]">{trend === "up" ? "▲" : trend === "down" ? "▼" : "•"}</span>
            {trendValue}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 pl-7 text-[#161616]">
        <span className="text-[1.5rem] leading-[1.75rem] font-medium tracking-tight">
          {value}
        </span>
      </div>

      {/* Carbon hairline divider */}
      <div className="h-[1px] w-full bg-border mt-2.5 ml-7 opacity-30" />
    </div>
  );
}
