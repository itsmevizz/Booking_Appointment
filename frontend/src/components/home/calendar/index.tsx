import React from "react";
import CalendarView from "./calendar";
import useBookingStore from "@/store/useBookingStore";

const Calendar: React.FC = () => {
  const { setSelectedDate } = useBookingStore();

  return <CalendarView onDateSelect={(date) => setSelectedDate(date)} />;
};

export default Calendar;
