import { useState, type ChangeEvent } from "react";
import "./searchbar.css";
import type { Product } from "../../types/product";

interface SearchBarProps {
  setFilterList: (list: Product[]) => void;
  products: Product[];
}

const SearchBar = ({ setFilterList, products }: SearchBarProps) => {
  const [searchWord, setSearchWord] = useState("");

  const handelChange = (input: ChangeEvent<HTMLInputElement>) => {
    const value = input.target.value;
    setSearchWord(value);

    if (value.trim() === "") {
      setFilterList(products);
    } else {
      setFilterList(
        products.filter(
          (item) =>
            item.productName?.toLowerCase().includes(value.toLowerCase()) ||
            item.category?.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products"
        value={searchWord}
        onChange={handelChange}
      />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
