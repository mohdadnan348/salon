import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h3 className="footer-logo">Salon</h3>
          <p className="footer-text">
            Premium salon services & professional makeup packages for every
            occasion.
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Services</li>
            <li>Packages</li>
            <li>Gallery</li>
            <li>My Appointments</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@salon.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: New Delhi, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
