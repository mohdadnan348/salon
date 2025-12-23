import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  changeServiceStatus,
  deleteService,
} from "../controllers/service.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

/**
 * =========================
 * PUBLIC ROUTES (Customer)
 * =========================
 */

// Get all active services (Dropdown, listing)
router.get("/", getAllServices);

// Get single service
router.get("/:id", getServiceById);

/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */

// Create new service
router.post("/", protect, adminOnly, createService);

// Update service
router.put("/:id", protect, adminOnly, updateService);

// Enable / Disable service
router.patch("/:id/status", protect, adminOnly, changeServiceStatus);

// Delete service
router.delete("/:id", protect, adminOnly, deleteService);

export default router;
