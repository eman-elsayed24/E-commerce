import type { Product } from "../types/product";

const API_BASE_URL = "https://dummyjson.com";

interface DummyProduct {
  id: number;
  title: string;
  thumbnail: string;
  images?: string[];
  category: string;
  price: number;
  discountPercentage?: number;
  description: string;
  rating?: number;
}

const transformProduct = (product: DummyProduct): Product => ({
  id: product.id.toString(),
  productName: product.title,
  imgUrl: product.thumbnail,
  images: product.images?.length ? product.images : [product.thumbnail],
  category: product.category.toLowerCase(),
  price: product.price,
  discount: product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null,
  shortDesc: product.description.substring(0, 100) + "...",
  description: product.description,
  reviews: [
    {
      rating: product.rating ?? 4.5,
      text: "Great product! Highly recommended.",
    },
  ],
  avgRating: product.rating ?? 4.5,
});

export const fetchProducts = async (limit = 20, skip = 0) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = (await response.json()) as {
      products: DummyProduct[];
      total: number;
    };
    return {
      products: data.products.map(transformProduct),
      total: data.total,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] as Product[], total: 0 };
  }
};

export const fetchProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
    );
    if (!response.ok) throw new Error("Failed to fetch products by category");
    const data = (await response.json()) as { products: DummyProduct[] };
    return data.products.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [] as Product[];
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const product = (await response.json()) as DummyProduct;
    return transformProduct(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return (await response.json()) as string[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [] as string[];
  }
};
