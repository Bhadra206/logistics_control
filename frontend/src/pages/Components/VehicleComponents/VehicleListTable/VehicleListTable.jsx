import { Edit, Archive, RotateCcw, Trash2 } from "lucide-react";
import "./VehicleListTable.css";

export function VehicleListTable({
  vehicles,
  onEditVehicle,
  onDeleteVehicle,
  onToggleArchive,
}) {
  const getPurposeBadgeClass = (purpose) => {
    switch (purpose) {
      case "passenger":
        return "badge purpose passenger";
      case "goods":
        return "badge purpose goods";
      case "both":
        return "badge purpose both";
      default:
        return "badge purpose default";
    }
  };

  const getTypeBadgeClass = (type) => {
    return type === "LMV" ? "badge type lmv" : "badge type hmv";
  };

  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle) => (
        <div key={vehicle._id} className="vehicle-card">
          <div className="vehicle-card-content">
            <div className="vehicle-info-grid">
              {/* Vehicle Name */}
              <div>
                <div className="label">Vehicle Name</div>
                <div className="value">{vehicle.name}</div>
              </div>

              {/* Make & Model */}
              <div>
                <div className="label">Make & Model</div>
                <div className="value">{vehicle.model}</div>
              </div>

              {/* Registration */}
              <div>
                <div className="label">Reg. No.</div>
                <div className="value mono">{vehicle.registrationNo}</div>
              </div>

              {/* Purpose & Type */}
              <div>
                <div className="label">Purpose/Type</div>
                <div className="badge-container">
                  <span className={getPurposeBadgeClass(vehicle.purpose)}>
                    {vehicle.purpose}
                  </span>
                  <span className={getTypeBadgeClass(vehicle.type)}>
                    {vehicle.type}
                  </span>
                </div>
              </div>

              {/* Rate */}
              <div>
                <div className="label">Rate/KM</div>
                <div className="value">₹{vehicle.ratePerKm}</div>
              </div>

              {/* Status */}
              <div>
                <div className="label">Status</div>
                <span
                  className={`badge status ${
                    vehicle.status === "Active" ? "active" : "archived"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="actions">
              <button
                className="icon-btn"
                onClick={() => onEditVehicle(vehicle)}
                title="Edit Vehicle"
              >
                <Edit className="icon" />
              </button>
              <button
                className="icon-btn"
                onClick={() => onToggleArchive(vehicle)}
                title={
                  vehicle.status === "Active"
                    ? "Archive Vehicle"
                    : "Restore Vehicle"
                }
              >
                {vehicle.status === "Active" ? (
                  <Archive className="icon" />
                ) : (
                  <RotateCcw className="icon" />
                )}
              </button>
              <button
                className="icon-btn"
                onClick={() => onDeleteVehicle(vehicle._id)}
                title="Delete Vehicle"
              >
                <Trash2 className="icon" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
