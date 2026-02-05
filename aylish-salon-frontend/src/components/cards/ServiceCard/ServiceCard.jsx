import "./ServiceCard.css";

const ServiceCard = ({ title, description, price, image }) => {
  return (
    <div className="service-card">
      {/* Image */}
      {image && (
        <div className="service-image">
          <img src={image} alt={title} />
        </div>
      )}

      {/* Content */}
      <div className="service-content">
        <h3>{title}</h3>

        {description && <p>{description}</p>}

        <div className="service-footer">
          {price && <span className="price">₹{price}</span>}
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
