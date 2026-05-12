import Select, { type SingleValue, type StylesConfig } from "react-select";
import type { Product } from "../types/product";

type Option = { value: string; label: string };

const options: Option[] = [
  { value: "smartphones", label: "Smartphones" },
  { value: "laptops", label: "Laptops" },
  { value: "furniture", label: "Furniture" },
  { value: "beauty", label: "Beauty" },
  { value: "mens-watches", label: "Men's Watches" },
  { value: "womens-watches", label: "Women's Watches" },
  { value: "womens-bags", label: "Women's Bags" },
  { value: "sports-accessories", label: "Sports Accessories" },
];

const customStyles = {
  control: (provided: Record<string, unknown>) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0 4px 15px rgba(15, 52, 96, 0.2)",
    width: "220px",
    height: "45px",
    cursor: "pointer",
  }),
  option: (
    provided: Record<string, unknown>,
    state: { isSelected: boolean },
  ) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided: Record<string, unknown>) => ({
    ...provided,
    color: "white",
    fontWeight: "500",
  }),
  placeholder: (provided: Record<string, unknown>) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.8)",
  }),
} as StylesConfig<Option, false>;

interface FilterSelectProps {
  setFilterList: (list: Product[]) => void;
  products: Product[];
}

const FilterSelect = ({ setFilterList, products }: FilterSelectProps) => {
  const handleChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption?.value) {
      setFilterList(
        products.filter((item) => item.category === selectedOption.value),
      );
    } else {
      setFilterList(products);
    }
  };

  return (
    <Select<Option, false>
      options={options}
      placeholder="Filter By Category"
      styles={customStyles}
      onChange={handleChange}
      isClearable
      openMenuOnFocus={true}
      openMenuOnClick={true}
      closeMenuOnSelect={true}
      blurInputOnSelect={false}
      captureMenuScroll={false}
      menuShouldScrollIntoView={false}
    />
  );
};

export default FilterSelect;
