import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricItem } from "./MetricItem";
import { Manager } from "@/data/managers";

interface ManagerCardProps extends Manager { }

export function ManagerCard({
  title,
  subtitle,
  description,
  accentColor,
  icon: Icon,
  metrics,
  ctaText,
  ctaUrl,
}: ManagerCardProps) {
  return (
    <div className="bg-white h-full min-h-fit flex flex-col relative transition-all duration-200 border border-border rounded-[var(--radius)] group hover:border-primary/50 shadow-sm hover:shadow-md">
      {/* Thicker top accent line (Bold Vercel-style) */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      />

      {/* Card Header - Balanced hierarchy */}
      <div className="p-5 md:p-6 pb-2 relative flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-[1.25rem] leading-[1.5rem] font-semibold text-foreground tracking-tight">
              {title}
            </h2>
            <p className="text-[12px] text-muted-foreground uppercase tracking-[0.16px] font-bold mt-1">
              {subtitle}
            </p>
          </div>
          {/* Functional Icon Container */}
          <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-background border border-border rounded-[var(--radius)]">
            <Icon className="w-4.5 h-4.5 text-foreground" strokeWidth={1.5} />
          </div>
        </div>
        <p className="text-[14px] leading-5 text-muted-foreground font-normal">
          {description}
        </p>
      </div>

      {/* Metrics Section - Flexible layout with overflow safety */}
      <div className="flex-1 px-5 md:px-6 py-2 flex flex-col justify-center min-h-fit">
        <div className="space-y-2 lg:space-y-4">
          {metrics.map((metric, index) => (
            <MetricItem
              key={index}
              {...metric}
              icon={metric.icon}
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>

      {/* CTA Footer - Balanced */}
      <div className="p-5 md:p-6 pb-6 md:pb-8 pt-4 mt-auto flex-shrink-0">
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            variant="outline"
            className="w-full h-11 justify-between text-[14px] font-medium tracking-[0.16px] px-6 rounded-[var(--radius)] border-border hover:bg-primary hover:text-primary-foreground hover:border-primary group/btn transition-all duration-200"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </a>
      </div>
    </div>
  );
}
