import { useLocation } from "react-router-dom";

// Common layout
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";

// Routes
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const location = useLocation();

  // Admin pages par header/footer nahi dikhana
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <AppRoutes />

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
