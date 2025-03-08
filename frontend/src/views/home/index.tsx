"use client";
import Calendar from "@/components/home/calendar";
import TimeSlots from "@/components/home/slots";
import UserInfoForm from "@/components/home/user";
import useBookingStore from "@/store/useBookingStore";
import React from "react";

const HomeView: React.FC = () => {
  const { isShowSlots } = useBookingStore();
  return (
    <div className="" id="booking-widget">
      <div className="flex lg:flex-row flex-col justify-center bg-white md:p-10 shadow-md max-w-5xl rounded-2xl">
        <Calendar />
        <div className="flex">
          {isShowSlots ? <TimeSlots /> : <UserInfoForm />}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
