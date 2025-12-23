import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h2 className="admin-logo">Salon Admin</h2>
      </div>

      <div className="admin-header-right">
        <span className="admin-welcome">Welcome, Admin</span>

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
