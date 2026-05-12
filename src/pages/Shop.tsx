import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState, useEffect } from "react";
import { getProducts } from "../utils/products";
import ShopList from "../components/ShopList";
import Skeleton from "../components/Skeleton/Skeleton";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import type { Product } from "../types/product";

const LIMIT = 20;

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterList, setFilterList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [activeFilter, setActiveFilter] = useState<Product[] | null>(null);

  useEffect(() => {
    const loadProducts = async (currentSkip = 0) => {
      try {
        const result = await getProducts(LIMIT, currentSkip);
        setTotal(result.total);
        setProducts(result.products);
        setFilterList(result.products);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    const init = async () => {
      setLoading(true);
      await loadProducts(0);
      setLoading(false);
    };
    init();
  }, []);

  const loadProducts = async (currentSkip = 0, append = false) => {
    try {
      const result = await getProducts(LIMIT, currentSkip);
      setTotal(result.total);
      if (append) {
        setProducts((prev) => {
          const updated = [...prev, ...result.products];
          if (!activeFilter) setFilterList(updated);
          return updated;
        });
      } else {
        setProducts(result.products);
        if (!activeFilter) setFilterList(result.products);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleLoadMore = async () => {
    const newSkip = skip + LIMIT;
    setLoadingMore(true);
    await loadProducts(newSkip, true);
    setSkip(newSkip);
    setLoadingMore(false);
  };

  const handleFilterChange = (filtered: Product[]) => {
    setActiveFilter(filtered === products ? null : filtered);
    setFilterList(filtered);
  };

  useWindowScrollToTop();

  const hasMore = skip + LIMIT < total && !activeFilter;

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
              <FilterSelect
                setFilterList={handleFilterChange}
                products={products}
              />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} products={products} />
            </Col>
          </Row>
        </Container>
        <Container>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              <ShopList productItems={filterList} />
              {hasMore && (
                <div style={{ textAlign: "center", margin: "30px 0" }}>
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    style={{
                      padding: "12px 40px",
                      backgroundColor: "#0f3460",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      opacity: loadingMore ? 0.7 : 1,
                    }}
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
