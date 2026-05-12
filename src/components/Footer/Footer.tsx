import "./style.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="footer-logo">
              <ion-icon name="storefront"></ion-icon>
              <h1>Prime Market</h1>
            </div>
            <p>
              Your trusted destination for premium products and exceptional
              shopping experience. We're committed to delivering quality items
              and outstanding customer service to every shopper.
            </p>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Quick Links</h2>
            <ul>
              <li>Shop Now</li>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Shipping Info</li>
              <li>Return Policy</li>
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Support</h2>
            <ul>
              <li>Contact Support</li>
              <li>FAQ</li>
              <li>Order Status</li>
              <li>Bulk Orders</li>
              <li>Warranty Info</li>
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Get In Touch</h2>
            <ul>
              <li>123 Commerce Street, New York, NY 10001, USA</li>
              <li>Email: support@ourstore.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
