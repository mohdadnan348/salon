import { useEffect, useState } from "react";
import "./ManagePackages.css";

import Loader from "../../../components/common/Loader/Loader";

import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
  togglePackageStatus,
} from "../../../services/package.service";

import { getAllServices } from "../../../services/service.service";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    services: [],
  });

  /* ================= FETCH ================= */
  const fetchPackages = async () => {
    const res = await getAllPackages();
    setPackages(res.data || []); // ✅ FIXED
  };

  const fetchServices = async () => {
    const res = await getAllServices();
    const flat = [];
    res.data.data.forEach((g) =>
      g.items.forEach((s) => flat.push(s))
    );
    setServices(flat);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchPackages(), fetchServices()]);
      setLoading(false);
    };
    init();
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setForm({ name: "", description: "", price: "", services: [] });
    setEditingId(null);
  };

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  /* ================= CRUD ================= */
  const handleSubmit = async () => {
    if (!form.name || !form.description || form.services.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    setActionLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
      price: form.price || null,
      services: form.services,
    };

    if (editingId) {
      await updatePackage(editingId, payload);
    } else {
      await createPackage(payload);
    }

    setShowModal(false);
    resetForm();
    fetchPackages();
    setActionLoading(false);
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price || "",
      services: pkg.services,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await deletePackage(id);
    fetchPackages();
  };

  const handleToggle = async (id) => {
    await togglePackageStatus(id);
    fetchPackages();
  };

  if (loading) return <Loader text="Loading packages..." />;

  return (
    <div className="manage-packages-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Packages</h1>
          <p>Manage wedding and party packages</p>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Package
        </button>
      </div>

      {/* LIST */}
      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg._id} className="admin-package-card">
            <div className="top">
              <h3>{pkg.name}</h3>
              <div className="icons">
                <span onClick={() => handleEdit(pkg)}>✏️</span>
                <span onClick={() => handleDelete(pkg._id)}>🗑</span>
              </div>
            </div>

            <p>{pkg.description}</p>

            {pkg.price && <h2>₹{pkg.price}</h2>}

            <div className="service-tags">
              {pkg.services.slice(0, 4).map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              {pkg.services.length > 4 && (
                <span>+{pkg.services.length - 4} more</span>
              )}
            </div>

            <button
              className={`status ${pkg.isActive ? "active" : "inactive"}`}
              onClick={() => handleToggle(pkg._id)}
            >
              {pkg.isActive ? "Active" : "Inactive"}
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingId ? "Edit Package" : "Add Package"}</h2>
              <span onClick={() => setShowModal(false)}>✕</span>
            </div>

            <input
              placeholder="Package Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              placeholder="Price (optional)"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <div className="service-list">
              {services.map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    checked={form.services.includes(s)}
                    onChange={() => toggleService(s)}
                  />
                  {s}
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={handleSubmit}
                disabled={actionLoading}
              >
                {editingId ? "Update Package" : "Create Package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
