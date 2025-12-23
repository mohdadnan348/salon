import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const { token } = useAuth();

  const [dashboardStats, setDashboardStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/dashboard");
      setDashboardStats(data.stats);
    } catch (error) {
      console.error("Dashboard error", error);
    } finally {
      setLoading(false);
    }
  };

  // All appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/appointments");
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Appointments error", error);
    } finally {
      setLoading(false);
    }
  };

  // All customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/customers");
      setCustomers(data.customers);
    } catch (error) {
      console.error("Customers error", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    dashboardStats,
    appointments,
    customers,
    loading,
    fetchDashboardStats,
    fetchAppointments,
    fetchCustomers,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook
export const useAdmin = () => useContext(AdminContext);
