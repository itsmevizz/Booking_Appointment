"use client";
import React, { useEffect, useState } from "react";
import useBookingStore from "@/store/useBookingStore";
import dayjs from "dayjs";
import { bookAppointment } from "@/services/api";
import { showErrorToast, showSuccessToast } from "@/hooks/useToast";

const TimeSlots: React.FC = () => {
  const {
    selectedDate,
    availableSlots,
    selectedSlots,
    phone,
    username,
    setSelectedSlots,
    resetSelectedSlots,
    fetchSlots,
  } = useBookingStore();
  const [confirmingSlot, setConfirmingSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false); // New state for booking API call

  const handleSlotClick = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      return; // Prevent reselection of an already booked slot
    }
    setConfirmingSlot(slot === confirmingSlot ? null : slot);
  };

  const handleConfirm = async () => {
    if (!confirmingSlot) return;

    try {
      setBookingLoading(true); // Start loading
      await bookAppointment(
        username,
        phone,
        selectedDate as string,
        confirmingSlot
      );
      setSelectedSlots(confirmingSlot);
      showSuccessToast(`Slot booked: ${confirmingSlot}`);
      setConfirmingSlot(null); // Reset confirmation button
    } catch {
      showErrorToast("Failed to book appointment. Please try again.");
    } finally {
      setBookingLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const loadSlots = async () => {
      resetSelectedSlots();
      setConfirmingSlot("");
      setLoading(true);
      await fetchSlots(selectedDate as string);
      setLoading(false);
    };

    loadSlots();
  }, [selectedDate, fetchSlots]);

  return (
    <div className="p-4 w-80 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        {dayjs(selectedDate).format("dddd, MMMM D")}
      </h2>
      <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto">
        {loading ? (
          // Skeleton loading placeholders
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 min-h-12  bg-gray-200 rounded animate-pulse"
            ></div>
          ))
        ) : availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <div key={slot.timeSlot} className="flex gap-3 duration-300">
              <div
                className={`p-2 pb-4 pt-4 border border-blue-400 text-blue-500 font-semibold rounded w-full text-center cursor-pointer ${
                  selectedSlots.includes(slot.timeSlot) || slot.unavailable
                    ? "bg-gray-200 border-gray-100 text-white"
                    : "hover:bg-blue-100"
                }`}
                onClick={() =>
                  !slot.unavailable && handleSlotClick(slot.timeSlot)
                }
              >
                <span>{slot.timeSlot}</span>
              </div>
              {confirmingSlot === slot.timeSlot && (
                <div className="w-full">
                  <button
                    onClick={handleConfirm}
                    className="bg-blue-500 font-semibold text-white px-2 py-1 w-full h-full rounded text-sm hover:bg-blue-600"
                  >
                    {bookingLoading ? "Please Wait" : "Confirm"}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No slots available</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlots;
