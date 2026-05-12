import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import type { Product } from "../types/product";

interface SectionProps {
  title: string;
  bgColor: string;
  productItems: Product[];
}

const Section = ({ title, bgColor, productItems }: SectionProps) => {
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
