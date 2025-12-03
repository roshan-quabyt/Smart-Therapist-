import { motion } from "framer-motion";
import { Star, Calendar, MessageCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TherapistCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  fee: string;
  image: string;
  available: boolean;
  delay?: number;
}

export function TherapistCard({
  name,
  specialty,
  rating,
  reviews,
  experience,
  fee,
  image,
  available,
  delay = 0,
}: TherapistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-lg"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-secondary">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          {available && (
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-card bg-success" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {name}
              </h3>
              <p className="text-sm text-primary">{specialty}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-warning/10 px-2 py-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-semibold text-foreground">
                {rating}
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              {experience}
            </span>
            <span>•</span>
            <span>{reviews} reviews</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Consultation fee</p>
          <p className="font-display text-lg font-bold text-foreground">
            {fee}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <MessageCircle className="h-4 w-4" />
            Chat
          </Button>
          <Button size="sm" className="gap-1.5">
            <Calendar className="h-4 w-4" />
            Book
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
