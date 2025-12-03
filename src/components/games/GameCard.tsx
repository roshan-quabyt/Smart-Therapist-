import { motion } from "framer-motion";
import { LucideIcon, Play, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  variant: "purple" | "teal" | "coral" | "blue";
  locked?: boolean;
  delay?: number;
  onPlay?: () => void;
}

const variantStyles = {
  purple: "from-purple-500 to-purple-600",
  teal: "from-primary to-teal-500",
  coral: "from-accent to-orange-400",
  blue: "from-info to-blue-500",
};

const difficultyColors = {
  Easy: "bg-success/20 text-success",
  Medium: "bg-warning/20 text-warning",
  Hard: "bg-destructive/20 text-destructive",
};

export function GameCard({
  title,
  description,
  icon: Icon,
  difficulty,
  duration,
  variant,
  locked = false,
  delay = 0,
  onPlay,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card shadow-card transition-shadow hover:shadow-lg",
        locked && "opacity-70"
      )}
    >
      {/* Gradient Header */}
      <div className={cn(
        "relative h-32 bg-gradient-to-br p-6",
        variantStyles[variant]
      )}>
        <Icon className="h-12 w-12 text-white/90" />
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Lock className="h-8 w-8 text-white" />
          </div>
        )}
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </span>
          <span className="text-xs text-muted-foreground">{duration}</span>
        </div>

        <h3 className="mb-2 font-display text-lg font-bold text-foreground">
          {title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <Button
          onClick={onPlay}
          disabled={locked}
          className="w-full gap-2"
          variant={locked ? "secondary" : "default"}
        >
          <Play className="h-4 w-4" />
          {locked ? "Unlock" : "Play Now"}
        </Button>
      </div>
    </motion.div>
  );
}
