import { useState } from "react";
import "./OrderForm.css";
import { ArrowLeft } from "lucide-react";

export default function OrderForm({ order, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    customerName: order?.customerName || "",
    customerEmail: order?.customerEmail || "",
    customerMobile: order?.customerMobile || "",
    placeOfCustomer: order?.placeOfCustomer || "",
    startLoc: order?.startLoc || "Kochi",
    dropLoc: order?.dropLoc || "",
    startDate: order?.startDate
      ? new Date(order.startDate).toISOString().split("T")[0]
      : "",
    endDate: order?.endDate
      ? new Date(order.endDate).toISOString().split("T")[0]
      : "",
    typeOfService: order?.typeOfService || "passenger",
    numPassengers: order?.numPassengers || "",
    weight: order?.weight || "",
    distance: order?.distance || "",
    driver: order?.driver || "",
    vehicle: order?.vehicle || "",
    TotalCost: order?.TotalCost || "",
    overtimeHours: order?.overtimeHours || "",
    status: order?.status || "Pending",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
       _id: order?._id || formData._id,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      numPassengers:
        formData.typeOfService === "passenger"
          ? Number(formData.numPassengers)
          : undefined,
      weight:
        formData.typeOfService === "goods"
          ? Number(formData.weight)
          : undefined,
      distance: Number(formData.distance),
      TotalCost: formData.TotalCost ? Number(formData.TotalCost) : undefined,
      overtimeHours: formData.overtimeHours
        ? Number(formData.overtimeHours)
        : undefined,
      driver: formData.driver || undefined,
      vehicle: formData.vehicle || undefined,
      status: order?.id ? formData.status : "Pending",
    };

    onSave(formattedData);
  };

  const isEditing = !!order?._id;

  return (
    <div className="order-form-container">
      <div className="order-form-header">
        <button className="btn-outline" onClick={onCancel}>
          <ArrowLeft className="left-icon" />
        </button>
        <div>
          <h2>{isEditing ? "Edit Order" : "Create New Order"}</h2>
          <p>{order ? "Update order information" : "Enter Order details"}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="order-form">
        {/* Customer Details */}
        <div className="order-form-row">
          <div className="order-form-group">
            <label>Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleChange("customerName", e.target.value)}
              required
            />
          </div>
          <div className="order-form-group">
            <label>Customer Email</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => handleChange("customerEmail", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="order-form-row">
          <div className="order-form-group">
            <label>Customer Mobile</label>
            <input
              type="text"
              value={formData.customerMobile}
              onChange={(e) => handleChange("customerMobile", e.target.value)}
              required
            />
          </div>

          <div className="order-form-group">
            <label>Place of Customer</label>
            <input
              type="text"
              value={formData.placeOfCustomer}
              onChange={(e) => handleChange("placeOfCustomer", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Locations */}
        <div className="order-form-row">
          <div className="order-form-group">
            <label>Start Location</label>
            <input
              type="text"
              value={formData.startLoc}
              onChange={(e) => handleChange("startLoc", e.target.value)}
              required
            />
          </div>
          <div className="order-form-group">
            <label>Drop Location</label>
            <input
              type="text"
              value={formData.dropLoc}
              onChange={(e) => handleChange("dropLoc", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="order-form-row">
          <div className="order-form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
            />
          </div>
          <div className="order-form-group">
            <label>End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Type of Service */}
        <div className="order-form-group">
          <label>Type of Service</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="passenger"
                checked={formData.typeOfService === "passenger"}
                onChange={(e) => handleChange("typeOfService", e.target.value)}
              />
              Passenger
            </label>
            <label>
              <input
                type="radio"
                value="goods"
                checked={formData.typeOfService === "goods"}
                onChange={(e) => handleChange("typeOfService", e.target.value)}
              />
              Goods
            </label>
          </div>
        </div>

        <div className="order-form-row">
          {formData.typeOfService === "passenger" && (
            <div className="order-form-group">
              <label>Number of Passengers</label>
              <input
                type="number"
                value={formData.numPassengers}
                onChange={(e) => handleChange("numPassengers", e.target.value)}
                required
              />
            </div>
          )}
          {formData.typeOfService === "goods" && (
            <div className="order-form-group">
              <label>Weight (Ton)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                required
              />
            </div>
          )}

          <div className="order-form-group">
            <label>Distance (km)</label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) => handleChange("distance", e.target.value)}
              required
            />
          </div>
        </div>

        {/* --- Show these fields only when editing --- */}
        {isEditing && (
          <>
            <div className="order-form-row">
              <div className="order-form-group">
                <label>Driver</label>
                <input
                  type="text"
                  value={formData.driver || ""}
                  onChange={(e) => handleChange("driver", e.target.value)}
                  readOnly
                />
              </div>
              <div className="order-form-group">
                <label>Vehicle</label>
                <input
                  type="text"
                  value={formData.vehicle || ""}
                  onChange={(e) => handleChange("vehicle", e.target.value)}
                  readOnly
                />
              </div>
            </div>

            <div className="order-form-row">
              <div className="order-form-group">
                <label>Total Cost</label>
                <input
                  type="number"
                  value={formData.TotalCost || ""}
                  onChange={(e) => handleChange("TotalCost", e.target.value)}
                  readOnly
                />
              </div>
              <div className="order-form-group">
                <label>Overtime Hours</label>
                <input
                  type="number"
                  value={formData.overtimeHours || ""}
                  onChange={(e) =>
                    handleChange("overtimeHours", e.target.value)
                  }
                  readOnly
                />
              </div>
            </div>

            <div className="order-form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Allocated">Allocated</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="button-group">
          <button type="button" className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn save">
            {isEditing ? "Update Order" : "Create Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
