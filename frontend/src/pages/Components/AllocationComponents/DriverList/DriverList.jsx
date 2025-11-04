import React from "react";
import { useDrag } from "react-dnd";
import { User, DollarSign, Clock, IdCard } from "lucide-react";
import "./DriverList.css";

function DriverItem({ driver, isAssigned }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "driver",
    item: { id: driver._id, name: driver.name },
    canDrag: !isAssigned,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`driver-item ${isDragging ? "dragging" : ""} ${
        isAssigned ? "assigned" : "available"
      }`}
    >
      <div
        className={`driver-card ${
          isAssigned ? "driver-card-assigned" : "driver-card-available"
        }`}
      >
        <div className="driver-card-content">
          <div className="driver-card-header">
            <div className="driver-card-name">
              <User className="driver-card-icon" />
              <span>{driver.name}</span>
            </div>
            {isAssigned && <span className="assigned-badge">Assigned</span>}
          </div>

          <div className="driver-card-info">
            <div className="info-row">
              <DollarSign className="info-icon" />
              <span>Daily Rate: ${driver.perDayRate}</span>
            </div>
            <div className="info-row">
              <Clock className="info-icon" />
              <span>Overtime: ${driver.overTimeRate}</span>
            </div>
            <div className="info-row">
              <IdCard className="info-icon" />
              <span className={`licence ${driver.licence.toLowerCase()}`}>
                {driver.licence} licence
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DriverList({ drivers = [], assignedDriverIds = [] }) {
  return (
    <div className="driver-list">
      <div className="driver-hint">Drag drivers to assign them to orders</div>
      {drivers.map((driver) => (
        <DriverItem
          key={driver._id}
          driver={driver}
          isAssigned={assignedDriverIds.includes(driver._id)}
        />
      ))}
    </div>
  );
}

export default DriverList;
