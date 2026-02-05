import { useEffect, useState } from "react";
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../../../services/gallery.service";
import "./ManageGallery.css";

// UI label → backend value mapping
const CATEGORY_MAP = {
  All: "",
  Bridal: "bridal",
  Hair: "hair",
  Skin: "skin",
  Makeup: "makeup",
  "Before / After": "Before / After",
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Bridal");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch images (CATEGORY FIX)
  const fetchImages = async () => {
    try {
      const apiCategory = CATEGORY_MAP[activeCategory];
      const res = await getGalleryImages(apiCategory);
      setImages(res?.data?.data || []);
    } catch (err) {
      console.error("Fetch gallery error:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [activeCategory]);

  // 🔹 Upload image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", CATEGORY_MAP[category]);
      formData.append("title", title);

      await uploadGalleryImage(formData);

      setShowModal(false);
      setFile(null);
      setTitle("");
      setCategory("Bridal");

      fetchImages();
    } catch (err) {
      console.error("Upload gallery error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteGalleryImage(id);
      fetchImages();
    } catch (err) {
      console.error("Delete gallery error:", err);
    }
  };

  return (
    <div className="gallery-page">
      {/* HEADER */}
      <div className="gallery-header">
        <div>
          <h2>Gallery</h2>
          <p>Manage your salon portfolio images</p>
        </div>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Add Image
        </button>
      </div>

      {/* FILTER */}
      <div className="gallery-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="gallery-grid">
        {images.length === 0 && (
          <div className="empty">No images in this category</div>
        )}

        {images.map((item) => (
          <div key={item._id} className="gallery-card">
            <img src={item.image?.url} alt={item.title || item.category} />
            <div className="overlay">
              <span>{item.title || item.category}</span>
              <button onClick={() => handleDelete(item._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={handleUpload}>
            <div className="modal-header">
              <h3>Add New Image</h3>
              <button type="button" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <label>Image File</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <label>Title (Optional)</label>
            <input
              type="text"
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="modal-actions">
              <button
                type="button"
                className="outline-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Add Image"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
