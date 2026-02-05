import { useEffect, useState } from "react";
import "./Services.css";

import Loader from "../../../components/common/Loader/Loader";
import { getAllServices } from "../../../services/service.service";

const Services = () => {
  const [serviceGroups, setServiceGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        const data = res.data.data || [];
        setServiceGroups(data);

        // open first category by default
        if (data.length > 0) {
          setOpenCategory(data[0].category);
        }
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleCategory = (category) => {
    setOpenCategory((prev) =>
      prev === category ? null : category
    );
  };

  if (loading) {
    return <Loader text="Loading services..." />;
  }

  return (
    <div className="services-page">
      {/* ================= HEADER ================= */}
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>
          Premium beauty & grooming services crafted by professionals
        </p>
      </div>

      {/* ================= ACCORDION ================= */}
      <div className="services-accordion">
        {serviceGroups.map((group) => {
          const isOpen = openCategory === group.category;

          return (
            <div
              key={group.category}
              className={`service-group ${isOpen ? "open" : ""}`}
            >
              {/* HEADER */}
              <div
                className="service-group-header"
                onClick={() => toggleCategory(group.category)}
              >
                <h2>{group.category}</h2>
                <div className="meta">
                  <span>{group.items.length} services</span>
                  <span className="arrow">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {/* BODY */}
              {isOpen && (
                <div className="service-group-body">
                  {group.items.map((service, index) => (
                    <div
                      key={index}
                      className="service-row"
                    >
                      <span className="service-name">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
