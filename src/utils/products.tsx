import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
} from "../services/api";
import type { Product } from "../types/product";

import sofaSlide from "../Images/1.png";
import watchSlide from "../Images/watch-07.png";
import phone08 from "../Images/phone-08.png";
import wireless01 from "../Images/2.png";

export const SliderData = [
  {
    id: 1,
    title: "Exclusive Deals Up To 50% Off",
    desc: "Shop our premium collection and enjoy incredible savings on your favorite items today!",
    cover: sofaSlide,
  },
  {
    id: 2,
    title: "Tech Innovation Store",
    desc: "Discover the latest gadgets and electronics with advanced features and competitive pricing.",
    cover: phone08,
  },
  {
    id: 3,
    title: "Luxury Fragrance Collection",
    desc: "Discover our exclusive range of premium perfumes crafted for those who appreciate elegance.",
    cover: wireless01,
  },
  {
    id: 4,
    title: "Timeless Style Collection",
    desc: "Elevate your fashion game with our curated selection of elegant watches and accessories.",
    cover: watchSlide,
  },
];

export const serviceData = [
  {
    icon: <ion-icon name="checkmark-circle"></ion-icon>,
    title: "Quality Guaranteed",
    subtitle: "Premium products with quality assurance.",
    bg: "#f0f8ff",
  },
  {
    icon: <ion-icon name="lock-closed"></ion-icon>,
    title: "Secure Checkout",
    subtitle: "Your transactions are fully encrypted.",
    bg: "#f0fff4",
  },
  {
    icon: <ion-icon name="flash"></ion-icon>,
    title: "Fast Delivery",
    subtitle: "Quick shipping to your doorstep.",
    bg: "#fffaf0",
  },
  {
    icon: <ion-icon name="help-circle"></ion-icon>,
    title: "Expert Help",
    subtitle: "Dedicated support team available.",
    bg: "#faf5ff",
  },
];

export const getProducts = async (limit = 20, skip = 0) => {
  return fetchProducts(limit, skip);
};

export const getProductById = async (id: string) => {
  return fetchProductById(id);
};

export const getProductsByCategory = async (category: string) => {
  return fetchProductsByCategory(category);
};

export const getDiscountProducts = async () => {
  const result = await fetchProducts(8);
  return result.products.map((product: Product) => ({
    ...product,
    discount: Math.floor(Math.random() * 30) + 10,
  }));
};

export const discoutProducts: Product[] = [];
export const products: Product[] = [];
