import { useEffect, useState } from "react";
import "./BookAppointment.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // service or package passed from previous page
  const selectedItem = location.state;

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Static slots (backend se bhi aa sakte hain)
    setSlots([
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 01:00",
      "02:00 - 03:00",
      "03:00 - 04:00",
      "04:00 - 05:00",
      "05:00 - 06:00",
    ]);
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !timeSlot) {
      return setError("Please select date and time slot");
    }

    try {
      setLoading(true);

      const payload = {
        bookingType: selectedItem.type, // SERVICE / PACKAGE
        date,
        timeSlot,
        serviceId:
          selectedItem.type === "SERVICE"
            ? selectedItem.data._id
            : null,
        packageId:
          selectedItem.type === "PACKAGE"
            ? selectedItem.data._id
            : null,
      };

      await axios.post(`${API_URL}/appointments`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-appointments");
    } catch (err) {
      setError(
        err.response?.data?.message || "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!selectedItem) {
    return <p style={{ textAlign: "center" }}>No item selected</p>;
  }

  return (
    <>
      <Header />

      <div className="booking-page">
        <div className="booking-card">
          <h2>Book Appointment</h2>

          <p className="booking-title">
            {selectedItem.data.name}
          </p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleBooking}>
            {/* Date */}
            <label>Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* Slots */}
            <label>Select Time Slot</label>
            <div className="slot-grid">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={`slot-btn ${
                    timeSlot === slot ? "active" : ""
                  }`}
                  onClick={() => setTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button type="submit" className="confirm-btn">
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookAppointment;
