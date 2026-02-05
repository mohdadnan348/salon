import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-container">

        {/* LOGO ONLY */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Aylish Salon" />
        </div>

        {/* NAV */}
        <nav className="header-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/packages">Packages</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/appointment">Book Now</NavLink>
        </nav>

        {/* CALL BUTTON */}
        <button
          className="call-btn"
          onClick={() => window.open("tel:+9199355 62426")}
        >
          Call Now
        </button>

      </div>
    </header>
  );
};

export default Header;
