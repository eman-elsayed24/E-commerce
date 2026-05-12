import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";

const Cart = () => {
  const { cartList } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <div className="empty-cart">
                <ion-icon name="cart"></ion-icon>
                <h1>Your Cart is Empty</h1>
                <p>Add some products to get started!</p>
              </div>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content">
                        <Col xs={12} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            {formatPrice(item.price)} * {item.qty}
                            <span>{formatPrice(productQty)}</span>
                          </h4>
                          <div className="cartControl">
                            <button
                              className="incCart"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => dispatch(decreaseQty(item))}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>{formatPrice(totalPrice)}</h3>
              </div>
              {cartList.length > 0 && (
                <button
                  onClick={() => navigate("/checkout")}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "12px",
                    background:
                      "linear-gradient(135deg, #0f3460 0%, #1e5799 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-1px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <i className="fa fa-lock"></i>
                  Proceed to Checkout
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
