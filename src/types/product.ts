export interface ProductReview {
  rating: number;
  text: string;
}

export interface Product {
  id: string;
  productName: string;
  imgUrl: string;
  images: string[];
  category: string;
  price: number;
  discount: number | null;
  shortDesc: string;
  description: string;
  reviews: ProductReview[];
  avgRating: number;
}

export interface CartItem extends Product {
  qty: number;
}
