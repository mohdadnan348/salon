import { useEffect, useState } from "react";
import "./Appointment.css";

// Components
import Loader from "../../../components/common/Loader/Loader";

// API
import { getAllServices } from "../../../services/service.service";
import { getAllPackages } from "../../../services/package.service";
import { createAppointment } from "../../../services/appointment.service";

const HAIR_WIG_SERVICE = "Hair Wig / Hair Patch Consultation";

const Appointment = () => {
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    services: [],
    package: "",
    date: "",
    time: "",
    notes: "",
    hairWigConsultation: false,
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRes = await getAllServices();
        const pkgRes = await getAllPackages();

        const flatServices = [];
        serviceRes.data.data.forEach((group) => {
          group.items.forEach((s) => flatServices.push(s));
        });

        const activePackages = (pkgRes.data || []).filter(
          (p) => p.isActive
        );

        setServices(flatServices);
        setPackages(activePackages);
      } catch (err) {
        console.error("Failed to load appointment data");
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 📞 MOBILE VALIDATION
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    if (
      !form.name ||
      !form.date ||
      !form.time ||
      (form.services.length === 0 &&
        !form.package &&
        !form.hairWigConsultation)
    ) {
      setError("Please select at least one service or consultation");
      return;
    }

    try {
      setLoading(true);

      let finalServices = [...form.services];

      if (form.package) {
        finalServices.push(`Package: ${form.package}`);
      }

      if (form.hairWigConsultation) {
        finalServices.push(HAIR_WIG_SERVICE);
      }

      await createAppointment({
        name: form.name,
        mobile: form.mobile,
        services: finalServices,
        preferredDate: form.date,
        preferredTime: form.time,
        notes: form.notes,
        gender: "Male",
      });

      setSuccess(true);
      setForm({
        name: "",
        mobile: "",
        services: [],
        package: "",
        date: "",
        time: "",
        notes: "",
        hairWigConsultation: false,
      });
    } catch (error) {
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <Loader text="Loading booking form..." />;
  }

  return (
    <div className="appointment-page">
      <div className="appointment-box">
        <h2>Book Appointment</h2>
        <p>Select services or a package and we'll take care of the rest</p>

        {success ? (
          <div className="success-box">
            <h3>🎉 Appointment Booked!</h3>
            <p>You will receive confirmation on WhatsApp.</p>
            <button onClick={() => setSuccess(false)}>
              Book Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="appointment-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number (10 digits) *"
              value={form.mobile}
              onChange={handleChange}
            />

            {error && <p className="error-text">{error}</p>}

            {/* 🔹 HAIR WIG CONSULTATION */}
            <div className="hair-wig-consultation-box">
              <label className="hair-wig-consultation-item">
                <input
                  type="checkbox"
                  name="hairWigConsultation"
                  checked={form.hairWigConsultation}
                  onChange={handleChange}
                />
                <span className="consultation-text">
                  Hair Wig / Hair Patch Consultation
                </span>
              </label>
            </div>

            {/* PACKAGE */}
            <div className="package-select">
              <label>Select Package (optional)</label>
              <select
                name="package"
                value={form.package}
                onChange={handleChange}
              >
                <option value="">-- No Package --</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg.name}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SERVICES */}
            <div className="service-multi-select">
              <label>Select Services *</label>
              <div className="service-options">
                {services.map((service) => (
                  <label key={service} className="service-item-card">
                    <input
                      type="checkbox"
                      checked={form.services.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    <span className="service-text">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointment;
