import "./ServiceCard.css";

const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="service-card">
      {/* Image */}
      <div className="service-image">
        <img
          src={service?.image?.url || "/placeholder.png"}
          alt={service.name}
        />
      </div>

      {/* Content */}
      <div className="service-content">
        <h3 className="service-title">{service.name}</h3>

        <span className="service-category">{service.category}</span>

        <div className="service-info">
          <span>⏱ {service.duration} min</span>
          <span>₹ {service.price}</span>
        </div>

        <button
          className="book-service-btn"
          onClick={() => onBook(service)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
