import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { createBooking } from "@/services/bookingService";
import { useAuth } from "@/contexts/AuthContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapistId: number;
  therapistName: string;
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

export function BookingModal({
  isOpen,
  onClose,
  therapistId,
  therapistName,
}: BookingModalProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBook = async () => {
    if (!date || !time) return;

    setIsSubmitting(true);
    const response = await createBooking(
      user?.id || null, // Allow unauthenticated trial bookings
      therapistId,
      therapistName,
      date,
      time
    );
    setIsSubmitting(false);

    if (response.success) {
      toast({
        title: "Session Booked! 🎉",
        description: `Your session with ${therapistName} is scheduled for ${format(date, "PPP")} at ${time}.`,
      });
      // Optionally trigger a custom event so the dashboard can refresh
      window.dispatchEvent(new Event("booking-updated"));
      onClose();
    } else {
      toast({
        title: "Booking Failed",
        description: response.error || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>
            Schedule a practice session with {therapistName}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Select Time</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setTime(slot)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleBook} disabled={!date || !time || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
