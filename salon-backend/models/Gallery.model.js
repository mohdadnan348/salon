import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: String,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      enum: ["SALON", "MAKEUP", "BRIDAL", "GROOM"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
