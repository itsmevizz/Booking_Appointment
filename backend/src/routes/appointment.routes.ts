import express from "express";
import {
  bookAppointment,
  getAppointmentsByDate,
} from "../controllers/appointment.controller";

const router = express.Router();

router.get("/:date", getAppointmentsByDate);
router.post("/", bookAppointment);

export default router;
