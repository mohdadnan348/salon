import { useEffect, useState } from "react";
import "./Packages.css";

// Components
import PackageCard from "../../../components/cards/PackageCard/PackageCard";
import Loader from "../../../components/common/Loader/Loader";

// API
import { getAllPackages } from "../../../services/package.service";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await getAllPackages();

        // ✅ FIX: correct data access
        const activePackages = (res.data || []).filter(
          (pkg) => pkg.isActive === true
        );

        setPackages(activePackages);
      } catch (error) {
        console.error("Failed to load packages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="packages-page">
      {/* ================= HERO ================= */}
      <div className="packages-hero">
        <h1>Special Packages</h1>
        <p>
          Curated beauty packages for weddings, parties & special occasions
        </p>
      </div>

      {/* ================= LIST ================= */}
      <div className="packages-container">
        {loading ? (
          <Loader text="Loading packages..." />
        ) : packages.length === 0 ? (
          <p className="empty-text">No packages available</p>
        ) : (
          <div className="packages-grid">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                title={pkg.name}
                description={pkg.description}
                price={
                  pkg.price === null || pkg.price === undefined
                    ? "Price on Request"
                    : `₹${pkg.price}`
                }
                tag=""
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
