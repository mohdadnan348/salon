import { useEffect } from "react";
import "./Dashboard.css";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import { useAdmin } from "../../context/AdminContext";

const Dashboard = () => {
  const {
    dashboardStats,
    fetchDashboardStats,
    loading,
  } = useAdmin();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading || !dashboardStats) return <Loader />;

  return (
    <>
      <AdminHeader />

      <div className="admin-layout">
        <Sidebar />

        <main className="admin-content">
          <h2 className="page-title">Dashboard</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Customers</h3>
              <p>{dashboardStats.totalCustomers}</p>
            </div>

            <div className="stat-card">
              <h3>Total Services</h3>
              <p>{dashboardStats.totalServices}</p>
            </div>

            <div className="stat-card">
              <h3>Total Packages</h3>
              <p>{dashboardStats.totalPackages}</p>
            </div>

            <div className="stat-card">
              <h3>Total Appointments</h3>
              <p>{dashboardStats.totalAppointments}</p>
            </div>

            <div className="stat-card pending">
              <h3>Pending</h3>
              <p>{dashboardStats.pendingAppointments}</p>
            </div>

            <div className="stat-card confirmed">
              <h3>Confirmed</h3>
              <p>{dashboardStats.confirmedAppointments}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
