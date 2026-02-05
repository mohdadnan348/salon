import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Gift,
  Image,
  LogOut,
} from "lucide-react";
import "./AdminSidebar.css";

// ✅ OPTION A: public folder logo
// <img src="/logo.png" />

// ✅ OPTION B: src/assets logo
import logo from "../../assets/logo.png";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      {/* LOGO */}
        <div className="sidebar-logo">
        <img src={logo} alt="AYlish Admin" className="sidebar-logo-img" />
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        <NavLink to="/admin/dashboard" className="menu-item">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/appointments" className="menu-item">
          <Calendar size={18} />
          Appointments
        </NavLink>

        <NavLink to="/admin/packages" className="menu-item">
          <Gift size={18} />
          Packages
        </NavLink>

        <NavLink to="/admin/gallery" className="menu-item">
          <Image size={18} />
          Gallery
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div className="sidebar-footer" onClick={logout}>
        <LogOut size={18} />
        Logout
      </div>
    </aside>
  );
};

export default AdminSidebar;
