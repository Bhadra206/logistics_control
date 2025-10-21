import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  CalendarDays,
  VenusAndMars,
  CheckCircle,
  Mail,
  MapPinHouse,
  BriefcaseBusiness,
  LockKeyhole,
} from "lucide-react";
import "./StaffForm.css";

export function StaffForm({ staff, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "Male",
    mobile: "",
    address: "",
    position: "",
    password: "",
    type: "staff",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (staff) {
      setFormData({
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        dob: staff.dob ? new Date(staff.dob).toISOString().split("T")[0] : "",
        gender: staff.gender,
        mobile: staff.mobile,
        address: staff.address,
        position: staff.position,
        password: staff.password,
        type: staff.type,
      });
    }
  }, [staff]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid Email is required";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.type.trim()) {
      newErrors.type = "Type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const staffData = {
      ...(staff && { _id: staff._id }),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      dob: formData.dob ? new Date(formData.dob) : null,
      gender: formData.gender,
      mobile: formData.mobile,
      address: formData.address.trim(),
      position: formData.position,
      password: formData.password,
      type: formData.type,
    };

    onSave(staffData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="staff-form">
      {/* Header */}
      <div className="staff-form-header">
        <button onClick={onCancel} className="staff-form-back-btn">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1>{staff ? "Edit Staff" : "Add New Staff"}</h1>
          <p>
            {staff
              ? "Update staff information"
              : "Enter staff details to add them to your fleet"}
          </p>
        </div>
      </div>

      <div className="staff-form-container">
        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <section>
            <h3>
              <User size={18} color="blue" /> Personal Information
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <User size={14} /> First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <User size={14} /> Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>
            </div>
          </section>

          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <Mail size={14} />
                  Email
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>
                  <CalendarDays size={14} /> Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  placeholder="Enter date of birth"
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
            </div>
          </section>

          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <VenusAndMars size={14} /> Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => {
                    handleInputChange("gender", e.target.value);
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="error">{errors.gender}</p>}
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

          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <MapPinHouse size={14} /> Address
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={formData.address}
                  onChange={(e) => {
                    handleInputChange("address", e.target.value);
                  }}
                  placeholder="Enter address"
                />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>

              <div className="form-group">
                <label>
                  <BriefcaseBusiness size={14} /> Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                  placeholder="Enter position"
                />
                {errors.position && <p className="error">{errors.position}</p>}
              </div>
            </div>
          </section>

          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <LockKeyhole size={14} /> Password
                </label>
                <input
                  type="password"
                  maxLength={10}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder={staff ? "Password is hidden" : "Enter password"}
                  disabled={!!staff}
                />

                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label>
                  <CheckCircle size={14} /> Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <CheckCircle size={18} /> {staff ? "Update staff" : "Add staff"}
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
