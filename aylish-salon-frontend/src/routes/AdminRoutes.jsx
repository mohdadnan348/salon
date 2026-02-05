import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/admin/Login/Login";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Appointments from "../pages/admin/Appointments/Appointments";

import ManagePackages from "../pages/admin/Packages/ManagePackages";
import ManageGallery from "../pages/admin/Gallery/ManageGallery";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
       
        <Route path="packages" element={<ManagePackages />} />
        <Route path="gallery" element={<ManageGallery />} />
        
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
