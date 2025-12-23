import api from "./api";

// Get all services (customer + admin)
export const getAllServices = async () => {
  const res = await api.get("/services");
  return res.data.services;
};

// Admin: delete service
export const deleteService = async (id) => {
  const res = await api.delete(`/services/${id}`);
  return res.data;
};

// Admin: create service
export const createService = async (data) => {
  const res = await api.post("/services", data);
  return res.data;
};

// Admin: update service
export const updateService = async (id, data) => {
  const res = await api.put(`/services/${id}`, data);
  return res.data;
};
