import { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { getProductById, getProducts } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import type { Product as ProductData } from "../types/product";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null,
  );
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        const [product, allProductsResult] = await Promise.all([
          getProductById(id ?? ""),
          getProducts(100),
        ]);

        setSelectedProduct(product);

        const allProducts = allProductsResult?.products ?? [];

        if (product) {
          const related = allProducts
            .filter(
              (item) =>
                item.category === product.category && item.id !== product.id,
            )
            .slice(0, 8);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  useWindowScrollToTop();

  if (loading) {
    return (
      <Fragment>
        <ProductSkeleton />
      </Fragment>
    );
  }

  if (!selectedProduct) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px",
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
          minHeight: "60vh",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "40px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#e74c3c" }}>Product not found</h3>
          <p style={{ color: "#666", marginTop: "10px" }}>
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section
        className="related-products"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          padding: "60px 0",
        }}
      >
        <Container>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "40px",
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#2c3e50",
              position: "relative",
            }}
          >
            You might also like
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(135deg, #0f3460 0%, #1e5799 100%)",
                margin: "15px auto",
                borderRadius: "2px",
              }}
            ></div>
          </h3>
          <ShopList productItems={relatedProducts} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Product;
