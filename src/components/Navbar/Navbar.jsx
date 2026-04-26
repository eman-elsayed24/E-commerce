import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { favoritesList } = useSelector((state) => state.favorites);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={isFixed ? "navbar fixed" : "navbar"}
    >
      <Container className="navbar-container">
        <Navbar.Brand to="/">
          <ion-icon name="storefront"></ion-icon>
          <h1 className="logo">prime market</h1>
        </Navbar.Brand>
        {/* Media cart and toggle */}
        <div className="d-flex" style={{ alignItems: "center", gap: "15px" }}>
          <div className="media-cart">
            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="cart"
              data-num={cartList.length}
            >
              <ion-icon
                name="cart-outline"
                style={{ fontSize: "28px", color: "white" }}
              ></ion-icon>
            </Link>
          </div>
          <div className="media-cart">
            <Link
              aria-label="Go to Favorites Page"
              to="/favorites"
              className="favorites"
              data-num={favoritesList.length}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ion-icon
                name="heart-outline"
                style={{ fontSize: "28px", color: "white" }}
              ></ion-icon>
            </Link>
          </div>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setExpand(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item>
              <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Home</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Shop Page"
                className="navbar-link"
                to="/shop"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>
            <Nav.Item className="expanded-cart">
              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={cartList.length}
              >
                <ion-icon
                  name="cart-outline"
                  style={{ fontSize: "28px", color: "white" }}
                ></ion-icon>
              </Link>
            </Nav.Item>
            <Nav.Item className="expanded-cart">
              <Link
                aria-label="Go to Favorites Page"
                to="/favorites"
                className="favorites"
                data-num={favoritesList.length}
              >
                <ion-icon
                  name="heart-outline"
                  style={{ fontSize: "28px", color: "white" }}
                ></ion-icon>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
