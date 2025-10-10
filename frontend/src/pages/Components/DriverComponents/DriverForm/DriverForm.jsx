import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  IndianRupee,
  Clock,
  Car,
  CheckCircle,
} from "lucide-react";
import "./DriverForm.css";

export function DriverForm({ driver, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    perDayRate: "",
    overTimeRate: "",
    licence: "LMV",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name,
        mobile: driver.mobile,
        perDayRate: driver.perDayRate.toString(),
        overTimeRate: driver.overTimeRate.toString(),
        licence: driver.licence,
        status: driver.status,
      });
    }
  }, [driver]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (
      !formData.perDayRate ||
      isNaN(Number(formData.perDayRate)) ||
      Number(formData.perDayRate) <= 0
    ) {
      newErrors.perDayRate = "Valid per day rate is required";
    }

    if (
      !formData.overTimeRate ||
      isNaN(Number(formData.overTimeRate)) ||
      Number(formData.overTimeRate) <= 0
    ) {
      newErrors.overTimeRate = "Valid overtime rate is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const driverData = {
      ...(driver && { _id: driver._id }),
      name: formData.name.trim(),
      mobile: formData.mobile,
      perDayRate: Number(formData.perDayRate),
      overTimeRate: Number(formData.overTimeRate),
      licence: formData.licence,
      status: formData.status === "Archived" ? "Inactive" : formData.status,
    };

    onSave(driverData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="driver-form">
      {/* Header */}
      <div className="driver-form-header">
        <button onClick={onCancel} className="driver-form-back-btn">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1>{driver ? "Edit Driver" : "Add New Driver"}</h1>
          <p>
            {driver
              ? "Update driver information"
              : "Enter driver details to add them to your fleet"}
          </p>
        </div>
      </div>

      <div className="driver-form-container">
        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <section>
            <h3>
              <User size={18} color="blue"/> Personal Information
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <User size={14} /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>
                  <Phone size={14} /> Mobile Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                />
                {errors.mobile && <p className="error">{errors.mobile}</p>}
              </div>
            </div>
          </section>

          {/* Rate Info */}
          <section>
            <h3>
              <IndianRupee size={18} color="green" /> Rate Information
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <IndianRupee size={14} /> Per Day Rate
                </label>
                <input
                  type="number"
                  value={formData.perDayRate}
                  onChange={(e) =>
                    handleInputChange("perDayRate", e.target.value)
                  }
                  placeholder="Enter daily rate"
                />
                {errors.perDayRate && (
                  <p className="error">{errors.perDayRate}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <Clock size={14} /> Overtime Rate (per hour)
                </label>
                <input
                  type="number"
                  value={formData.overTimeRate}
                  onChange={(e) =>
                    handleInputChange("overTimeRate", e.target.value)
                  }
                  placeholder="Enter hourly overtime rate"
                />
                {errors.overTimeRate && (
                  <p className="error">{errors.overTimeRate}</p>
                )}
              </div>
            </div>
          </section>

          {/* licence & Status */}
          <section>
            <h3>
              <Car size={18} color="purple"/> licence & Status
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <Car size={14} /> licence Type
                </label>
                <select
                  value={formData.licence}
                  onChange={(e) => handleInputChange("licence", e.target.value)}
                >
                  <option value="LMV">LMV (Light Motor Vehicle)</option>
                  <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <CheckCircle size={14} /> Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <CheckCircle size={18} />{" "}
              {driver ? "Update Driver" : "Add Driver"}
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
