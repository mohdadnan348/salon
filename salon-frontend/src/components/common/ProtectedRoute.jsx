import { Navigate } from "react-router-dom";
import "./ProtectedRoute.css";

/**
 * @param {ReactNode} children
 * @param {"ADMIN" | "CUSTOMER"} role  // optional
 */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return (
      <div className="protected-wrapper">
        <p>You must be logged in to access this page.</p>
        <Navigate to="/login" replace />
      </div>
    );
  }

  // Role mismatch
  if (role && user.role !== role) {
    return (
      <div className="protected-wrapper">
        <p>Access denied. You don’t have permission.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
