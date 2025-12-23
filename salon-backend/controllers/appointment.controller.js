import Appointment from "../models/Appointment.model.js";

/**
 * @desc    Create appointment (Service / Package)
 * @route   POST /api/appointments
 * @access  Private (Customer)
 */
export const createAppointment = async (req, res) => {
  try {
    const {
      bookingType,
      serviceId,
      packageId,
      date,
      timeSlot,
    } = req.body;

    if (!bookingType || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Booking type, date and time slot are required",
      });
    }

    if (
      bookingType === "SERVICE" && !serviceId ||
      bookingType === "PACKAGE" && !packageId
    ) {
      return res.status(400).json({
        success: false,
        message: "Service or Package is required",
      });
    }

    // 🔴 Slot availability check
    const slotBooked = await Appointment.findOne({
      date,
      timeSlot,
      status: { $in: ["PENDING", "CONFIRMED"] },
    });

    if (slotBooked) {
      return res.status(400).json({
        success: false,
        message: "Selected slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      customerId: req.user.id,
      bookingType,
      serviceId: bookingType === "SERVICE" ? serviceId : null,
      packageId: bookingType === "PACKAGE" ? packageId : null,
      date,
      timeSlot,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get logged-in customer's appointments
 * @route   GET /api/appointments/my
 * @access  Private (Customer)
 */
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      customerId: req.user.id,
    })
      .populate("serviceId")
      .populate("packageId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Cancel appointment (Customer)
 * @route   PATCH /api/appointments/:id/cancel
 * @access  Private (Customer)
 */
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        customerId: req.user.id,
      },
      { status: "CANCELLED" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ===========================
 * ADMIN CONTROLLERS
 * ===========================
 */

/**
 * @desc    Get all appointments (Admin)
 * @route   GET /api/appointments
 * @access  Private (Admin)
 */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("customerId", "name phone")
      .populate("serviceId")
      .populate("packageId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update appointment status (Admin)
 * @route   PATCH /api/appointments/:id/status
 * @access  Private (Admin)
 */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
