import express from "express";
import SERVICES from "../constants/services.constant.js";

const router = express.Router();

/**
 * GET /api/services
 * GET /api/services?category=Hair Services
 */
router.get("/", (req, res) => {
  const { category } = req.query;
  const data = category
    ? SERVICES.filter(s => s.category === category)
    : SERVICES;

  res.json({ success: true, data });
});

export default router;
