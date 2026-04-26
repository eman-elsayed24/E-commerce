import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>
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
                title={title}
                productItem={productItem}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
