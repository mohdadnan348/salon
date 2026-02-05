import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settings/settings.controller.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Customer + Admin
router.get("/", getSettings);

// Admin only
router.put("/", protectAdmin, upload.single("logo"), updateSettings);

export default router;
