import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/admin/packages"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Packages
        </NavLink>

        <NavLink
          to="/admin/appointments"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Appointments
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/admin/gallery"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Gallery
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
