import api from "./api";

/**
 * =================================
 * GET ALL SERVICES (READ ONLY)
 * GET /api/services
 * =================================
 * Backend returns:
 * {
 *   success: true,
 *   data: [
 *     { category, items: [] }
 *   ]
 * }
 */
export const getAllServices = async () => {
  const res = await api.get("/services");
  return res;
};

/**
 * ❌ ADMIN SERVICE CRUD DISABLED
 * Services are constant-based
 */
export const addService = () => {
  throw new Error("Service creation is disabled (constant-based)");
};

export const updateService = () => {
  throw new Error("Service update is disabled (constant-based)");
};

export const deleteService = () => {
  throw new Error("Service delete is disabled (constant-based)");
};
