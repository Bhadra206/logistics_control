import { useState, useEffect } from "react";
import Validation from "../Validation/Validation";
import "./EmployeeForm.css";

export default function EmployeeForm({ token, employee, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    personalEmail: "",
    mobileNumber: "",
    postalAddress: "",
    gender: "",
    country: "",
    city: "",
    designation: "",
    basicPay: "",
    needTransportation: true,
    notes: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Populate formData when editing
  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        dateOfBirth: employee.dateOfBirth
          ? employee.dateOfBirth.split("T")[0]
          : "",
        gender:
          employee.gender !== null && employee.gender !== undefined
            ? String(employee.gender)
            : "",
        designation: employee.designation ?? "",
        basicPay: employee.basicPay ?? "",
        needTransportation: !!employee.needTransportation,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "needTransportation" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    try {
      const method = employee?.employeeID ? "PUT" : "POST";
      const url = employee?.employeeID
        ? `https://trainingapi.zerone-consulting.net/api.publish/api/employee/${employee.employeeID}`
        : `https://trainingapi.zerone-consulting.net/api.publish/api/employee`;

      // Include employeeID in payload if editing
      const payload = {
        ...(employee?.employeeID && { employeeID: employee.employeeID }),
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null,
        personalEmail: formData.personalEmail,
        mobileNumber: formData.mobileNumber,
        postalAddress: formData.postalAddress,
        gender: formData.gender !== "" ? parseInt(formData.gender, 10) : null,
        country: formData.country,
        city: formData.city,
        designation:
          formData.designation !== ""
            ? parseInt(formData.designation, 10)
            : null,
        basicPay:
          formData.basicPay !== "" ? parseFloat(formData.basicPay) : null,
        needTransportation: !!formData.needTransportation,
        notes: formData.notes,
        username: formData.username,
        password: formData.password,
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("API Error Response:", errText);
        throw new Error("Failed to save employee");
      }

      // Show success modal
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="employee-form" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

        {/* Form fields */}
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="personalEmail"
            value={formData.personalEmail}
            onChange={handleChange}
          />
          {errors.personalEmail && (
            <p className="error">{errors.personalEmail}</p>
          )}
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          {errors.mobileNumber && (
            <p className="error">{errors.mobileNumber}</p>
          )}
        </div>

        <div className="form-group">
          <label>Postal Address</label>
          <input
            type="text"
            name="postalAddress"
            value={formData.postalAddress}
            onChange={handleChange}
          />
          {errors.postalAddress && (
            <p className="error">{errors.postalAddress}</p>
          )}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">-----Select-----</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="">-----Select-----</option>
            <option value="1">Software Engineer</option>
            <option value="2">Senior Software Engineer</option>
            <option value="3">Team Lead</option>
            <option value="4">Project Manager</option>
            <option value="5">Business Analyst</option>
            <option value="6">Quality Assurance Engineer</option>
            <option value="7">DevOps Engineer</option>
            <option value="8">UI/UX Designer</option>
          </select>
          {errors.designation && <p className="error">{errors.designation}</p>}
        </div>

        <div className="form-group">
          <label>Basic Pay</label>
          <input
            type="number"
            name="basicPay"
            value={formData.basicPay}
            onChange={handleChange}
          />
          {errors.basicPay && <p className="error">{errors.basicPay}</p>}
        </div>

        <div className="form-group">
          <label>Need Transportation</label>
          <label>
            <input
              type="radio"
              name="needTransportation"
              value="true"
              checked={formData.needTransportation === true}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="needTransportation"
              value="false"
              checked={formData.needTransportation === false}
              onChange={handleChange}
            />
            No
          </label>
          {errors.needTransportation && (
            <p className="error">{errors.needTransportation}</p>
          )}
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            rows={4}
            cols={50}
            placeholder="Enter notes here..."
          />
        </div>
        {!employee && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="bottom-btn">
          <button onClick={handleSubmit} className="save-btn">
            Save
          </button>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
      {/* Success Modal */}
      {showSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <p>Employee saved successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
