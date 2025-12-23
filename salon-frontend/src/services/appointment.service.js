import api from "./api";

// Customer: book appointment
export const bookAppointment = async (data) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

// Customer: my appointments
export const getMyAppointments = async () => {
  const res = await api.get("/appointments/my");
  return res.data.appointments;
};

// Customer: cancel appointment
export const cancelAppointment = async (id) => {
  const res = await api.patch(`/appointments/${id}/cancel`);
  return res.data;
};

// Admin: all appointments
export const getAllAppointments = async () => {
  const res = await api.get("/admin/appointments");
  return res.data.appointments;
};
