import { Request, Response } from "express";
import Appointment from "../models/appointment.model";
import User from "../models/user.model";

// Available time slots
const AVAILABLE_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// Get available slots for a specific date
export const getAppointmentsByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    // Fetch appointments for the given date
    const appointments = await Appointment.find({ date }).populate(
      "user",
      "name phone"
    );

    // Extract booked slots
    const bookedSlots = appointments.map((appointment) => appointment.timeSlot);

    // Map all slots and mark booked ones as unavailable
    const slots = AVAILABLE_SLOTS.map((slot) => ({
      timeSlot: slot,
      unavailable: bookedSlots.includes(slot), // Mark as unavailable if already booked
    }));

    res.json({ slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Book an appointment
export const bookAppointment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, phone, date, timeSlot } = req.body;

    if (!name || !phone || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user exists, otherwise create a new user
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ name, phone });
      await user.save();
    }

    // Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({ date, timeSlot });

    if (existingAppointment) {
      return res.status(400).json({ message: "This slot is already booked." });
    }

    // Create the appointment
    const appointment = new Appointment({ user: user._id, date, timeSlot });
    await appointment.save();

    return res
      .status(201)
      .json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
