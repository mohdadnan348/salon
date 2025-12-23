import "./PackageCard.css";

const PackageCard = ({ pkg, onBook }) => {
  return (
    <div className="package-card">
      {/* Image */}
      <div className="package-image">
        <img
          src={pkg?.image?.url || "/placeholder.png"}
          alt={pkg.name}
        />
      </div>

      {/* Content */}
      <div className="package-content">
        <h3 className="package-title">{pkg.name}</h3>

        <span className="package-category">{pkg.category}</span>

        <ul className="package-services">
          {pkg.servicesIncluded?.slice(0, 4).map((service) => (
            <li key={service._id}>{service.name}</li>
          ))}
        </ul>

        <div className="package-footer">
          <span className="package-price">₹{pkg.price}</span>
          <button
            className="book-btn"
            onClick={() => onBook(pkg)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
