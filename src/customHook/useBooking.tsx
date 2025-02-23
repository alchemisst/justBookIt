import { useState, useEffect } from "react";

interface Booking {
  id: string;
  name: string;
  gender: string;
  timestamp: Date;
}

const TOTAL_SLOTS: number =
  parseInt(import.meta.env.VITE_APP_TOTAL_SLOTS, 10) || 5;

export default function useBooking() {
  const [availableSlots, setAvailableSlots] = useState(TOTAL_SLOTS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitingList, setWaitingList] = useState<Booking[]>([]);

  useEffect(() => {
    const getAvailableSlots = parseInt(
      localStorage.getItem("availableSlots") || "0",
      10
    );

    const getBookings = localStorage.getItem("bookings");
    const getWaitingList = localStorage.getItem("waitingList");
    if (getAvailableSlots) setAvailableSlots(getAvailableSlots);
    if (getBookings) setBookings(JSON.parse(getBookings));
    if (getWaitingList) setWaitingList(JSON.parse(getWaitingList));
  }, []);

  useEffect(() => {
    localStorage.setItem("availableSlots", availableSlots.toString());
    console.log(availableSlots);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("waitingList", JSON.stringify(waitingList));
  }, [availableSlots, bookings, waitingList]);

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
    setBookings((prevBookings) => {
      const updated = prevBookings.filter((person) => person.id !== id);

      if (waitingList.length > 0) {
        const waitingLine = waitingList[0];
        setWaitingList(waitingList.filter((person) => person !== waitingLine));
        return [...updated, waitingLine];
      } else {
        setAvailableSlots(availableSlots + 1);
        return updated;
      }
    });
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
    localStorage.clear();
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
