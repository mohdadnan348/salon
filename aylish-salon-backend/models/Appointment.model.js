import mongoose from "mongoose";

/**
 * ======================================
 * APPOINTMENT MODEL
 * ======================================
 * Services = FIXED ENUM (string array)
 * ❌ No Service collection dependency
 */

const appointmentSchema = new mongoose.Schema(
  {
    // 🔢 Booking ID
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    // 👤 Customer Info
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      mobile: {
        type: String,
        required: true,
        trim: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
    },

    // ✂️ Selected Services (STATIC)
    services: {
      type: [String],
      required: true,
    },

    // 🎁 Package (optional – DB based)
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null,
    },

    // 📅 Date & Time
    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
    },

    // 📝 Notes
    notes: {
      type: String,
      default: "",
    },

    // 🖼️ Reference Images
    referenceImages: [
      {
        url: String,
        publicId: String,
      },
    ],

    // 📊 Status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", appointmentSchema);
