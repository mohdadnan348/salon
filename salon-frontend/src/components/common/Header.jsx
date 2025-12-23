import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          Salon
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/packages"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Packages
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Gallery
          </NavLink>

          {token && (
            <NavLink
              to="/my-appointments"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Appointments
            </NavLink>
          )}
        </nav>

        {/* Auth buttons */}
        <div className="header-actions">
          {!token ? (
            <>
              <Link to="/login" className="header-btn login-btn">
                Login
              </Link>
              <Link to="/register" className="header-btn register-btn">
                Register
              </Link>
            </>
          ) : (
            <button className="header-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
