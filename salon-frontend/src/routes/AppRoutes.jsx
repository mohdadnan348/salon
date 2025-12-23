import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

/* ======================
   AUTH PAGES
====================== */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ======================
   CUSTOMER PAGES
====================== */
import Home from "../pages/customer/Home";
import Services from "../pages/customer/Services";
import Packages from "../pages/customer/Packages";
import Gallery from "../pages/customer/Gallery";
import BookAppointment from "../pages/customer/BookAppointment";
import MyAppointments from "../pages/customer/MyAppointments";

/* ======================
   ADMIN PAGES
====================== */
import Dashboard from "../pages/admin/Dashboard";
import AdminServices from "../pages/admin/Services";
import AdminPackages from "../pages/admin/Packages";
import AdminAppointments from "../pages/admin/Appointments";
import Customers from "../pages/admin/Customers";
import AdminGallery from "../pages/admin/Gallery";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ======================
          PUBLIC ROUTES
      ====================== */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/gallery" element={<Gallery />} />

      {/* ======================
          AUTH ROUTES
      ====================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ======================
          CUSTOMER PROTECTED ROUTES
      ====================== */}
      <Route
        path="/book-appointment"
        element={
          <ProtectedRoute role="CUSTOMER">
            <BookAppointment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-appointments"
        element={
          <ProtectedRoute role="CUSTOMER">
            <MyAppointments />
          </ProtectedRoute>
        }
      />

      {/* ======================
          ADMIN PROTECTED ROUTES
      ====================== */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/services"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/packages"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminPackages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminAppointments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute role="ADMIN">
            <Customers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminGallery />
          </ProtectedRoute>
        }
      />

      {/* ======================
          FALLBACK (404)
      ====================== */}
      <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
