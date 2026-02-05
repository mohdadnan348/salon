import Appointment from "../../models/Appointment.model.js";
import { sendWhatsAppMessage } from "../../utils/sendWhatsApp.js";

/**
 * =================================================
 * CREATE APPOINTMENT (CUSTOMER)
 * =================================================
 * services = STRING ARRAY (ENUM based)
 */
export const createAppointment = async (req, res) => {
  try {
    const {
      name,
      mobile,
      gender,
      services,
      packageId,
      preferredDate,
      preferredTime,
      notes,
    } = req.body;

    // 🔴 Basic validation
    if (
      !name ||
      !mobile ||
      !gender ||
      !services ||
      !preferredDate ||
      !preferredTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // 🔁 services ensure array
    const selectedServices = Array.isArray(services)
      ? services
      : [services];

    if (selectedServices.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one service is required",
      });
    }

    // 🖼️ Reference images
    const referenceImages = req.files
      ? req.files.map((file) => ({
          url: file.path,
          publicId: file.filename,
        }))
      : [];

    const bookingId = "AY-" + Date.now();

    await Appointment.create({
      bookingId,
      customer: {
        name,
        mobile,
        gender,
      },
      services: selectedServices,
      package: packageId || null,
      preferredDate,
      preferredTime,
      notes,
      referenceImages,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};

/**
 * =================================================
 * GET ALL APPOINTMENTS (ADMIN)
 * =================================================
 */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("package") // ✅ only package is DB-based
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
};

/**
 * =================================================
 * CONFIRM APPOINTMENT
 * =================================================
 */
export const confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Confirmed";
    await appointment.save();

    await sendWhatsAppMessage(
      appointment.customer.mobile,
      `✅ Your appointment (${appointment.bookingId}) is CONFIRMED`
    );

    res.json({
      success: true,
      message: "Appointment confirmed",
    });
  } catch (error) {
    console.error("Confirm Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: "Confirm failed",
    });
  }
};

/**
 * =================================================
 * COMPLETE APPOINTMENT
 * =================================================
 */
export const completeAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, {
      status: "Completed",
    });

    res.json({
      success: true,
      message: "Appointment completed",
    });
  } catch (error) {
    console.error("Complete Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: "Complete failed",
    });
  }
};

/**
 * =================================================
 * CANCEL APPOINTMENT
 * =================================================
 */
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    await sendWhatsAppMessage(
      appointment.customer.mobile,
      `❌ Your appointment (${appointment.bookingId}) is CANCELLED`
    );

    res.json({
      success: true,
      message: "Appointment cancelled",
    });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: "Cancel failed",
    });
  }
};
