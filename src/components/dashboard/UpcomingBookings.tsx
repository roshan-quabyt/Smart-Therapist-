import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking, getUpcomingBookings } from "@/services/bookingService";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export function UpcomingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  const loadBookings = () => {
    // Pass user.id if user is logged in, else null for local guest mode
    const upcoming = getUpcomingBookings(user?.id || null);
    setBookings(upcoming);
  };

  useEffect(() => {
    loadBookings();

    // Listen for the custom event to refresh when a new booking is made
    window.addEventListener("booking-updated", loadBookings);
    return () => window.removeEventListener("booking-updated", loadBookings);
  }, [user]);

  if (bookings.length === 0) {
    return null; // Don't show the section if there are no bookings
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Upcoming Sessions
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking, index) => {
          const dateObj = new Date(`${booking.bookingDate}T00:00:00`);
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-card border border-border/50"
            >
              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
              
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {booking.therapistName}
                  </h3>
                  <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      {format(dateObj, "EEEE, MMMM do")}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {booking.bookingTime}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link to="/therapists">
                    <Button variant="outline" className="w-full gap-2">
                      <Video className="h-4 w-4" />
                      Join / Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
