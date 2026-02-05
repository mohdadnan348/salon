import Service from "../../models/Service.model.js";

/**
 * =================================================
 * GET ALL SERVICES (READ ONLY)
 * GET /api/services
 * =================================================
 * Used for:
 * - Package creation (checkbox / dropdown)
 * - Appointment booking
 */
export const getAllServices = async (req, res) => {
  try {
    const { category } = req.query;

    // optional category filter
    const filter = {
      isActive: true,
    };

    if (category) {
      filter.category = category;
    }

    const services = await Service.find(filter)
      .sort({ name: 1 }); // alphabetical

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

/**
 * =================================================
 * GET SERVICE BY ID (OPTIONAL)
 * GET /api/services/:id
 * =================================================
 * Mostly not needed, but safe to keep
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get Service Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};
