import { Routes, Route } from "react-router-dom";

// Customer pages
import Home from "../pages/customer/Home/Home";
import Services from "../pages/customer/Services/Services";
import Packages from "../pages/customer/Packages/Packages";
import Gallery from "../pages/customer/Gallery/Gallery";
import Appointment from "../pages/customer/Appointments/Appointment";
import Contact from "../pages/customer/Contact/Contact";

// Admin routes wrapper
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== CUSTOMER ROUTES ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/contact" element={<Contact />} />

      {/* ===== ADMIN ROUTES ===== */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
