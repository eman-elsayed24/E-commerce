import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../app/features/cart/cartSlice";
import { favoritesActions } from "../../app/features/favorites/favoritesSlice";
import { formatPrice } from "../../utils/formatPrice";
import type { Product } from "../../types/product";

interface ProductCardProps {
  title: string | null;
  productItem: Product;
}

const ProductCard = ({ title, productItem }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { favoritesList } = useAppSelector((state) => state.favorites);
  const { cartList } = useAppSelector((state) => state.cart);

  const isFavorite = favoritesList.some((fav) => fav.id === productItem.id);
  const isInCart = cartList.some((item) => item.id === productItem.id);

  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handelAdd = (item: Product) => {
    dispatch(addToCart({ product: item, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(favoritesActions.removeFromFavorites(productItem.id));
      toast.info("Removed from favorites!");
    } else {
      dispatch(favoritesActions.addToFavorites({ product: productItem }));
      toast.success("Added to favorites!");
    }
  };

  return (
    <Col xl={3} lg={3} md={6} sm={6} xs={6} className="product mtop">
      {title === "Big Discount" && productItem.discount != null ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imgUrl}
        alt=""
      />
      <div
        className="product-like"
        onClick={handleFavorite}
        style={{ cursor: "pointer" }}
      >
        <ion-icon
          name={isFavorite ? "heart" : "heart-outline"}
          style={{
            color: isFavorite ? "#e74c3c" : "inherit",
            fontSize: "22px",
          }}
        ></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>{formatPrice(productItem.price)}</h4>
          <button
            aria-label="Add"
            type="submit"
            className={`add ${isInCart ? "in-cart" : ""}`}
            onClick={() => !isInCart && handelAdd(productItem)}
            disabled={isInCart}
          >
            <ion-icon name={isInCart ? "checkmark" : "add"}></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
