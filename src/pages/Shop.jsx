import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import { getProducts } from "../utils/products";
import ShopList from "../components/ShopList";
import Skeleton from "../components/Skeleton/Skeleton";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        setProducts(allProducts);
        setFilterList(
          allProducts.filter((item) => item.category === "furniture"),
        );
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useWindowScrollToTop();

  return (
    <Fragment>
      <section
        className="filter-bar"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
          paddingTop: "40px",
        }}
      >
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} products={products} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} products={products} />
            </Col>
          </Row>
        </Container>
        <Container>
          {loading ? <Skeleton /> : <ShopList productItems={filterList} />}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
