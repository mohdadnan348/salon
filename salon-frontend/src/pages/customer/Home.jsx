import "./Home.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>
            Look Good. <span>Feel Confident.</span>
          </h1>
          <p>
            Professional salon services & premium makeup packages for every
            occasion.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/services")}>
              Explore Services
            </button>
            <button
              className="outline"
              onClick={() => navigate("/packages")}
            >
              View Packages
            </button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="home-highlights">
        <div className="highlight-card">
          <h3>Expert Stylists</h3>
          <p>Certified professionals with years of experience.</p>
        </div>

        <div className="highlight-card">
          <h3>Premium Products</h3>
          <p>We use top-quality & skin-friendly products.</p>
        </div>

        <div className="highlight-card">
          <h3>Easy Booking</h3>
          <p>Book your appointment in just a few clicks.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to book your appointment?</h2>
        <button onClick={() => navigate("/services")}>
          Book Now
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Home;
