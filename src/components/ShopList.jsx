import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);
  if (productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
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
