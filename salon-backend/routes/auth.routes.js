import express from "express";
import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Private route
router.get("/me", protect, getProfile);

export default router;
