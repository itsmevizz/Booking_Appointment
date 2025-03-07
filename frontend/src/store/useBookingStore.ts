import { getAvailableSlots } from "@/services/api";
import dayjs from "dayjs";
import { create } from "zustand";

interface BookingState {
  username: string;
  phone: string;
  selectedDate: string | null;
  availableSlots: string[];
  selectedSlot: string | null;
  isShowSlots: boolean;

  setUsername: (name: string) => void;
  setPhone: (phone: string) => void;
  setSelectedDate: (date: string) => void;
  setAvailableSlots: (slots: string[]) => void;
  setSelectedSlot: (slot: string) => void;
  setShowSlots: (show: boolean) => void;
  fetchSlots: (date: string) => Promise<void>;
  resetBooking: () => void;
}

const useBookingStore = create<BookingState>((set) => ({
  username: "",
  phone: "",
  selectedDate: dayjs().format("YYYY-MM-DD"),
  availableSlots: [],
  selectedSlot: null,
  isShowSlots: false,

  setUsername: (name) => set({ username: name }),
  setPhone: (phone) => set({ phone }),
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
  setAvailableSlots: (slots) => set({ availableSlots: slots }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setShowSlots: (show) => set({ isShowSlots: show }),
  fetchSlots: async (date) => {
    const slots = await getAvailableSlots(date);
    set({ availableSlots: slots });
  },
  resetBooking: () =>
    set({
      username: "",
      phone: "",
      selectedDate: null,
      availableSlots: [],
      selectedSlot: null,
      isShowSlots: false,
    }),
}));

export default useBookingStore;
