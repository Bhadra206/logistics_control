import React from "react";
import { useDrag } from "react-dnd";
import { Truck, Fuel, IdCard } from "lucide-react";
import "./VehicleList.css";

function VehicleItem({ vehicle, isAssigned, horizontal = false }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "vehicle",
    item: { id: vehicle._id, name: vehicle.name },
    canDrag: !isAssigned,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getTypeBadgeClass = (type) => {
    return type === "LMV" ? "badge type lmv" : "badge type hmv";
  };

  return (
    <div
      ref={drag}
      className={`vehicle-item ${isDragging ? "dragging" : ""} ${
        isAssigned ? "assigned" : "available"
      } ${horizontal ? "horizontal" : ""}`}
    >
      <div
        className={`vehicle-list ${
          isAssigned ? "assigned-card" : "available-card"
        }`}
      >
        <div className="vehicle-list-content">
          <div className="vehicle-header">
            <div className="vehicle-name">
              <Truck className="vehicle-icon" />
              <span>{vehicle.name}</span>
            </div>
            {isAssigned && <span className="assigned-badge">Assigned</span>}
          </div>

          <div className="vehicle-info">
            <div className="info-row">
              <IdCard className="info-icon" />
              <span className={getTypeBadgeClass(vehicle.type)}>
                {vehicle.type}
              </span>
            </div>
            <div className="info-row">
              <Fuel className="info-icon" />
              <span>Rate: ${vehicle.ratePerKm}/km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VehicleList({
  vehicles = [],
  assignedVehicleIds = [],
  horizontal = false,
}) {
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  return (
    <div className="vehicle-list">
      <div className="vehicle-hint">Drag vehicles to assign them to orders</div>
      <div className={horizontal ? "vehicle-scroll" : "vehicle-stack"}>
        {safeVehicles.length === 0 ? (
          <p className="no-vehicles">No vehicles available</p>
        ) : (
          safeVehicles.map((vehicle) => (
            <VehicleItem
              key={vehicle._id}
              vehicle={vehicle}
              horizontal={horizontal}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default VehicleList;
