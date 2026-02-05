import Package from "../../models/Package.model.js";

/**
 * =================================================
 * CREATE PACKAGE (ADMIN)
 * =================================================
 * services = STRING ARRAY (ENUM based)
 */
export const createPackage = async (req, res) => {
  try {
    const { name, description, price, isActive } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Package name is required",
      });
    }

    // 🔁 services fix (FormData + JSON)
    let services = req.body["services[]"] || req.body.services;

    if (!services) {
      return res.status(400).json({
        success: false,
        message: "At least one service is required",
      });
    }

    if (!Array.isArray(services)) {
      services = [services];
    }

    if (services.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one service is required",
      });
    }

    // 🖼️ Image (optional)
    let image = { url: "", publicId: "" };

    if (req.file) {
      image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const newPackage = await Package.create({
      name,
      description: description || "",
      services,
      price: price ?? null,
      image,
      isActive: isActive ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error) {
    console.error("Create Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create package",
    });
  }
};

/**
 * =================================================
 * GET ALL PACKAGES (CUSTOMER / ADMIN)
 * =================================================
 */
export const getAllPackages = async (req, res) => {
  try {
    const { activeOnly } = req.query;

    const filter =
      activeOnly === "true" ? { isActive: true } : {};

    const packages = await Package.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error("Get Packages Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
    });
  }
};

/**
 * =================================================
 * GET PACKAGE BY ID (ADMIN)
 * =================================================
 */
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    console.error("Get Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch package",
    });
  }
};

/**
 * =================================================
 * UPDATE PACKAGE (ADMIN)
 * =================================================
 */
export const updatePackage = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // 🔁 services[] fix
    if (req.body["services[]"] || req.body.services) {
      let services =
        req.body["services[]"] || req.body.services;

      if (!Array.isArray(services)) {
        services = [services];
      }

      updateData.services = services;
    }

    // 🖼️ Image update
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    console.error("Update Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update package",
    });
  }
};

/**
 * =================================================
 * DELETE PACKAGE (ADMIN)
 * =================================================
 */
export const deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
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
    console.error("Delete Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete package",
    });
  }
};

/**
 * =================================================
 * TOGGLE PACKAGE ACTIVE / INACTIVE
 * =================================================
 */
export const togglePackageStatus = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    pkg.isActive = !pkg.isActive;
    await pkg.save();

    res.json({
      success: true,
      message: `Package ${
        pkg.isActive ? "activated" : "deactivated"
      }`,
      data: pkg,
    });
  } catch (error) {
    console.error("Toggle Package Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle package status",
    });
  }
};
