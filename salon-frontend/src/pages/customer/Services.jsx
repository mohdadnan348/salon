import { useEffect, useState } from "react";
import "./Services.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import ServiceCard from "../../components/customer/ServiceCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/services`);
      setServices(data.services || []);
    } catch (error) {
      console.error("Services fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleBook = (service) => {
    navigate("/book-appointment", {
      state: {
        type: "SERVICE",
        data: service,
      },
    });
  };

  return (
    <>
      <Header />

      <div className="customer-services-page">
        <h2 className="page-title">Our Services</h2>

        {loading ? (
          <Loader />
        ) : services.length === 0 ? (
          <p className="no-data">No services available</p>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
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

export default Services;
