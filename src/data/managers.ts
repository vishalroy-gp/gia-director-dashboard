import {
  Megaphone,
  DollarSign,
  Eye,
  Phone,
  Calendar,
  Users,
  Star,
  RefreshCw,
  Bell,
  RefreshCcw,
  LucideIcon
} from "lucide-react";

export interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: LucideIcon;
}

export interface Manager {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  icon: LucideIcon;
  metrics: Metric[];
  ctaText: string;
  ctaUrl: string;
}

export const managers: Manager[] = [
  {
    id: "marketing",
    title: "AI Marketing Manager",
    subtitle: "Powered by Gia",
    description: "",
    accentColor: "#F97316", // Professional Vibrant Orange
    icon: Megaphone,
    metrics: [
      {
        label: "Leads Generated",
        value: "$1M",
        trend: "up",
        trendValue: "+18%",
        icon: DollarSign
      },
      {
        label: "Leads Captured",
        value: "2,847",
        trend: "up",
        trendValue: "+23%",
        icon: Megaphone
      },
      {
        label: "Cost Per Lead",
        value: "$4.82",
        trend: "down",
        trendValue: "-15%",
        icon: DollarSign
      },
      {
        label: "Ad Impressions",
        value: "847K",
        trend: "up",
        trendValue: "+42%",
        icon: Eye
      }
    ],
    ctaText: "Launch Marketing Manager",
    ctaUrl: "https://app.getinstantleads.net"
  },
  {
    id: "business-dev",
    title: "AI Business Dev Manager",
    subtitle: "Powered by Gia",
    description: "",
    accentColor: "#3B82F6", // Professional Bright Blue
    icon: Phone,
    metrics: [
      {
        label: "Converted to Business",
        value: "$600K",
        trend: "up",
        trendValue: "+24%",
        icon: DollarSign
      },
      {
        label: "Answer Rate",
        value: "98.2%",
        trend: "up",
        trendValue: "+5%",
        icon: Phone
      },
      {
        label: "Bookings",
        value: "1,284",
        trend: "up",
        trendValue: "+31%",
        icon: Calendar
      },
      {
        label: "Show Rate",
        value: "87%",
        trend: "up",
        trendValue: "+12%",
        icon: Users
      }
    ],
    ctaText: "Launch Business Dev Manager",
    ctaUrl: "https://gia-portal-64kft.ondigitalocean.app"
  },
  {
    id: "customer-service",
    title: "AI CS Manager",
    subtitle: "Powered by Gia",
    description: "",
    accentColor: "#8B5CF6", // Professional Bright Purple
    icon: RefreshCcw,
    metrics: [
      {
        label: "Repeat Business",
        value: "$200K",
        trend: "up",
        trendValue: "+32%",
        icon: DollarSign
      },
      {
        label: "New Reviews",
        value: "342",
        trend: "up",
        trendValue: "+67%",
        icon: Star
      },
      {
        label: "Win-Back Conv.",
        value: "24%",
        trend: "up",
        trendValue: "+8%",
        icon: RefreshCw
      },
      {
        label: "Reminder Conf.",
        value: "91%",
        trend: "up",
        trendValue: "+4%",
        icon: Bell
      }
    ],
    ctaText: "Launch Service Manager",
    ctaUrl: "https://reviews.garageplug.com"
  }
];
