import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "HAIR",
        "MAKEUP",
        "FACIAL",
        "SPA",
        "GROOMING",
        "NAIL",
      ],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // minutes
      required: true,
    },

    image: {
      url: String,
      public_id: String,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
