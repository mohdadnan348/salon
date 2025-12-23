import Gallery from "../models/Gallery.model.js";
import cloudinary from "../config/cloudinary.js";

/**
 * @desc    Upload image to gallery (Admin)
 * @route   POST /api/gallery
 * @access  Private (Admin)
 */
export const uploadImage = async (req, res) => {
  try {
    const { category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "salon_gallery",
    });

    const image = await Gallery.create({
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      category,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all gallery images (Customer)
 * @route   GET /api/gallery
 * @access  Public
 */
export const getGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const images = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name role");

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete image from gallery (Admin)
 * @route   DELETE /api/gallery/:id
 * @access  Private (Admin)
 */
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Remove from Cloudinary
    if (image.image?.public_id) {
      await cloudinary.uploader.destroy(image.image.public_id);
    }

    await image.deleteOne();

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
