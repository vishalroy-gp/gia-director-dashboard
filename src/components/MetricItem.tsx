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
  isStandout = false,
}: MetricItemProps) {
  if (isStandout) {
    return (
      <div className="flex items-center gap-carbon-04 md:gap-carbon-05 p-carbon-04 md:p-carbon-05 bg-white border-2 transition-all duration-150 hover:shadow-md" style={{ borderColor: accentColor }}>
        <div
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0 rounded-lg relative"
          style={{ backgroundColor: accentColor }}
        >
          <div className="absolute inset-0 bg-white opacity-90 rounded-lg"></div>
          <Icon className="w-6 h-6 md:w-8 md:h-8 relative z-10" style={{ color: accentColor }} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-carbon-gray-60 uppercase tracking-wider font-medium mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-carbon-03">
            <span className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: accentColor }}>
              {value}
            </span>
            {trend && trendValue && (
              <span
                className={cn(
                  "text-sm md:text-base font-medium",
                  trend === "up" && "text-carbon-green-40",
                  trend === "down" && "text-carbon-red-40",
                  trend === "neutral" && "text-carbon-gray-60"
                )}
              >
                {trendValue}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-carbon-03 md:gap-carbon-04 p-carbon-03 md:p-carbon-04 bg-carbon-gray-10 transition-all duration-150 hover:bg-carbon-gray-20">
      <div
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0"
        style={{ color: accentColor }}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-carbon-gray-60 uppercase tracking-wider font-normal mb-1">
          {label}
        </p>
        <div className="flex items-baseline gap-carbon-03">
          <span className="text-xl md:text-2xl font-semibold text-carbon-gray-100 tracking-tight">
            {value}
          </span>
          {trend && trendValue && (
            <span
              className={cn(
                "text-sm font-medium",
                trend === "up" && "text-carbon-green-40",
                trend === "down" && "text-carbon-red-40",
                trend === "neutral" && "text-carbon-gray-60"
              )}
            >
              {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
