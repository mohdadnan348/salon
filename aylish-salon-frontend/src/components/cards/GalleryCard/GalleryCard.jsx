import "./GalleryCard.css";

const GalleryCard = ({ image, title, onClick }) => {
  return (
    <div className="gallery-card" onClick={onClick}>
      <img src={image} alt={title || "Salon Work"} />

      {title && (
        <div className="gallery-overlay">
          <span>{title}</span>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
