import mongoose from "mongoose";

/**
 * ======================================
 * PACKAGE MODEL
 * ======================================
 * Services = FIXED ENUM (string array)
 * ❌ No Service collection dependency
 */

const packageSchema = new mongoose.Schema(
  {
    // 📦 Package Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 📝 Description
    description: {
      type: String,
      default: "",
    },

    // ✂️ Included Services (STATIC)
    services: {
      type: [String],
      required: true,
    },

    // 🖼️ Package Image
    image: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    // 💰 Price (optional)
    // null => Price on Request
    price: {
      type: Number,
      default: null,
    },

    // ✅ Enable / Disable
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Package", packageSchema);
