import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "accent" | "success";
  delay?: number;
}

const variants = {
  default: "bg-card",
  primary: "gradient-primary text-primary-foreground",
  accent: "gradient-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
  delay = 0,
}: StatsCardProps) {
  const isPrimary = variant !== "default";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 sm:p-5 lg:p-6 shadow-card",
        variants[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            isPrimary ? "opacity-90" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "font-display text-3xl font-bold",
            isPrimary ? "" : "text-foreground"
          )}>
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              "text-sm",
              isPrimary ? "opacity-80" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend === "up" && !isPrimary && "text-success",
              trend === "down" && !isPrimary && "text-destructive",
              isPrimary && "opacity-90"
            )}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </div>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          isPrimary ? "bg-white/20" : "bg-secondary"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            isPrimary ? "" : "text-primary"
          )} />
        </div>
      </div>
      
      {/* Decorative element - hidden on mobile for cleaner layout */}
      <div className={cn(
        "absolute -right-4 -top-4 hidden sm:block h-24 w-24 rounded-full opacity-10",
        isPrimary ? "bg-white" : "bg-primary"
      )} />
    </motion.div>
  );
}
