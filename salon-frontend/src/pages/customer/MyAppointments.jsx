import { useEffect, useState } from "react";
import "./MyAppointments.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import AppointmentCard from "../../components/customer/AppointmentCard";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/appointments/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(data.appointments || []);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await axios.patch(
        `${API_URL}/appointments/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAppointments();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  return (
    <>
      <Header />

      <div className="my-appointments-page">
        <h2 className="page-title">My Appointments</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="no-data">You have no appointments yet.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <AppointmentCard
                key={apt._id}
                appointment={apt}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyAppointments;
