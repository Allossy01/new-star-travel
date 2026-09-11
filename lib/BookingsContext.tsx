'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sampleBookings, type Booking } from './data';

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const BookingsContext = createContext<BookingsContextType | null>(null);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nst_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookings(parsed.length > 0 ? parsed : sampleBookings);
      } else {
        setBookings(sampleBookings);
      }
    } catch {
      setBookings(sampleBookings);
    }
  }, []);

  const save = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem('nst_bookings', JSON.stringify(updated));
  };

  const addBooking = (booking: Booking) => {
    save([booking, ...bookings]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    save(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, updateBookingStatus }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error('useBookings must be used inside BookingsProvider');
  return ctx;
}
