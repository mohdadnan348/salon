import mongoose from "mongoose";

/**
 * ENUMS
 */
import SERVICE_ENUM from "../enums/service.enum.js";
import CATEGORY_ENUM from "../enums/category.enum.js";
import GENDER_ENUM from "../enums/gender.enum.js";

/**
 * SERVICE MODEL
 * - Service create ENUM se hoti hai (Seeder)
 * - Admin sirf update / enable-disable karta hai
 * - Booking & Package isi model ko use karte hain
 */

const serviceSchema = new mongoose.Schema(
  {
    // 🔐 ENUM KEY (never changes)
    serviceKey: {
      type: String,
      enum: Object.values(SERVICE_ENUM),
      required: true,
      unique: true,
      immutable: true,
    },

    // 👀 UI display name
    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    // 📂 Category (HAIR / MAKEUP / SKIN etc.)
    category: {
      type: String,
      enum: Object.values(CATEGORY_ENUM),
      required: true,
    },

    // 🚻 Gender support
    genderType: {
      type: String,
      enum: Object.values(GENDER_ENUM),
      default: GENDER_ENUM.UNISEX,
    },

    // 📝 Optional description
    description: {
      type: String,
      trim: true,
    },

    // ⏱ Time in minutes
    durationInMinutes: {
      type: Number,
      required: true,
      min: 5,
    },

    // 💰 Price
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ✅ Enable / Disable service
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * INDEXES (Performance)
 */
serviceSchema.index({ category: 1 });
serviceSchema.index({ genderType: 1 });
serviceSchema.index({ isActive: 1 });

export default mongoose.model("Service", serviceSchema);
