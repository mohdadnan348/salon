import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import packageRoutes from "./routes/package.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Load env variables
dotenv.config();

// DB Connection
connectDB();

// Initialize app
const app = express();

/**
 * ======================
 * MIDDLEWARES
 * ======================
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * ======================
 * ROUTES
 * ======================
 */
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/admin", adminRoutes);

/**
 * ======================
 * HEALTH CHECK
 * ======================
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Salon Appointment API is running 🚀",
  });
});

/**
 * ======================
 * 404 HANDLER
 * ======================
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default app;
