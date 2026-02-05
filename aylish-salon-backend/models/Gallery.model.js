import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "Salon Work",
    },

    category: {
      type: String,
      required: true,
      default: "general", // 🔥 FIX: required + safe default
      enum: [
        "general",
        "hair",
        "makeup",
        "bridal",
        "skin",
        "nails",
      ],
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
