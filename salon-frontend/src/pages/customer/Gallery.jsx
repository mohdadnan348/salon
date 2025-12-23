import { useEffect, useState } from "react";
import "./Gallery.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchImages = async () => {
    try {
      setLoading(true);

      const url =
        category === "ALL"
          ? `${API_URL}/gallery`
          : `${API_URL}/gallery?category=${category}`;

      const { data } = await axios.get(url);
      setImages(data.images || []);
    } catch (error) {
      console.error("Gallery fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category]);

  return (
    <>
      <Header />

      <div className="customer-gallery-page">
        <h2 className="gallery-title">Our Work</h2>

        {/* Category Filter */}
        <div className="gallery-filters">
          {["ALL", "SALON", "MAKEUP", "BRIDAL", "GROOM"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${
                category === cat ? "active" : ""
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="gallery-grid">
            {images.length === 0 ? (
              <p className="no-data">No images found</p>
            ) : (
              images.map((img) => (
                <div className="gallery-card" key={img._id}>
                  <img src={img.image.url} alt="gallery" />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Gallery;
