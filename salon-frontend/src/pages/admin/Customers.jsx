import { useEffect } from "react";
import "./Customers.css";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Loader from "../../components/common/Loader";
import { useAdmin } from "../../context/AdminContext";

const Customers = () => {
  const {
    customers,
    fetchCustomers,
    loading,
  } = useAdmin();

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <AdminHeader />

      <div className="admin-layout">
        <Sidebar />

        <main className="admin-content">
          <h2 className="page-title">Customers</h2>

          <div className="table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  customers.map((cust) => (
                    <tr key={cust._id}>
                      <td>{cust.name}</td>
                      <td>{cust.email || "-"}</td>
                      <td>{cust.phone || "-"}</td>
                      <td>
                        <span
                          className={`status ${
                            cust.isActive ? "active" : "inactive"
                          }`}
                        >
                          {cust.isActive ? "Active" : "Disabled"}
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

export default Customers;
