/**
 * ======================================
 * GLOBAL ERROR HANDLER MIDDLEWARE
 * ======================================
 * Catches all errors from controllers
 */
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    // 🔍 Only in development
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default errorHandler;
