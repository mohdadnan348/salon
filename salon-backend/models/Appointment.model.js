import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["SERVICE", "PACKAGE"],
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    timeSlot: {
      type: String, // 10:00 - 11:00
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
