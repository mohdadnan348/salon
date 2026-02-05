import "./PackageCard.css";

const PackageCard = ({ title, description, price, tag }) => {
  return (
    <div className="package-card">
      {/* Tag */}
      {tag && <div className="package-tag">{tag}</div>}

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="package-footer">
        <span className="package-price">₹{price}</span>
        <button className="package-btn">Book Now</button>
      </div>
    </div>
  );
};

export default PackageCard;
