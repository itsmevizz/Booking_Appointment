import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useBookingStore from "@/store/useBookingStore";
import dayjs from "dayjs";

interface CalendarProps {
  onDateSelect: (date: string) => void; // Callback function to return selected date
}

const CalendarView: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const { selectedDate: initialDate } = useBookingStore();

  const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate);

  // Get first day and total days in the current month
  const firstDayOfMonth = currentDate.startOf("month").day(); // 0 (Sunday) - 6 (Saturday)
  const daysInMonth = currentDate.daysInMonth();

  // Move to previous month
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));

  // Move to next month
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  // Handle date selection
  const handleDateClick = (day: number) => {
    const selected = currentDate.date(day).format("YYYY-MM-DD");
    setSelectedDate(selected);
    onDateSelect(selected);
  };

  return (
    <div className="p-4  min-w-80 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <div className="space-x-3">
          <button
            onClick={prevMonth}
            className="p-1 text-gray-600 hover:bg-gray-200 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 text-gray-600 hover:bg-gray-200 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Week Days (Mon to Sun) */}
      <div className="grid grid-cols-7 text-center text-gray-600 text-sm font-semibold">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty spaces for previous month's trailing days */}
        {Array.from({ length: (firstDayOfMonth + 6) % 7 }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}

        {/* Days in Month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = currentDate.date(day);
          const dayOfWeek = date.day(); // 0 (Sunday) - 6 (Saturday)
          const dateStr = date.format("YYYY-MM-DD");
          const isSelected = selectedDate === dateStr;
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Saturday or Sunday

          return (
            <button
              key={day}
              onClick={() => !isWeekend && handleDateClick(day)}
              disabled={isWeekend}
              className={`p-2 md:w-12 md:h-12 text-sm font-medium rounded-full transition ${
                isSelected ? "bg-blue-500 text-white" : " hover:bg-gray-200"
              } ${
                isWeekend
                  ? "text-gray-400 bg-none cursor-not-allowed"
                  : "bg-blue-300/30 text-blue-500"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
