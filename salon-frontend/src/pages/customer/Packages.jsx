import { useEffect, useState } from "react";
import "./Packages.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import PackageCard from "../../components/customer/PackageCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/packages`);
      setPackages(data.packages || []);
    } catch (error) {
      console.error("Packages fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleBook = (pkg) => {
    navigate("/book-appointment", {
      state: {
        type: "PACKAGE",
        data: pkg,
      },
    });
  };

  return (
    <>
      <Header />

      <div className="customer-packages-page">
        <h2 className="page-title">Our Packages</h2>

        {loading ? (
          <Loader />
        ) : packages.length === 0 ? (
          <p className="no-data">No packages available</p>
        ) : (
          <div className="packages-grid">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                pkg={pkg}
                onBook={handleBook}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Packages;
