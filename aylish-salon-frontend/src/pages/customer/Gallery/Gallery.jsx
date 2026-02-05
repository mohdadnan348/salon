import { useEffect, useState } from "react";
import "./Gallery.css";
import { getGalleryImages } from "../../../services/gallery.service";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await getGalleryImages();
      setGallery(res?.data?.data || []);
    } catch (err) {
      console.error("Gallery Error:", err);
    }
  };

  // 👉 unique categories
  const categories = [
    "All",
    ...new Set(gallery.map((g) => g.category).filter(Boolean)),
  ];

  // 👉 filter images
  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((g) => g.category === activeCategory);

  return (
    <div className="gallery-page">
      <h2>Our Work</h2>
      <p className="subtitle">
        Real transformations by our professional stylists
      </p>

      {/* CATEGORY FILTER */}
      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* IMAGES */}
      <div className="gallery-grid">
        {filteredGallery.map((g) => (
          <div
            key={g._id}
            className="gallery-item"
            onClick={() => setPreview(g.image?.url)}
          >
            <img src={g.image?.url} alt={g.category || "Salon Work"} />
          </div>
        ))}
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="img-modal" onClick={() => setPreview(null)}>
          <img src={preview} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
