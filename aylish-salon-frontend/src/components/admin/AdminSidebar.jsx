import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Gift,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import "./AdminSidebar.css";

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
        <div className="logo-circle">✂️</div>
        <span>AYlish Admin</span>
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

        <NavLink to="/admin/settings" className="menu-item">
          <Settings size={18} />
          Settings
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
