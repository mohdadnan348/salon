import api from "./api";

/**
 * ================================
 * GET GALLERY IMAGES
 * ================================
 * @param {string} category (optional)
 */
export const getGalleryImages = (category = "") => {
  let url = "/gallery";

  if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  }

  return api.get(url);
};

/**
 * ================================
 * UPLOAD GALLERY IMAGE
 * ================================
 * @param {FormData} formData
 */
export const uploadGalleryImage = (formData) => {
  return api.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * ================================
 * DELETE GALLERY IMAGE
 * ================================
 * @param {string} id
 */
export const deleteGalleryImage = (id) => {
  return api.delete(`/gallery/${id}`);
};
