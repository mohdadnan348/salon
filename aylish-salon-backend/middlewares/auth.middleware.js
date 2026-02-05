import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model.js";

/**
 * ======================================
 * ADMIN AUTH MIDDLEWARE (JWT)
 * ======================================
 * Protects admin-only routes
 */
export const protectAdmin = async (req, res, next) => {
  try {
    let token;

    // 🔐 Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Find admin
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // 🧠 Attach admin to request
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};
