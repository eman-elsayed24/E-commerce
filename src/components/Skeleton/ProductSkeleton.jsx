import "./product-skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton-container">
      <div className="skeleton-left">
        <div className="skeleton-main-image"></div>
        <div className="skeleton-thumbnails">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-thumbnail"></div>
          ))}
        </div>
      </div>
      <div className="skeleton-right">
        <div className="skeleton-title"></div>
        <div className="skeleton-rating"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
