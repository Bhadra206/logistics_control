import { useState, useRef } from "react";
import {
  FaUserCircle,
  FaMale,
  FaFemale,
  FaUserTie,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import "./EmployeeCard.css";

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);
  const hoverTimer = useRef(null);

  const designationMap = {
    1: "Software Engineer",
    2: "Senior Software Engineer",
    3: "Team Lead",
    4: "Project Manager",
    5: "Business Analyst",
    6: "Quality Assurance Engineer",
    7: "DevOps Engineer",
    8: "UI/UX Designer",
  };

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setFlipped(true);
    }, 3000);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setFlipped(false);
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`card-container ${flipped ? "flipped" : ""}`}>
        <div className="card-front">
          <div className="card-image">
            <div className="image">
              {employee.notes ? (
                <img src={employee.notes} alt="" />
              ) : (
                <FaUserCircle size="4em" />
              )}
            </div>
          </div>
          <h3 className="emp-title">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="info">ID : {employee.employeeID}</p>
          <p className="info">
            {employee.gender === 0 ? (
              <>
                <FaMale />: Male
              </>
            ) : employee.gender === 1 ? (
              <>
                <FaFemale />: Female
              </>
            ) : (
              <>⚧: Other</>
            )}
          </p>
          <p className="info">
            <FaUserTie /> :
            {designationMap[employee.designation] || "Not Specified"}
          </p>
          <p className="info">
            <FaPhone /> : {employee.mobileNumber}
          </p>
          <p className="info">
            <FaEnvelope /> : {employee.personalEmail}
          </p>
          <button onClick={onDelete} className="delete-btn">
            🗑 Delete
          </button>
          <button onClick={onEdit} className="edit-btn">
            ✒ Edit
          </button>
        </div>

        <div className="card-back">
          <h3 className="emp-title">Details</h3>
          <p className="info">
            Date of Birth :{" "}
            {new Date(employee.dateOfBirth).toLocaleDateString("en-GB")}
          </p>
          <p className="info">Address : {employee.postalAddress}</p>
          <p className="info">Country : {employee.country}</p>
          <p className="info">City : {employee.city}</p>
          <p className="info">Salary : {employee.basicPay}</p>
          <p className="info">
            Need Transportation : {employee.needTransportation ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}
