import { useEffect } from "react";
import "./Appointments.css";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import { useAdmin } from "../../context/AdminContext";
import Loader from "../../components/common/Loader";

const Appointments = () => {
  const {
    appointments,
    fetchAppointments,
    loading,
  } = useAdmin();

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <AdminHeader />
      <div className="admin-layout">
        <Sidebar />

        <main className="admin-content">
          <h2 className="page-title">Appointments</h2>

          <div className="table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Service / Package</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt._id}>
                      <td>{apt.customerId?.name}</td>
                      <td>{apt.bookingType}</td>
                      <td>
                        {apt.bookingType === "SERVICE"
                          ? apt.serviceId?.name
                          : apt.packageId?.name}
                      </td>
                      <td>{apt.date}</td>
                      <td>{apt.timeSlot}</td>
                      <td>
                        <span
                          className={`status ${apt.status.toLowerCase()}`}
                        >
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Appointments;
