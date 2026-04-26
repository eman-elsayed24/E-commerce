import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get multiple images from the API or use the main image
  const productImages = selectedProduct?.images || [selectedProduct?.imgUrl];

  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={12}>
            <div className="product-image-section">
              {/* Main Product Image */}
              <div className="main-image">
                <img
                  loading="lazy"
                  src={productImages[selectedImage] || selectedProduct?.imgUrl}
                  alt={selectedProduct?.productName}
                />
              </div>

              {/* Image Gallery - Only show if there are multiple images */}
              {productImages.length > 1 && (
                <div className="image-gallery">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`gallery-item ${selectedImage === index ? "active" : ""}`}
                      onClick={() => handleImageSelect(index)}
                    >
                      <img
                        src={image}
                        alt={`${selectedProduct?.productName} ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6} md={12}>
            <div className="product-info-section">
              <div className="product-header">
                <h1 className="product-title">
                  {selectedProduct?.productName}
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "15px",
                  }}
                >
                  <span className="category-badge">
                    {selectedProduct?.category}
                  </span>
                  <span className="current-price">
                    ${selectedProduct?.price}
                  </span>
                  {selectedProduct?.discount && (
                    <span className="discount-badge">
                      {selectedProduct.discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa fa-star"></i>
                  ))}
                </div>
                <span className="rating-text">
                  ({selectedProduct?.avgRating} ratings)
                </span>
              </div>

              <div className="purchase-section">
                <div className="quantity-controls-inline">
                  <button
                    type="button"
                    className="qty-btn minus-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn plus-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>

                <button
                  aria-label="Add to Cart"
                  type="button"
                  className="add-to-cart-btn"
                  onClick={() => handelAdd(selectedProduct, quantity)}
                >
                  <i className="fa fa-shopping-cart"></i>
                  Add To Cart
                </button>
              </div>

              <div className="product-features">
                <div className="feature-item">
                  <i className="fa fa-truck"></i>
                  <span>Free Shipping</span>
                </div>
                <div className="feature-item">
                  <i className="fa fa-shield"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="feature-item">
                  <i className="fa fa-undo"></i>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
