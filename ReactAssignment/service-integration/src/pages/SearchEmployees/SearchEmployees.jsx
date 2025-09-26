// SearchEmployees.jsx
import { useState, useEffect } from "react";
import Select from "react-select";

export default function SearchEmployees({ token, onEmployeeSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(
          `https://trainingapi.zerone-consulting.net/api.publish/api/employee`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();

        const sorted = [...data].sort((a, b) => a.employeeID - b.employeeID);

        const formatted = sorted.map((emp) => ({
          value: emp.employeeID || emp.firstName,
          label: `ID: ${emp.employeeID}-${emp.firstName} ${emp.lastName}`,
        }));

        setOptions(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchEmployees();
  }, [token]);

  const handleChange = async (option) => {
    if (!option) {
      onEmployeeSelect(null);
      return;
    }

    try {
      const res = await fetch(
        `https://trainingapi.zerone-consulting.net/api.publish/api/employee/${option.value}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Employee not found");
      const data = await res.json();
      onEmployeeSelect(data);
    } catch (err) {
      console.error("Search error:", err);
      onEmployeeSelect(null);
    }
  };

  return (
    <Select
      onChange={handleChange}
      options={options}
      placeholder="Select Employee"
      isClearable
      isSearchable
      filterOption={(option, inputValue) => {
        const id = String(option.value);
        const label = option.label.toLowerCase();
        const search = inputValue.toLowerCase();
        return id.startsWith(inputValue) || label.includes(search);
      }}
    />
  );
}
