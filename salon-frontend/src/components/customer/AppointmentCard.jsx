import "./AppointmentCard.css";

const AppointmentCard = ({ appointment, onCancel }) => {
  const {
    bookingType,
    serviceId,
    packageId,
    date,
    timeSlot,
    status,
  } = appointment;

  const title =
    bookingType === "SERVICE"
      ? serviceId?.name
      : packageId?.name;

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3 className="appointment-title">{title}</h3>
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="appointment-body">
        <p>
          <strong>Type:</strong> {bookingType}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {timeSlot}
        </p>
      </div>

      {status === "PENDING" && (
        <div className="appointment-actions">
          <button
            className="cancel-btn"
            onClick={() => onCancel(appointment._id)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
