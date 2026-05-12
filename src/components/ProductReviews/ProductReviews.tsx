import { useState } from "react";
import { Container } from "react-bootstrap";
import type { Product } from "../../types/product";
import "./product-review.css";

interface ProductReviewsProps {
  selectedProduct: Product;
}

const ProductReviews = ({ selectedProduct }: ProductReviewsProps) => {
  const [listSelected, setListSelected] = useState<"desc" | "rev">("desc");
  const reviewCount = selectedProduct.reviews?.length ?? 0;

  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({reviewCount})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>{selectedProduct.description}</p>
        ) : (
          <div className="rates">
            {selectedProduct.reviews?.map((rate, idx) => (
              <div className="rate-comment" key={`${rate.rating}-${idx}`}>
                <span>Jhon Doe</span>
                <span>{rate.rating} (rating)</span>
                <p>{rate.text}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
