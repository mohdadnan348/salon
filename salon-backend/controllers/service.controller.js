import Service from "../models/Service.model.js";

/**
 * @desc    Create new service (Admin)
 * @route   POST /api/services
 * @access  Private (Admin)
 */
export const createService = async (req, res) => {
  try {
    const { name, category, price, duration, image } = req.body;

    if (!name || !category || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const existingService = await Service.findOne({ name });

    if (existingService) {
      return res.status(400).json({
        success: false,
        message: "Service already exists",
      });
    }

    const service = await Service.create({
      name,
      category,
      price,
      duration,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all active services (Customer dropdown)
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "ACTIVE" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single service by ID
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update service (Admin)
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Enable / Disable service (Admin)
 * @route   PATCH /api/services/:id/status
 * @access  Private (Admin)
 */
export const changeServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: `Service ${status.toLowerCase()} successfully`,
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete service permanently (Admin)
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
