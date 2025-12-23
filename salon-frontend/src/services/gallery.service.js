import api from "./api";

// Customer: get gallery images
export const getGalleryImages = async (category) => {
  const url = category
    ? `/gallery?category=${category}`
    : "/gallery";

  const res = await api.get(url);
  return res.data.images;
};

// Admin: upload image
export const uploadGalleryImage = async (formData) => {
  const res = await api.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Admin: delete image
export const deleteGalleryImage = async (id) => {
  const res = await api.delete(`/gallery/${id}`);
  return res.data;
};
