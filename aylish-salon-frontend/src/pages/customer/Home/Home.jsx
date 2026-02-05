import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// HERO IMAGES
import hero1 from "../../../assets/images/hero1.jpg";
import hero2 from "../../../assets/images/hero2.jpg";
import hero3 from "../../../assets/images/hero3.jpg";
import hero4 from "../../../assets/images/hero4.jpg";

// APIs
import { getAllServices } from "../../../services/service.service";
import { getAllPackages } from "../../../services/package.service";
import { getGalleryImages } from "../../../services/gallery.service";

const Home = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const serviceRes = await getAllServices();
      const packageRes = await getAllPackages();
      const galleryRes = await getGalleryImages();

      setServices(serviceRes?.data?.data || []);
      setPackages(packageRes?.data || []);
      setGallery(galleryRes?.data?.data || []);
    } catch (err) {
      console.error("HOME ERROR:", err);
    }
  };

  // ===============================
  // GROUP SERVICES BY CATEGORY
  // ===============================
  const groupedServices = services.reduce((acc, srv) => {
    if (!acc[srv.category]) acc[srv.category] = [];
    acc[srv.category].push(srv);
    return acc;
  }, {});

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero dotted-bg">
        <div className="hero-left">
          <span className="badge">✨ Premium Unisex Salon</span>

          <h1>
            Where Beauty <br />
            <span>Meets Elegance</span>
          </h1>

          <p>
            Transform your look with our expert stylists. From bridal makeovers
            to everyday grooming, we deliver excellence in every service.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/Appointment")}>
              Book Appointment →
            </button>
            <button className="outline" onClick={() => navigate("/services")}>
              Explore Services
            </button>
          </div>
        </div>

        <div className="hero-images">
          <img src={hero1} />
          <img src={hero2} className="img2" />
          <img src={hero3} />
          <img src={hero4} className="img4" />
        </div>
      </section>

      {/* ================= SERVICES =================
      <section className="section">
        <h2>Our Services</h2>
        <p className="subtitle">
          Most loved & frequently booked salon services
        </p>

        <div className="service-grid">
          {Object.entries(groupedServices)
            .slice(0, 3)
            .map(([category, items]) => (
              <div className="service-card" key={category}>
                <h3>{category}</h3>

                <ul className="service-list">
                  {items.slice(0, 4).map((srv) => (
                    <li key={srv._id}>{srv.name}</li>
                  ))}

                  {items.length > 4 && (
                    <li className="more">
                      + {items.length - 4} more services
                    </li>
                  )}
                </ul>
              </div>
            ))}
        </div>

        <button className="link-btn" onClick={() => navigate("/services")}>
          View All Services →
        </button>
      </section> */}

      {/* ================= SERVICES ================= */}
<section className="section">
  <h2>Our Services</h2>
  <p className="subtitle">
    Most loved & frequently booked salon services
  </p>

  <div className="service-grid">
    {/* Hair Services */}
    <div className="service-card">
      <h3>Hair Services</h3>
      <ul className="service-list">
        <li>Hair Cut</li>
        <li>Hair Spa</li>
        <li>Hair Color</li>
        <li>Keratin Treatment</li>
      </ul>
    </div>

    {/* Makeup */}
    <div className="service-card">
      <h3>Makeup (Women)</h3>
      <ul className="service-list">
        <li>Party Makeup</li>
        <li>Glam Makeup</li>
        <li>Bridal Makeup</li>
        <li>Engagement Makeup</li>
      </ul>
    </div>

    {/* Skin / Facial */}
    <div className="service-card">
      <h3>Skin / Facial</h3>
      <ul className="service-list">
        <li>Hydra Facial</li>
        <li>Anti Tan Facial</li>
        <li>Korean Glass Facial</li>
        <li>Detan Cleanup</li>
      </ul>
    </div>
  </div>

  <button className="link-btn" onClick={() => navigate("/services")}>
    View All Services →
  </button>
</section>


      {/* ================= PACKAGES ================= */}
      {/* <section className="section gray">
        <h2>Special Packages</h2>
        <p className="subtitle">
          Wedding, party & special occasion packages
        </p>

        <div className="package-grid">
          {packages.slice(0, 3).map((pkg) => (
            <div className="package-card" key={pkg._id}>
              <div className="package-letter">
                {pkg.name?.charAt(0)}
              </div>

              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>

              <button onClick={() => navigate("/book")}>
                Book Now
              </button>
            </div>
          ))}
        </div>

        <button className="link-btn" onClick={() => navigate("/packages")}>
          View All Packages →
        </button>
      </section> */}

{/* ================= PACKAGES ================= */}
<section className="section gray">
  <h2>Special Packages</h2>
  <p className="subtitle">
    Wedding, party & special occasion packages
  </p>

  <div className="package-grid">
    {packages.slice(0, 3).map((pkg) => (
      <div className="package-card" key={pkg._id}>
        {/* Placeholder / Letter */}
        <div className="package-letter">
          {pkg.name?.charAt(0)}
        </div>

        {/* Package Name */}
        <h3>{pkg.name}</h3>

        {/* Description */}
        {pkg.description && <p>{pkg.description}</p>}

        {/* Price + Button */}
        {(pkg.price !== undefined &&
          pkg.price !== null &&
          pkg.price !== "") && (
          <div className="package-footer">
            <span className="package-price">₹{pkg.price}</span>

            <button
              className="book-btn"
              onClick={() => navigate("/Appointment")}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    ))}
  </div>

  <button
    className="link-btn"
    onClick={() => navigate("/packages")}
  >
    View All Packages →
  </button>
</section>


      {/* ================= GALLERY (OLD WORKING LOGIC) ================= */}
      <section className="section">
        <h2>Our Work</h2>
        <p className="subtitle">
          Real transformations by our professionals
        </p>

        <div className="gallery-grid">
          {gallery.slice(0, 6).map((g) => (
            <img
              key={g._id}
              src={g.image?.url}   // ✅ SAME AS OLD CODE
              alt="Gallery"
              onClick={() => setPreview(g.image?.url)}
            />
          ))}
        </div>

        <button className="link-btn" onClick={() => navigate("/gallery")}>
          View Full Gallery →
        </button>
      </section>

      {preview && (
        <div className="img-modal" onClick={() => setPreview(null)}>
          <img src={preview} />
        </div>
      )}
    </div>
  );
};

export default Home;
