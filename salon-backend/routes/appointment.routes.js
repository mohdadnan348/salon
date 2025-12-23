import express from "express";
import {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

/**
 * ======================
 * CUSTOMER ROUTES
 * ======================
 */

// Book appointment
router.post("/", protect, createAppointment);

// My appointments
router.get("/my", protect, getMyAppointments);

// Cancel appointment
router.patch("/:id/cancel", protect, cancelAppointment);

/**
 * ======================
 * ADMIN ROUTES
 * ======================
 */

// All appointments
router.get("/", protect, adminOnly, getAllAppointments);

// Update appointment status
router.patch("/:id/status", protect, adminOnly, updateAppointmentStatus);

export default router;
