import { useState } from "react";
import Select from "react-select";

export default function DropDown() {
  const [selectedOption, setSelectedOption] = useState(null);

  const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Belgium", label: "Belgium" },
    { value: "Brazil", label: "Brazil" },
    { value: "Canada", label: "Canada" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Denmark", label: "Denmark" },
    { value: "Egypt", label: "Egypt" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Germany", label: "Germany" },
    { value: "Greece", label: "Greece" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Italy", label: "Italy" },
    { value: "Japan", label: "Japan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Mexico", label: "Mexico" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Norway", label: "Norway" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Qatar", label: "Qatar" },
    { value: "Russia", label: "Russia" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Singapore", label: "Singapore" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Korea", label: "South Korea" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Thailand", label: "Thailand" },
    { value: "Turkey", label: "Turkey" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Vietnam", label: "Vietnam" },
  ];

  const handleChange = (countries) => {
    setSelectedOption(countries);
  };

  return (
    <div>
      <h1>Countries List</h1>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={countries}
        placeholder="Select or type the Country"
        isClearable
        isSearchable
        filterOption={(option, inputValue) =>
          option.label.toLowerCase().startsWith(inputValue.toLowerCase())
        }
      />
    </div>
  );
}
