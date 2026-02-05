import api from "./api";

export const adminLogin = (data) => {
  return api.post("/admin/login", data);
};
