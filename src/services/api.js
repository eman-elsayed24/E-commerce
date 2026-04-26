// API service for fetching products from Platzi Fake Store API
const API_BASE_URL = "https://api.escuelajs.co/api/v1";

// Fetch all products with optional limit
export const fetchProducts = async (limit = 50) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();

    // Transform API data to match our app structure
    return products.map((product) => ({
      id: product.id.toString(),
      productName: product.title,
      imgUrl: product.images[0] || "https://placehold.co/400x400",
      category: product.category.name.toLowerCase(),
      price: product.price,
      shortDesc: product.description.substring(0, 100) + "...",
      description: product.description,
      reviews: [
        {
          rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5
          text: "Great product! Highly recommended.",
        },
      ],
      avgRating: 4.5 + Math.random() * 0.5,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category, limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?categoryId=${getCategoryId(category)}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }
    const products = await response.json();

    return products.map((product) => ({
      id: product.id.toString(),
      productName: product.title,
      imgUrl: product.images[0] || "https://placehold.co/400x400",
      category: product.category.name.toLowerCase(),
      price: product.price,
      shortDesc: product.description.substring(0, 100) + "...",
      description: product.description,
      reviews: [
        {
          rating: 4.5 + Math.random() * 0.5,
          text: "Great product! Highly recommended.",
        },
      ],
      avgRating: 4.5 + Math.random() * 0.5,
    }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();

    return {
      id: product.id.toString(),
      productName: product.title,
      imgUrl: product.images[0] || "https://placehold.co/400x400",
      images: product.images || [
        product.images[0] || "https://placehold.co/400x400",
      ], // Multiple images
      category: product.category.name.toLowerCase(),
      price: product.price,
      shortDesc: product.description.substring(0, 150) + "...",
      description: product.description,
      reviews: [
        {
          rating: 4.7,
          text: "Excellent quality and fast delivery!",
        },
        {
          rating: 4.8,
          text: "Love this product, exactly as described.",
        },
      ],
      avgRating: 4.7,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Helper function to map category names to IDs
const getCategoryId = (categoryName) => {
  const categoryMap = {
    clothes: 1,
    electronics: 2,
    furniture: 3,
    shoes: 4,
    miscellaneous: 5,
  };
  return categoryMap[categoryName.toLowerCase()] || 1;
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
