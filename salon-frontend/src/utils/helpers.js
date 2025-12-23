/* =========================
   DATE HELPERS
========================= */

// Convert date to readable format (YYYY-MM-DD → DD MMM YYYY)
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Get today date (YYYY-MM-DD)
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

/* =========================
   PRICE HELPERS
========================= */

// Format price with ₹ symbol
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

/* =========================
   TEXT HELPERS
========================= */

// Capitalize first letter
export const capitalize = (text = "") => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/* =========================
   SLOT HELPERS
========================= */

// Check slot availability
export const isSlotSelected = (selectedSlot, slot) => {
  return selectedSlot === slot;
};

/* =========================
   AUTH HELPERS
========================= */

// Get logged in user from localStorage
export const getAuthUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};
