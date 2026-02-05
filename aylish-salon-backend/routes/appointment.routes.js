import express from "express";
import {
  createAppointment,
  getAllAppointments,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
} from "../controllers/appointments/appointment.controller.js";

import { protectAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * =========================================
 * CUSTOMER ROUTES
 * =========================================
 */

// 📅 Create Appointment
// POST /api/appointments
router.post(
  "/",
  upload.array("referenceImages", 5),
  createAppointment
);

/**
 * =========================================
 * ADMIN ROUTES (PROTECTED)
 * =========================================
 */

// 📋 Get all appointments
// GET /api/appointments
router.get("/", protectAdmin, getAllAppointments);

// ✅ Confirm appointment
// PUT /api/appointments/:id/confirm
router.put("/:id/confirm", protectAdmin, confirmAppointment);

// ✔ Complete appointment
// PUT /api/appointments/:id/complete
router.put("/:id/complete", protectAdmin, completeAppointment);

// ❌ Cancel appointment
// PUT /api/appointments/:id/cancel
router.put("/:id/cancel", protectAdmin, cancelAppointment);

export default router;
