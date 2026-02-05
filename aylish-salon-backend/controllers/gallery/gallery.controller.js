import Gallery from "../../models/Gallery.model.js";
import cloudinary from "cloudinary";

/**
 * CREATE GALLERY IMAGE
 */
export const createGalleryImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // 🔥 FINAL FIX: FORCE CONFIG AT RUNTIME
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log(
      "CLOUDINARY RUNTIME KEY:",
      cloudinary.v2.config().api_key
    );

    const result = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "aylish/gallery",
        resource_type: "image",
      }
    );

    const image = await Gallery.create({
      title: req.body.title || "Salon Work",
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);
    next(error);
  }
};

/**
 * ===============================
 * GET ALL GALLERY IMAGES
 * ===============================
 */
export const getGalleryImages = async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: images,
  });
};

/**
 * ===============================
 * TOGGLE ACTIVE
 * ===============================
 */
export const toggleGalleryStatus = async (req, res) => {
  const img = await Gallery.findById(req.params.id);
  if (!img) return res.status(404).json({ success: false });

  img.isActive = !img.isActive;
  await img.save();

  res.json({ success: true, data: img });
};

/**
 * ===============================
 * DELETE IMAGE
 * ===============================
 */
export const deleteGalleryImage = async (req, res) => {
  const img = await Gallery.findById(req.params.id);
  if (!img) return res.status(404).json({ success: false });

  // 🔥 delete from cloudinary also
  if (img.image?.publicId) {
    await cloudinary.uploader.destroy(img.image.publicId);
  }

  await img.deleteOne();

  res.json({ success: true });
};
