import { useEffect, useState } from "react";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import "./EmployeeList.css";
import SearchEmployees from "../SearchEmployees/SearchEmployees";

export default function EmployeeList({ token, handleLogout }) {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Fetch paged employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(
        `https://trainingapi.zerone-consulting.net/api.publish/api/employee/paged/10/${page}/firstName/asc`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
      setSearchResult(null);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fetch total employees (all, not paged)
  const fetchTotalEmployees = async () => {
    try {
      const res = await fetch(
        `https://trainingapi.zerone-consulting.net/api.publish/api/employee`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch all employees");
      const data = await res.json();
      setTotalEmployees(data.length); // store total count
    } catch (err) {
      console.error("Total fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTotalEmployees();
  }, [page]);

  const handleDelete = async (employeeID) => {
    const userConfirmation = window.confirm(
      "Do you want to delete this person?"
    );
    if (!userConfirmation) return;

    try {
      const res = await fetch(
        `https://trainingapi.zerone-consulting.net/api.publish/api/employee/${employeeID}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete employee");
      fetchEmployees();
      fetchTotalEmployees();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <h1 className="employee-heading">Employee List</h1>
      <h2>Total Employees: {totalEmployees}</h2>

      <div className="top-button">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>

        <SearchEmployees token={token} onEmployeeSelect={setSearchResult} />

        <button onClick={() => setShowForm(true)} className="add-btn">
          Add Employee
        </button>
      </div>

      {showForm && (
        <EmployeeForm
          token={token}
          employee={editEmployee}
          onClose={() => {
            setShowForm(false);
            setEditEmployee(null);
            fetchEmployees();
          }}
        />
      )}

      <div className="card-wrapper">
        {searchResult ? (
          <EmployeeCard
            employee={searchResult}
            onEdit={() => {
              setEditEmployee(searchResult);
              setShowForm(true);
            }}
            onDelete={() => handleDelete(searchResult.employeeID)}
          />
        ) : (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.employeeID}
              employee={emp}
              onEdit={() => {
                setEditEmployee(emp);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(emp.employeeID)}
            />
          ))
        )}
      </div>

      {!searchResult && (
        <div className="bottom-btn">
          <button
            className="prev"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            ⬅ Prev
          </button>
          <button className="next" onClick={() => setPage(page + 1)}>
            ➡ Next
          </button>
        </div>
      )}
    </div>
  );
}
