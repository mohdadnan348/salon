import { useEffect, useState } from "react";
import "./Services.css";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/services`);
      setServices(data.services || []);
    } catch (error) {
      console.error("Fetch services error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API_URL}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
    } catch (error) {
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
            <h2 className="page-title">Services</h2>
            <button className="add-btn">+ Add Service</button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="table-wrapper">
              <table className="services-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No services found
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service._id}>
                        <td>{service.name}</td>
                        <td>{service.category}</td>
                        <td>{service.duration} min</td>
                        <td>₹ {service.price}</td>
                        <td>
                          <span
                            className={`status ${
                              service.status === "ACTIVE"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td>
                          <button className="edit-btn">Edit</button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(service._id)}
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

export default Services;
