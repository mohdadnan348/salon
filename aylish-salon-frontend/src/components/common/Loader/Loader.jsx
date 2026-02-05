import "./Loader.css";

const Loader = ({ text }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
