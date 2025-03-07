import apiClient from "@/libs/axiosInstance";

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response;
};

export const getAvailableSlots = async (date: string) => {
  try {
    const response = await apiClient.get(`/${date}`);
    return response.data.slots;
  } catch (error) {
    console.error("Error fetching slots:", error);
    return [];
  }
};

export const bookAppointment = async (
  name: string,
  phone: string,
  date: string,
  timeSlot: string
) => {
  try {
    const response = await apiClient.post("/", { name, phone, date, timeSlot });

    return response;
  } catch (error) {
    console.error("Booking Error:", error);
    throw error;
  }
};
