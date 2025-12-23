import { useEffect, useState } from "react";
import "./Packages.css";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/packages`);
      setPackages(data.packages || []);
    } catch (err) {
      console.error("Fetch packages error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await axios.delete(`${API_URL}/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPackages();
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
          <div className="page-header">
            <h2 className="page-title">Packages</h2>
            <button className="add-btn">+ Add Package</button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-wrapper">
              <table className="packages-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Services</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {packages.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No packages found
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg) => (
                      <tr key={pkg._id}>
                        <td>{pkg.name}</td>
                        <td>{pkg.category}</td>
                        <td>₹ {pkg.price}</td>
                        <td>{pkg.servicesIncluded?.length || 0}</td>
                        <td>
                          <span
                            className={`status ${
                              pkg.status === "ACTIVE"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {pkg.status}
                          </span>
                        </td>
                        <td>
                          <button className="edit-btn">Edit</button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(pkg._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Packages;
