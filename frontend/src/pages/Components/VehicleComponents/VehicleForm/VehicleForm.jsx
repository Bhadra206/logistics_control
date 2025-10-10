import { useEffect, useState } from "react";
import { ArrowLeft, Car, CheckCircle, FileDiff } from "lucide-react";
import "./VehicleForm.css";

export function VehicleForm({ vehicle, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    registrationNo: "",
    purpose: "",
    ratePerKm: "",
    type: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name,
        model: vehicle.model,
        registrationNo: vehicle.registrationNo,
        purpose: vehicle.purpose,
        ratePerKm: vehicle.ratePerKm.toString(),
        type: vehicle.type,
        status: vehicle.status,
      });
    }
  }, [driver]);

  const validationForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is requred";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Model & Make is required";
    }

    if (!formData.registrationNo.trim()) {
      newErrors.registrationNo = "Registration Number is requred";
    }

    if (!formData.ratePerKm.trim()) {
      newErrors.ratePerKm = "Rate per Km is requred";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDeault();
    if (!validationForm()) return;

    const vehicleData = {
      ...(vehicle && { _id: vehicle._id }),
      name: formData.name.trim(),
      model: formData.model,
      registrationNo: formData.registrationNo,
      ratePerKm: Number(formData.ratePerKm),
      purpose: formData.purpose,
      type: formData.type,
      status: formData.status === "Archived" ? "Inactive" : formData.status,
    };
    onSave(vehicleData);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="vehicle-form">
      {/* Header */}
      <div className="vehicle-form-header">
        <button onClick={onCancel} className="vehicle-form-back-btn">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1>{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h1>
          <p>
            {vehicle
              ? "Update Vehicle Information"
              : "Enter vehicle details to add them to your fleet"}
          </p>
        </div>
      </div>

      <div className="vehicle-form-container">
        <form onSumbit={handleSubmit}>
          {/* Vehicle Info */}
          <section>
            <h3>
              <Car size={18} color="purple" /> Vehicle Information
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Vehicle Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter Vehicle Name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>Make & Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="e.g., Toyota Camry"
                />
                {errors.model && <p className="error">{errors.model}</p>}
              </div>
            </div>
          </section>
          {/* Reg No. & Rate */}
          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNo}
                  onChange={(e) =>
                    handleInputChange("registrationNo", e.target.value)
                  }
                  placeholder="e.g., MH01AB1234"
                />
                {errors.registrationNo && (
                  <p className="error">{errors.registrationNo}</p>
                )}
              </div>
              <div className="form-group">
                <label>Per KM Rate</label>
                <input
                  type="text"
                  value={formData.ratePerKm}
                  onChange={(e) =>
                    handleInputChange("ratePerKm", e.target.value)
                  }
                  placeholder="Enter Rate per kilometer"
                />
                {errors.ratePerKm && (
                  <p className="error">{errors.ratePerKm}</p>
                )}
              </div>
            </div>
          </section>
          {/* Purpose & type */}
          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>Purpose</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                >
                  <option value="passenger">Passenger</option>
                  <option value="goods">Goods</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                >
                  <option value="LMV">LMV (Light Motor Vehicle)</option>
                  <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                </select>
              </div>
            </div>
          </section>
          <section>
            <div className="form-grid">
              <div className="form-group">
                <label>Staus</label>
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
