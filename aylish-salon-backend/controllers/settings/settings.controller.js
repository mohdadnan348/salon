import Settings from "../../models/Settings.model.js";

/**
 * =================================================
 * GET SALON SETTINGS (CUSTOMER / ADMIN)
 * GET /api/settings
 * =================================================
 */
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // 🟢 First time default create
    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch salon settings",
    });
  }
};

/**
 * =================================================
 * UPDATE SALON SETTINGS (ADMIN)
 * PUT /api/settings
 * =================================================
 */
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // 🟢 First time default create
    if (!settings) {
      settings = await Settings.create({});
    }

    const updateData = { ...req.body };

    // 🖼️ Logo upload (optional)
    if (req.file) {
      updateData.logo = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const updatedSettings = await Settings.findByIdAndUpdate(
      settings._id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Salon settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update salon settings",
    });
  }
};
