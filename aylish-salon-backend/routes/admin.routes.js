import express from "express";
import {
  adminLogin,
  createAdmin,
} from "../controllers/admin/adminAuth.controller.js";

const router = express.Router();

// One time only (remove after setup)
router.post("/create", createAdmin);

// Login
router.post("/login", adminLogin);

export default router;
