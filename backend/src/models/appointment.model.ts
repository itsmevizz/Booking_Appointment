import mongoose, { Schema, Document } from "mongoose";

export interface Appointment extends Document {
  user: mongoose.Types.ObjectId; // Reference to User
  date: string;
  timeSlot: string;
}

const AppointmentSchema = new Schema<Appointment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
});
AppointmentSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

const Appointment = mongoose.model<Appointment>(
  "Appointment",
  AppointmentSchema
);

export default Appointment;
