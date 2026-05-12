import { Fragment, useState, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { getProducts, getDiscountProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import Skeleton from "../components/Skeleton/Skeleton";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import type { Product } from "../types/product";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const [allProducts, discountItems] = await Promise.all([
          getProducts(),
          getDiscountProducts(),
        ]);

        setProducts(allProducts.products);
        setDiscountProducts(discountItems);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const newArrivalData = products.slice(0, 8);
  const bestSales = products.slice(0, 8);

  useWindowScrollToTop();

  if (loading) {
    return (
      <Fragment>
        <SliderHome />
        <Wrapper />
        <Skeleton />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discountProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
