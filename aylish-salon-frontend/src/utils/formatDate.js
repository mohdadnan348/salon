/**
 * ================================
 * Format Date Utility
 * ================================
 * @param {string | Date} date
 * @returns {string} formatted date (e.g. 12 Jan 2026)
 */

const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default formatDate;
