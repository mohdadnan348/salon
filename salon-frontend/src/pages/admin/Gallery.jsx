import { useEffect, useState } from "react";
import "./Gallery.css";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("SALON");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/gallery`);
      setImages(data.images || []);
    } catch (err) {
      console.error("Fetch gallery error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category);

      await axios.post(`${API_URL}/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      fetchImages();
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="admin-layout">
        <Sidebar />

        <main className="admin-content">
          <h2 className="page-title">Gallery</h2>

          {/* Upload Form */}
          <form className="upload-form" onSubmit={handleUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="SALON">Salon</option>
              <option value="MAKEUP">Makeup</option>
              <option value="BRIDAL">Bridal</option>
              <option value="GROOM">Groom</option>
            </select>

            <button type="submit">Upload</button>
          </form>

          {/* Gallery */}
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
                    <span className="gallery-category">
                      {img.category}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(img._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Gallery;
