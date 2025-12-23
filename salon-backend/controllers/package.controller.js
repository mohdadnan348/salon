import Package from "../models/Package.model.js";
import Service from "../models/Service.model.js";

/**
 * @desc    Create new package (Admin)
 * @route   POST /api/packages
 * @access  Private (Admin)
 */
export const createPackage = async (req, res) => {
  try {
    const {
      name,
      category,
      servicesIncluded,
      price,
      duration,
      image,
    } = req.body;

    if (
      !name ||
      !category ||
      !servicesIncluded ||
      servicesIncluded.length === 0 ||
      !price ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Validate services
    const validServices = await Service.find({
      _id: { $in: servicesIncluded },
      status: "ACTIVE",
    });

    if (validServices.length !== servicesIncluded.length) {
      return res.status(400).json({
        success: false,
        message: "One or more services are invalid or inactive",
      });
    }

    const pkg = await Package.create({
      name,
      category,
      servicesIncluded,
      price,
      duration,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all active packages (Customer)
 * @route   GET /api/packages
 * @access  Public
 */
export const getAllPackages = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { status: "ACTIVE" };
    if (category) filter.category = category;

    const packages = await Package.find(filter)
      .populate("servicesIncluded")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      packages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single package by ID
 * @route   GET /api/packages/:id
 * @access  Public
 */
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).populate(
      "servicesIncluded"
    );

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update package (Admin)
 * @route   PUT /api/packages/:id
 * @access  Private (Admin)
 */
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Enable / Disable package (Admin)
 * @route   PATCH /api/packages/:id/status
 * @access  Private (Admin)
 */
export const changePackageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      message: `Package ${status.toLowerCase()} successfully`,
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete package (Admin)
 * @route   DELETE /api/packages/:id
 * @access  Private (Admin)
 */
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
