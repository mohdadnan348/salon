import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["BRIDAL", "GROOM", "PARTY"],
      required: true,
    },

    servicesIncluded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // total minutes
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

export default mongoose.model("Package", packageSchema);
