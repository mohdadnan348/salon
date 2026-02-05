import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      {/* ================= CTA SECTION ================= */}
      <div className="footer-cta">
        <h2>Ready to Transform Your Look?</h2>
        <p>
          Book your appointment today and experience the luxury of
          AYlish Salon
        </p>

        <div className="cta-actions">
          <Link to="/appointment" className="cta-btn primary">
            Book Online →
          </Link>

          <a href="tel:+919935562426" className="cta-btn outline">
            📞 Call Now
          </a>

          <a
            href="https://wa.me/919935562426"
            target="_blank"
            rel="noreferrer"
            className="cta-btn outline"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* ================= FOOTER MAIN ================= */}
      <div className="footer-main">
        <div className="footer-col brand">
          <div className="brand-logo">
            ✂️ <span>AYlish Salon</span>
          </div>
          <p>
            Where Beauty Meets Elegance. Experience premium salon
            services in a luxurious and comfortable environment.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/appointment">Book Appointment</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li>📞 +91 99355 62426</li>
            <li>✉️ hello@aylishsalon.com</li>
            <li>
              📍 105/68 Ghadi Wali Masjid,<br />
                  Hafeez Building, Chaman Ganj,<br />
                  Colonelganj, Kanpur
            </li>
          </ul>

         
        </div>

        <div className="footer-col">
          <h4>Opening Hours</h4>
          <ul>
            <li>🕒 10:00 – 20:00</li>
            <li>❌ Closed on Monday</li>
          </ul>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} AYlish Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
