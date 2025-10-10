import React from "react";
import {
  Edit,
  Archive,
  ArchiveRestore,
  Phone,
  Clock,
  IndianRupee,
  Trash2,
} from "lucide-react"; // added Trash2 icon
import "./DriverCard.css";

export function DriverCard({
  driver,
  onEdit,
  onToggleArchive,
  onDeleteDriver,
}) {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="driver-card">
      {/* Status Line */}
      <div
        className={`status-line ${
          driver.status === "Active" ? "active" : "inactive"
        }`}
      />

      <div className="card-content">
        {/* Header */}
        <div className="card-header">
          <div className="driver-info">
            <div className="avatar">{getInitials(driver.name)}</div>
            <div>
              <h3 className="driver-name">{driver.name}</h3>
              <span className={`licence ${driver.licence.toLowerCase()}`}>
                {driver.licence} licence
              </span>
            </div>
          </div>
          <span className={`status-badge ${driver.status.toLowerCase()}`}>
            {driver.status}
          </span>
        </div>

        {/* Contact & Rates */}
        <div className="card-details">
          <div className="detail-item">
            <Phone className="icon" />
            <span>{driver.mobile}</span>
          </div>

          <div className="rate-grid">
            <div className="detail-item">
              <IndianRupee className="icon green" />
              <div>
                <p className="label">Per Day</p>
                <p className="value">₹{driver.perDayRate}</p>
              </div>
            </div>
            <div className="detail-item">
              <Clock className="icon orange" />
              <div>
                <p className="label">Overtime/hr</p>
                <p className="value">₹{driver.overTimeRate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button className="btn edit" onClick={() => onEdit(driver)}>
            <Edit className="btn-icon" /> Edit
          </button>
          <button
            className="btn archive"
            onClick={() => onToggleArchive(driver)}
          >
            {driver.status === "Active" ? (
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
            onClick={() => onDeleteDriver(driver._id)}
          >
            <Trash2 className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
