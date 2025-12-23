import express from "express";
import {
  getDashboardStats,
  getAllCustomers,
  changeCustomerStatus,
  getAllAppointmentsAdmin,
  updateAppointmentByAdmin,
  createAdmin, // ✅ ADD THIS
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

/**
 * =========================
 * CREATE ADMIN (ONE TIME)
 * =========================
 * ⚠️ Remove after first admin creation
 */
router.post("/create-admin", createAdmin);

// =========================
// DASHBOARD
// =========================
router.get("/dashboard", protect, adminOnly, getDashboardStats);

// =========================
// CUSTOMERS
// =========================
router.get("/customers", protect, adminOnly, getAllCustomers);

router.patch(
  "/customers/:id/status",
  protect,
  adminOnly,
  changeCustomerStatus
);

// =========================
// APPOINTMENTS
// =========================
router.get(
  "/appointments",
  protect,
  adminOnly,
  getAllAppointmentsAdmin
);

router.patch(
  "/appointments/:id",
  protect,
  adminOnly,
  updateAppointmentByAdmin
);

export default router;
