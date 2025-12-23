import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Service from "../models/Service.model.js";
import Package from "../models/Package.model.js";
import Appointment from "../models/Appointment.model.js";



/**
 * =========================
 * CREATE ADMIN (ONE TIME)
 * =========================
 *
 * @desc    Create first admin
 * @route   POST /api/admin/create-admin
 * @access  Public (TEMP - remove later)
 */
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ role: "ADMIN" });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Check email duplicate
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * =========================
 * ADMIN DASHBOARD
 * =========================
 */

/**
 * @desc    Admin dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin)
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({
      role: "CUSTOMER",
    });

    const totalServices = await Service.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const pendingAppointments = await Appointment.countDocuments({
      status: "PENDING",
    });

    const confirmedAppointments = await Appointment.countDocuments({
      status: "CONFIRMED",
    });

    res.json({
      success: true,
      stats: {
        totalCustomers,
        totalServices,
        totalPackages,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =========================
 * USER MANAGEMENT
 * =========================
 */

/**
 * @desc    Get all customers
 * @route   GET /api/admin/customers
 * @access  Private (Admin)
 */
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "CUSTOMER" }).select(
      "-password"
    );

    res.json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Enable / Disable customer
 * @route   PATCH /api/admin/customers/:id/status
 * @access  Private (Admin)
 */
export const changeCustomerStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const customer = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer status updated",
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =========================
 * APPOINTMENT MANAGEMENT
 * =========================
 */

/**
 * @desc    Get all appointments
 * @route   GET /api/admin/appointments
 * @access  Private (Admin)
 */
export const getAllAppointmentsAdmin = async (req, res) => {
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
 * @desc    Approve / Reject appointment
 * @route   PATCH /api/admin/appointments/:id
 * @access  Private (Admin)
 */
export const updateAppointmentByAdmin = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["CONFIRMED", "CANCELLED", "COMPLETED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
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
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
