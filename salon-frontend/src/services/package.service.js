import api from "./api";

// Get all packages
export const getAllPackages = async () => {
  const res = await api.get("/packages");
  return res.data.packages;
};

// Admin: delete package
export const deletePackage = async (id) => {
  const res = await api.delete(`/packages/${id}`);
  return res.data;
};

// Admin: create package
export const createPackage = async (data) => {
  const res = await api.post("/packages", data);
  return res.data;
};

// Admin: update package
export const updatePackage = async (id, data) => {
  const res = await api.put(`/packages/${id}`, data);
  return res.data;
};
