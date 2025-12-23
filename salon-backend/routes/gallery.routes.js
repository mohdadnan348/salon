import express from "express";
import {
  uploadImage,
  getGalleryImages,
  deleteImage,
} from "../controllers/gallery.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * ======================
 * PUBLIC ROUTE (Customer)
 * ======================
 */

// Get all gallery images (optionally by category)
router.get("/", getGalleryImages);

/**
 * ======================
 * ADMIN ROUTES
 * ======================
 */

// Upload image to gallery
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  uploadImage
);

// Delete image
router.delete("/:id", protect, adminOnly, deleteImage);

export default router;
