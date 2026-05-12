import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./slidercard.css";

interface SlideCardProps {
  title: string;
  desc: string;
  cover: string;
}

const SlideCard = ({ title, desc, cover }: SlideCardProps) => {
  const navigate = useNavigate();

  return (
    <Container className="box">
      <Row>
        <Col md={6}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <button className="btn-primary" onClick={() => navigate("/shop")}>
            Shop Now
          </button>
        </Col>
        <Col md={6}>
          <img src={cover} alt="#" />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;
