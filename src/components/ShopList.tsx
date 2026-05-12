import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import type { Product } from "../types/product";

interface ShopListProps {
  productItems: Product[];
}

const ShopList = ({ productItems }: ShopListProps) => {
  useEffect(() => {}, [productItems]);
  if (productItems.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <ion-icon
          name="search-outline"
          style={{
            fontSize: "120px",
            color: "#0f3460",
            opacity: "0.3",
            marginBottom: "24px",
          }}
        ></ion-icon>
        <h2
          style={{
            color: "#0f3460",
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          No Products Found
        </h2>
        <p
          style={{
            color: "#999",
            fontSize: "16px",
            maxWidth: "400px",
            lineHeight: "1.6",
          }}
        >
          We couldn't find any products in this category. Try selecting a
          different category or search for something else.
        </p>
      </div>
    );
  }
  return (
    <Row
      style={{
        marginTop: "40px",
        marginLeft: "-12px",
        marginRight: "-12px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {productItems.map((productItem) => {
        return (
          <ProductCard
            key={productItem.id}
            title={null}
            productItem={productItem}
          />
        );
      })}
    </Row>
  );
};

export default memo(ShopList);
