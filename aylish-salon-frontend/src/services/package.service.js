import api from "./api";

/**
 * =====================================
 * GET ALL PACKAGES
 * GET /api/packages
 * Optional query:
 *  - activeOnly=true
 * =====================================
 */
export const getAllPackages = async (params = {}) => {
  const res = await api.get("/packages", {
    params, // 🔥 FIX: forward query params
  });
  return res.data;
};

/**
 * =====================================
 * GET PACKAGE BY ID
 * GET /api/packages/:id
 * =====================================
 */
export const getPackageById = async (id) => {
  const res = await api.get(`/packages/${id}`);
  return res.data;
};

/**
 * =====================================
 * CREATE PACKAGE
 * POST /api/packages
 * (FormData: name, description, price?, services[], image?)
 * =====================================
 */
export const createPackage = async (formData) => {
  const res = await api.post("/packages", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/**
 * =====================================
 * UPDATE PACKAGE
 * PUT /api/packages/:id
 * =====================================
 */
export const updatePackage = async (id, formData) => {
  const res = await api.put(`/packages/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/**
 * =====================================
 * DELETE PACKAGE
 * DELETE /api/packages/:id
 * =====================================
 */
export const deletePackage = async (id) => {
  const res = await api.delete(`/packages/${id}`);
  return res.data;
};

/**
 * =====================================
 * TOGGLE PACKAGE ACTIVE / INACTIVE
 * PATCH /api/packages/:id/toggle
 * =====================================
 */
export const togglePackageStatus = async (id) => {
  const res = await api.patch(`/packages/${id}/toggle`);
  return res.data;
};
