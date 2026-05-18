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
    backgroundColor: "#ffffff",
    color: "#0f3460",
    borderRadius: "12px",
    border: "2px solid #e8ecef",
    boxShadow: "0 2px 8px rgba(15, 52, 96, 0.08)",
    width: "240px",
    minHeight: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#0f3460",
      boxShadow: "0 4px 12px rgba(15, 52, 96, 0.15)",
    },
  }),
  menu: (provided: Record<string, unknown>) => ({
    ...provided,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(15, 52, 96, 0.15)",
    border: "1px solid #e8ecef",
    marginTop: "8px",
    width: "240px",
    zIndex: 99999,
  }),
  menuPortal: (provided: Record<string, unknown>) => ({
    ...provided,
    zIndex: 99999,
  }),
  menuList: (provided: Record<string, unknown>) => ({
    ...provided,
    padding: "8px",
    maxHeight: "300px",
  }),
  option: (
    provided: Record<string, unknown>,
    state: { isSelected: boolean },
  ) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    cursor: "pointer",
    padding: "12px 16px",
    fontWeight: state.isSelected ? "600" : "500",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided: Record<string, unknown>) => ({
    ...provided,
    color: "#0f3460",
    fontWeight: "600",
  }),
  placeholder: (provided: Record<string, unknown>) => ({
    ...provided,
    color: "#0f3460",
    fontWeight: "600",
  }),
  dropdownIndicator: (provided: Record<string, unknown>) => ({
    ...provided,
    color: "#0f3460",
    "&:hover": {
      color: "#0f3460",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  clearIndicator: (provided: Record<string, unknown>) => ({
    ...provided,
    color: "#0f3460",
    "&:hover": {
      color: "#e74c3c",
    },
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
      menuPortalTarget={document.body}
      menuPosition="fixed"
    />
  );
};

export default FilterSelect;
