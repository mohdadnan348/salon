import { useEffect, useState } from "react";
import "./Dashboard.css";

import { getAllAppointments } from "../../../services/appointment.service";
import formatDate from "../../../utils/formatDate";
import Loader from "../../../components/common/Loader/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

 const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const res = await getAllAppointments();
    const data = res.data.data || [];

    setAppointments(data);

    // ✅ TODAY RANGE (LOCAL TIME)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let todayCount = 0;
    let upcomingCount = 0;
    let pendingCount = 0;
    let completedCount = 0;

    data.forEach((a) => {
      const apptDate = new Date(a.preferredDate);

      // ✅ TODAY FIX
      if (apptDate >= todayStart && apptDate <= todayEnd) {
        todayCount++;
      }

      if (a.status === "Pending") pendingCount++;
      if (a.status === "Confirmed") upcomingCount++;
      if (a.status === "Completed") completedCount++;
    });

    setStats({
      today: todayCount,
      upcoming: upcomingCount,
      pending: pendingCount,
      completed: completedCount,
    });
  } catch (error) {
    console.error("Dashboard error", error);
  } finally {
    setLoading(false);
  }
};


  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your salon overview.</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <StatCard icon="📅" color="blue" value={stats.today} label="Today's Appointments" />
        <StatCard icon="⏰" color="orange" value={stats.upcoming} label="Upcoming" />
        <StatCard icon="👥" color="yellow" value={stats.pending} label="Pending Confirmation" />
        <StatCard icon="✅" color="green" value={stats.completed} label="Completed" />
      </div>

      {/* RECENT APPOINTMENTS */}
      <div className="recent-box">
        <h3>Recent Appointments</h3>

        {appointments.slice(0, 5).map((item) => (
          <div key={item._id} className="appointment-item">
            <div className="avatar">
              {item.customer?.name?.charAt(0)}
            </div>

            <div className="info">
              <strong>{item.customer?.name}</strong>

              {/* ✅ FIXED SERVICES (STRING ARRAY) */}
              <span>
                {Array.isArray(item.services)
                  ? item.services.join(", ")
                  : ""}
              </span>
            </div>

            <div className="time">
              <span>{formatDate(item.preferredDate)}</span>
              <span>{item.preferredTime}</span>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="empty-text">No appointments found</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, color, value, label }) => (
  <div className="stat-card">
    <div className={`stat-icon ${color}`}>{icon}</div>
    <div>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  </div>
);

export default Dashboard;

