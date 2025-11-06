import { useState, useEffect } from "react";
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
    status: order?.status || "Pending",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || "",
        customerEmail: order.customerEmail || "",
        customerMobile: order.customerMobile || "",
        placeOfCustomer: order.placeOfCustomer || "",
        startLoc: order.startLoc || "Kochi",
        dropLoc: order.dropLoc || "",
        startDate: order.startDate
          ? new Date(order.startDate).toISOString().split("T")[0]
          : "",
        endDate: order.endDate
          ? new Date(order.endDate).toISOString().split("T")[0]
          : "",
        typeOfService: order.typeOfService || "passenger",
        numPassengers: order.numPassengers || "",
        weight: order.weight ?? "",
        distance: order.distance || "",
        status: order.status || "Pending",
      });
    }
  }, [order]);

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
        formData.typeOfService === "goods" ? Number(formData.weight) : null,
      distance: Number(formData.distance),
      status: order?._id ? formData.status : "Pending",
    };

    onSave(formattedData);
  };

  const isEditing = !!order?._id;

  const isEditable =
    !isEditing ||
    formData.status === "Pending" ||
    formData.status === "Allocated";

  return (
    <div className="order-form-container">
      <div className="order-form-header">
        <button className="btn-outline" onClick={onCancel}>
          <ArrowLeft className="left-icon" />
        </button>
        <div>
          <h2>{isEditing ? "Edit Order" : "Create New Order"}</h2>
          <p>
            {isEditing ? "Update order information" : "Enter order details"}
          </p>
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
              disabled={!isEditable}
            />
          </div>
          <div className="order-form-group">
            <label>Customer Email</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => handleChange("customerEmail", e.target.value)}
              required
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>

          <div className="order-form-group">
            <label>Place of Customer</label>
            <input
              type="text"
              value={formData.placeOfCustomer}
              onChange={(e) => handleChange("placeOfCustomer", e.target.value)}
              required
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
          <div className="order-form-group">
            <label>Drop Location</label>
            <input
              type="text"
              value={formData.dropLoc}
              onChange={(e) => handleChange("dropLoc", e.target.value)}
              required
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
          <div className="order-form-group">
            <label>End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              required
              disabled={!isEditable}
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
                disabled={!isEditable}
              />
              Passenger
            </label>
            <label>
              <input
                type="radio"
                value="goods"
                checked={formData.typeOfService === "goods"}
                onChange={(e) => handleChange("typeOfService", e.target.value)}
                disabled={!isEditable}
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
                disabled={!isEditable}
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
                disabled={!isEditable}
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
              disabled={!isEditable}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="button" className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn save" disabled={!isEditable}>
            {isEditing ? "Update Order" : "Create Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
