// API service for fetching products from DummyJSON
const API_BASE_URL = "https://dummyjson.com";

// Transform a single product to match our app structure
const transformProduct = (product) => ({
  id: product.id.toString(),
  productName: product.title,
  imgUrl: product.thumbnail,
  images: product.images || [product.thumbnail],
  category: product.category.toLowerCase(),
  price: product.price,
  discount: product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null,
  shortDesc: product.description.substring(0, 100) + "...",
  description: product.description,
  reviews: [
    {
      rating: product.rating || 4.5,
      text: "Great product! Highly recommended.",
    },
  ],
  avgRating: product.rating || 4.5,
});

// Fetch all products with optional limit
export const fetchProducts = async (limit = 20, skip = 0) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return {
      products: data.products.map(transformProduct),
      total: data.total,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
    );
    if (!response.ok) throw new Error("Failed to fetch products by category");
    const data = await response.json();
    return data.products.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const product = await response.json();
    return transformProduct(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
