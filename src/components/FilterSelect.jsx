import Select from "react-select";

const options = [
  { value: "clothes", label: "Clothes" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "shoes", label: "Shoes" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

const customStyles = {
  control: (provided) => ({
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
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    fontWeight: "500",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.8)",
  }),
};

const FilterSelect = ({ setFilterList, products }) => {
  const handleChange = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setFilterList(
        products.filter((item) => item.category === selectedOption.value),
      );
    } else {
      setFilterList(products); // Show all products if no filter selected
    }
  };

  return (
    <Select
      options={options}
      placeholder="Filter By Category"
      styles={customStyles}
      onChange={handleChange}
      isClearable={true}
    />
  );
};

export default FilterSelect;
