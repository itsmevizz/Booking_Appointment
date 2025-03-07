import { getAvailableSlots } from "@/services/api";
import dayjs from "dayjs";
import { create } from "zustand";

type Slots = {
  timeSlot: string;
  unavailable: boolean;
};

interface BookingState {
  username: string;
  phone: string;
  selectedDate: string | null;
  availableSlots: Slots[];
  selectedSlots: string[];
  isShowSlots: boolean;

  setUsername: (name: string) => void;
  setPhone: (phone: string) => void;
  setSelectedDate: (date: string) => void;
  setAvailableSlots: (slots: Slots[]) => void;
  setSelectedSlots: (slot: string) => void;
  setShowSlots: (show: boolean) => void;
  fetchSlots: (date: string) => Promise<void>;
  resetSelectedSlots: () => void;
}

const useBookingStore = create<BookingState>((set) => ({
  username: "",
  phone: "",
  selectedDate: dayjs().format("YYYY-MM-DD"),
  availableSlots: [],
  selectedSlots: [],
  isShowSlots: false,

  setUsername: (name) => set({ username: name }),
  setPhone: (phone) => set({ phone }),
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
  setAvailableSlots: (slots) => set({ availableSlots: slots }),
  setSelectedSlots: (slot) =>
    set((state) => ({
      selectedSlots: state.selectedSlots.includes(slot)
        ? state.selectedSlots // Prevent duplicate selection
        : [...state.selectedSlots, slot],
    })),
  setShowSlots: (show) => set({ isShowSlots: show }),
  fetchSlots: async (date) => {
    const slots = await getAvailableSlots(date);
    set({ availableSlots: slots });
  },
  resetSelectedSlots: () =>
    set({
      selectedSlots: [],
    }),
}));

export default useBookingStore;
