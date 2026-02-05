import { useEffect, useState } from "react";
import "./Appointments.css";

import {
  getAllAppointments,
  confirmAppointment,
  cancelAppointment,
  completeAppointment,
} from "../../../services/appointment.service";

import formatDate from "../../../utils/formatDate";
import Loader from "../../../components/common/Loader/Loader";

import { Calendar, Clock, Phone, MoreVertical } from "lucide-react";

const TABS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [activeTab, appointments]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await getAllAppointments();
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error("Appointments fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    if (activeTab === "All") {
      setFiltered(appointments);
    } else {
      setFiltered(
        appointments.filter((a) => a.status === activeTab)
      );
    }
  };

  /* ===============================
     ACTION HANDLERS
  =============================== */
  const handleConfirm = async (id) => {
    try {
      setActionLoading(id);
      await confirmAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Failed to confirm appointment");
    } finally {
      setActionLoading("");
    }
  };

  const handleComplete = async (id) => {
    try {
      setActionLoading(id);
      await completeAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Failed to complete appointment");
    } finally {
      setActionLoading("");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      setActionLoading(id);
      await cancelAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Failed to cancel appointment");
    } finally {
      setActionLoading("");
    }
  };

  if (loading) return <Loader text="Loading appointments..." />;

  return (
    <div className="admin-appointments-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Appointments</h1>
          <p>Manage all customer appointments</p>
        </div>

        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="empty-state">No appointments found</div>
      ) : (
        filtered.map((item) => (
          <div key={item._id} className="appointment-card">
            {/* LEFT */}
            <div className="left">
              <div className="avatar">
                {item.customer?.name?.charAt(0)}
              </div>

              <div className="details">
                <h3>{item.customer?.name}</h3>

                <div className="phone">
                  <Phone size={14} />
                  {item.customer?.mobile}
                </div>

                <div className="services">
                  {item.services?.map((service, index) => (
                    <span key={index}>{service}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right">
              <div className="date">
                <Calendar size={16} />
                {formatDate(item.preferredDate)}
              </div>

              <div className="time">
                <Clock size={16} />
                {item.preferredTime}
              </div>

              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>

              <MoreVertical size={18} />
            </div>

            {/* ACTIONS (UI SAME STYLE – just buttons) */}
            <div className="actions">
              {item.status === "Pending" && (
                <>
                  <button
                    className="primary-btn"
                    disabled={actionLoading === item._id}
                    onClick={() => handleConfirm(item._id)}
                  >
                    Confirm
                  </button>
                  <button
                    className="outline-btn"
                    disabled={actionLoading === item._id}
                    onClick={() => handleCancel(item._id)}
                  >
                    Cancel
                  </button>
                </>
              )}

              {item.status === "Confirmed" && (
                <>
                  <button
                    className="primary-btn"
                    disabled={actionLoading === item._id}
                    onClick={() => handleComplete(item._id)}
                  >
                    Complete
                  </button>
                  <button
                    className="outline-btn"
                    disabled={actionLoading === item._id}
                    onClick={() => handleCancel(item._id)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* NOTES */}
            {item.notes && (
              <div className="notes">
                <strong>Notes:</strong> {item.notes}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
