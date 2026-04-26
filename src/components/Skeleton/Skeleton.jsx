import "./skeleton.css";

const Skeleton = () => {
  return (
    <div className="skeleton-container">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
