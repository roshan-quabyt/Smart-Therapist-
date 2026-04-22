export interface Booking {
  id: string;
  userId: string | null;
  therapistId: number;
  therapistName: string;
  bookingDate: string;
  bookingTime: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

const STORAGE_KEY = "therasmart_bookings";

export const getBookings = (): Booking[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const getUpcomingBookings = (userId: string | null = null): Booking[] => {
  const bookings = getBookings();
  const now = new Date();
  
  return bookings
    .filter((b) => {
      // If user is passed, filter by it. Otherwise show all local bookings (since we mock auth sometimes)
      const userMatch = userId ? b.userId === userId : true;
      const statusMatch = b.status === "scheduled";
      // Ensure date is in the future or today
      const bookingDateTime = new Date(`${b.bookingDate}T${b.bookingTime}`);
      return userMatch && statusMatch && bookingDateTime >= now;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.bookingDate}T${a.bookingTime}`).getTime();
      const dateB = new Date(`${b.bookingDate}T${b.bookingTime}`).getTime();
      return dateA - dateB;
    });
};

export const createBooking = async (
  userId: string | null,
  therapistId: number,
  therapistName: string,
  date: Date,
  time: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const bookings = getBookings();
    
    // Check for double booking (same therapist, date, time)
    const formattedDate = date.toISOString().split("T")[0];
    const isConflict = bookings.some(
      (b) =>
        b.therapistId === therapistId &&
        b.bookingDate === formattedDate &&
        b.bookingTime === time &&
        b.status === "scheduled"
    );

    if (isConflict) {
      return { success: false, error: "This time slot is already booked." };
    }

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      therapistId,
      therapistName,
      bookingDate: formattedDate,
      bookingTime: time,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create booking" };
  }
};
