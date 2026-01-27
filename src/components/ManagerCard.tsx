import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricItem } from "./MetricItem";
import { Manager } from "@/data/managers";

interface ManagerCardProps extends Manager {}

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
    <div className="bg-white h-full flex flex-col relative overflow-hidden transition-all duration-150 hover:shadow-lg border border-carbon-gray-20">
      {/* Color Accent Strip - Top */}
      <div
        className="h-2 w-full flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      />

      {/* Card Header */}
      <div className="p-carbon-05 md:p-carbon-06 pb-carbon-04 relative">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-carbon-gray-100 mb-carbon-02 tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-carbon-gray-60 font-normal mb-carbon-04">
              {subtitle}
            </p>
          </div>
          {/* Icon with colored background */}
          <div
            className="rounded-lg p-2 md:p-3 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: accentColor,
              opacity: 0.9
            }}
          >
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <p className="text-base text-carbon-gray-70 font-normal leading-relaxed">
          {description}
        </p>
      </div>

      {/* Metrics Section */}
      <div className="flex-1 px-carbon-05 md:px-carbon-06 py-carbon-04">
        <div className="space-y-carbon-03 md:space-y-carbon-04">
          {metrics.map((metric, index) => (
            <MetricItem
              key={index}
              {...metric}
              icon={metric.icon}
              accentColor={accentColor}
              isStandout={index === 0}
            />
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-carbon-05 md:p-carbon-06 pt-carbon-04">
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            className="w-full h-11 md:h-12 text-sm md:text-base font-normal transition-all duration-150 hover:translate-y-[-2px] hover:shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
