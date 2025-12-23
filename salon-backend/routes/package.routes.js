import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  changePackageStatus,
  deletePackage,
} from "../controllers/package.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

/**
 * ======================
 * PUBLIC ROUTES
 * ======================
 */

// Get all packages (Bridal / Groom / Party)
router.get("/", getAllPackages);

// Get single package
router.get("/:id", getPackageById);

/**
 * ======================
 * ADMIN ROUTES
 * ======================
 */

// Create package
router.post("/", protect, adminOnly, createPackage);

// Update package
router.put("/:id", protect, adminOnly, updatePackage);

// Enable / Disable package
router.patch("/:id/status", protect, adminOnly, changePackageStatus);

// Delete package
router.delete("/:id", protect, adminOnly, deletePackage);

export default router;
