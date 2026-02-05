import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  togglePackageStatus,
} from "../controllers/packages/package.controller.js";

import { protectAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * =========================================
 * CUSTOMER + ADMIN (READ ONLY)
 * =========================================
 */

// 📦 Get all packages
// GET /api/packages
router.get("/", getAllPackages);

/**
 * =========================================
 * ADMIN ONLY ROUTES
 * =========================================
 */

// ➕ Create package
// POST /api/packages
router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  createPackage
);

// 🔍 Get package by id
// GET /api/packages/:id
router.get("/:id", protectAdmin, getPackageById);

// ✏️ Update package
// PUT /api/packages/:id
router.put(
  "/:id",
  protectAdmin,
  upload.single("image"),
  updatePackage
);

// ❌ Delete package
// DELETE /api/packages/:id
router.delete("/:id", protectAdmin, deletePackage);

// 🔁 Toggle active / inactive
// PATCH /api/packages/:id/toggle
router.patch("/:id/toggle", protectAdmin, togglePackageStatus);

export default router;
