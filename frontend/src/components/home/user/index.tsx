import React, { useState } from "react";
import useBookingStore from "@/store/useBookingStore";
import { showSuccessToast } from "@/hooks/useToast";

const UserInfoForm: React.FC = () => {
  const { setUsername, setPhone, setShowSlots } = useBookingStore();
  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(name);
    setPhone(phone);
    setShowSlots(true);
    showSuccessToast("User info updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4  w-80 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">User Information</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="p-2 border rounded border-blue-400 outline-none"
        required
      />

      <input
        type="number"
        value={phone}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Your Phone"
        className="p-2 border rounded border-blue-400 outline-none"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
      >
        Submit
      </button>
    </form>
  );
};

export default UserInfoForm;
