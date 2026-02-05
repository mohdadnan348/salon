import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* ================= HERO ================= */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Get in touch with AYlish Salon.</p>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="contact-container">
        {/* Left: Info */}
        <div className="contact-info">
          <h3>Get in Touch</h3>

          <ul>
            <li>
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <p>+91 98765 43210</p>
              </div>
            </li>

            <li>
              <span>✉️</span>
              <div>
                <strong>Email</strong>
                <p>hello@aylishsalon.com</p>
              </div>
            </li>

            <li>
              <span>📍</span>
              <div>
                <strong>Address</strong>
                <p>
                  123 Fashion Street, Mumbai,
                  Maharashtra 400001
                </p>
              </div>
            </li>

            <li>
              <span>🕒</span>
              <div>
                <strong>Opening Hours</strong>
                <p>10:00 AM – 8:00 PM (Tue–Sun)</p>
              </div>
            </li>
          </ul>

          {/* Map placeholder */}
          <div className="map-box">
            <p>📍 Map will be shown here</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form-box">
          <h3>Send a Message</h3>

          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Your Message"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
