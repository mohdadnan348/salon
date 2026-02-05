import api from "./api";

// Customer
export const createAppointment = (data) => {
  if (data instanceof FormData) {
    return api.post("/appointments", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.post("/appointments", data);
};

// Admin
export const getAllAppointments = () => {
  return api.get("/appointments");
};

export const confirmAppointment = (id) => {
  return api.put(`/appointments/${id}/confirm`);
};

export const cancelAppointment = (id) => {
  return api.put(`/appointments/${id}/cancel`);
};

/* ===========================
   ✅ MISSING EXPORT (FIX)
=========================== */
export const completeAppointment = (id) => {
  return api.put(`/appointments/${id}/complete`);
};
