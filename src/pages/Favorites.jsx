import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ShopList from "../components/ShopList";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Favorites = () => {
  const { favoritesList } = useSelector((state) => state.favorites);
  useWindowScrollToTop();

  return (
    <Fragment>
      <section
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
          paddingTop: "100px",
          paddingBottom: "60px",
          minHeight: "80vh",
        }}
      >
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#2c3e50",
                marginBottom: "10px",
              }}
            >
              My Favorites
            </h1>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(135deg, #0f3460 0%, #1e5799 100%)",
                margin: "15px auto",
                borderRadius: "2px",
              }}
            ></div>
          </div>

          {favoritesList.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "white",
                borderRadius: "15px",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "80px",
                  marginBottom: "20px",
                  opacity: "0.5",
                }}
              >
                <ion-icon name="heart-outline"></ion-icon>
              </div>
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "#2c3e50",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                No Favorites Yet
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#666",
                  marginBottom: "30px",
                }}
              >
                Start adding your favorite products by clicking the heart icon!
              </p>
              <a
                href="/shop"
                style={{
                  display: "inline-block",
                  padding: "12px 30px",
                  background:
                    "linear-gradient(135deg, #0f3460 0%, #1e5799 100%)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(15, 52, 96, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#666",
                  marginBottom: "30px",
                  textAlign: "center",
                }}
              >
                You have <strong>{favoritesList.length}</strong> favorite
                product{favoritesList.length !== 1 ? "s" : ""}
              </p>
              <ShopList productItems={favoritesList} />
            </div>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Favorites;
