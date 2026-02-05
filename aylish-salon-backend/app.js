import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./routes/admin.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import packageRoutes from "./routes/package.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import settingsRoutes from "./routes/settings.routes.js";

const app = express();

// ===============================
// PATH SETUP (IMPORTANT FOR STATIC)
// ===============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// MIDDLEWARES
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===============================
// STATIC FILES (🔥 THIS FIXES IMAGE ISSUE)
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// ROUTES
// ===============================
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", settingsRoutes);

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AYlish Salon Backend is running 🚀",
  });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
