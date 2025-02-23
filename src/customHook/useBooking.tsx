import { useState, useEffect } from "react";

interface Booking {
  id: string;
  name: string;
  gender: string;
  timestamp: Date;
}

const TOTAL_SLOTS: number = import.meta.env.VITE_APP_TOTAL_SLOTS || 2;

export default function useBooking() {
  const [availableSlots, setAvailableSlots] = useState(TOTAL_SLOTS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitingList, setWaitingList] = useState<Booking[]>([]);

  useEffect(() => {}, []);

  const bookSlot = (name: string, gender: string) => {
    if (availableSlots > 0) {
      const newBooking: Booking = {
        id: crypto.randomUUID(),
        name,
        gender,
        timestamp: new Date(),
      };
      setBookings([...bookings, newBooking]);
      setAvailableSlots(availableSlots - 1);
    }
  };
  const cancelBooking = (id: string) => {
    setBookings(bookings.filter((person) => person.id !== id));

    setAvailableSlots(availableSlots + 1);
    console.log(bookings);
  };

  const joinWaitingList = (name: string, gender: string) => {
    if (availableSlots == 0) {
      const newBooking: Booking = {
        id: crypto.randomUUID(),
        name,
        gender,
        timestamp: new Date(),
      };
      setWaitingList([...waitingList, newBooking]);
    }
  };

  const reset = () => {
    setBookings([]);
    setWaitingList([]);
    setAvailableSlots(TOTAL_SLOTS);
  };
  return {
    availableSlots,
    bookings,
    bookSlot,
    cancelBooking,
    waitingList,
    joinWaitingList,
    reset,
  };
}
