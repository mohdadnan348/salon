import express from "express";
import {
  createGalleryImage,
  getGalleryImages,
  toggleGalleryStatus,
  deleteGalleryImage,
} from "../controllers/gallery/gallery.controller.js";

import upload from "../middlewares/upload.middleware.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * =====================================
 * CREATE GALLERY IMAGE (ADMIN)
 * POST /api/gallery
 * FormData: image, title?
 * =====================================
 */
router.post(
  "/",
  protectAdmin,
  upload.single("image"), // 🔥 multer first
  createGalleryImage
);

/**
 * =====================================
 * GET ALL GALLERY IMAGES (PUBLIC)
 * GET /api/gallery
 * =====================================
 */
router.get("/", getGalleryImages);

/**
 * =====================================
 * TOGGLE ACTIVE / INACTIVE (ADMIN)
 * PATCH /api/gallery/:id/toggle
 * =====================================
 */
router.patch(
  "/:id/toggle",
  protectAdmin,
  toggleGalleryStatus
);

/**
 * =====================================
 * DELETE GALLERY IMAGE (ADMIN)
 * DELETE /api/gallery/:id
 * =====================================
 */
router.delete(
  "/:id",
  protectAdmin,
  deleteGalleryImage
);

export default router;
