import React from "react";
import {
  Edit,
  Archive,
  ArchiveRestore,
  IndianRupee,
  Trash2,
  CarFront,
} from "lucide-react";
import "./VehicleCard.css";

export function VehicleCard({
  vehicle,
  onEdit,
  onToggleArchive,
  onDeleteVehicle,
}) {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="vehicle-card">
      {/* Status Line */}
      <div
        className={`status-line ${
          vehicle.status === "Active" ? "active" : "inactive"
        }`}
      />

      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="vehicle-info">
            <div className="avatar">{getInitials(vehicle.name)}</div>
            <div>
              <h3 className="vehicle-name">{vehicle.name}</h3>
              <span className={`type ${vehicle.type.toLowerCase()}`}>
                {vehicle.type} Type
              </span>
            </div>
          </div>
          <span className={`status-badge ${vehicle.status.toLowerCase()}`}>
            {vehicle.status}
          </span>
        </div>

        {/* Contact & Rates */}
        <div className="card-details">
          <div className="detail-item">
            <CarFront color="purple" />
            <span>{vehicle.model}</span>
          </div>

          <div className="rate-grid">
            <div className="detail-item">
              <div>
                <p className="label">Registration Number</p>
                <p className="value">{vehicle.registrationNo}</p>
              </div>
            </div>

            <div className="detail-item">
              <div>
                <p className="label"> Rate Per KM</p>
                <p className="value">₹{vehicle.ratePerKm}</p>
              </div>
            </div>

            <div className="detail-item">
              <div>
                <p className="label">Purpose</p>
                <p className="value">₹{vehicle.purpose}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button className="btn edit" onClick={() => onEdit(vehicle)}>
            <Edit className="btn-icon" /> Edit
          </button>
          <button
            className="btn archive"
            onClick={() => onToggleArchive(vehicle)}
          >
            {vehicle.status === "Active" ? (
              <>
                <Archive className="btn-icon" /> Archive
              </>
            ) : (
              <>
                <ArchiveRestore className="btn-icon" /> Restore
              </>
            )}
          </button>
          <button
            className="btn delete"
            onClick={() => onDeleteVehicle(vehicle._id)}
          >
            <Trash2 className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
