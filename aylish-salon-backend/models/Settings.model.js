import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    salonName: {
      type: String,
      default: "AYlish Salon",
      trim: true,
    },

    logo: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    address: {
      type: String,
      default: "",
    },

    contactNumber: {
      type: String,
      default: "",
    },

    whatsappNumber: {
      type: String,
      default: "",
    },

    openingTime: {
      type: String,
      default: "10:00 AM",
    },

    closingTime: {
      type: String,
      default: "08:00 PM",
    },

    weeklyOff: {
      type: String,
      default: "Monday",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
