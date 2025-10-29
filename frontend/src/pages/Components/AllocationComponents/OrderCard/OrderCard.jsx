import React from "react";
import { useDrop } from "react-dnd";
import {
  MapPin,
  Calendar,
  User,
  Truck,
  DollarSign,
  Navigation,
} from "lucide-react";
import "./OrderCard.css";

export function OrderCard({
  order,
  assignedDriver,
  assignedVehicle,
  totalCost,
  onAssignDriver,
  onAssignVehicle,
}) {
  const [{ isOverDriver }, dropDriverRef] = useDrop(() => ({
    accept: "driver",
    drop: (item) => onAssignDriver(order._id, item.id),
    collect: (monitor) => ({
      isOverDriver: monitor.isOver(),
    }),
  }));

  const [{ isOverVehicle }, dropVehicleRef] = useDrop(() => ({
    accept: "vehicle",
    drop: (item) => onAssignVehicle(order._id, item.id),
    collect: (monitor) => ({
      isOverVehicle: monitor.isOver(),
    }),
  }));

  const isFullyAssigned = assignedDriver && assignedVehicle;
  const vehicleCost = assignedVehicle
    ? order.distance * assignedVehicle.ratePerKm
    : 0;
  const driverCost = assignedDriver
    ? order.numberOfDays * assignedDriver.perDayRate +
      (order.overtimeHours > 0
        ? order.overtimeHours * assignedDriver.overTimeRate
        : 0)
    : 0;

  return (
    <div
      className={`order-card ${
        isFullyAssigned ? "order-complete" : "order-pending"
      }`}
    >
      {/* Header */}
      <div className="order-header">
        <div className="order-header-left">
          <h3 className="order-title">{order._id}</h3>
          <p className="order-customer">{order.customerName}</p>
        </div>
        <div className="order-header-right">
          <div className="order-cost">${totalCost.toFixed(2)}</div>
          {isFullyAssigned && <span className="complete-badge">Complete</span>}
        </div>
      </div>

      {/* Order Details */}
      <div className="order-details">
        <div className="detail-item">
          <MapPin className="detail-icon" />
          <span>{order.dropLoc}</span>
        </div>
        <div className="detail-item">
          <Navigation className="detail-icon" />
          <span>{order.distance} km</span>
        </div>
        <div className="detail-item">
          <Calendar className="detail-icon" />
          <span>
            {order.numberOfDays} day
            {order.numberOfDays !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Assignment Zones */}
      <div className="assignment-section">
        {/* Driver Drop Zone */}
        <div
          ref={dropDriverRef}
          className={`assign-zone driver-zone ${
            isOverDriver ? "zone-hover" : ""
          } ${assignedDriver ? "zone-filled" : ""}`}
        >
          {assignedDriver ? (
            <div className="assign-info">
              <div className="assign-header">
                <span className="assign-name">{assignedDriver.name}</span>
                <span className="assigned-label">Assigned</span>
              </div>
              <div className="assign-details">
                <div>
                  Daily: ${assignedDriver.perDayRate} × {order.numberOfDays} = $
                  {assignedDriver.perDayRate * order.numberOfDays}
                </div>
                <div>Overtime: ${assignedDriver.overTimeRate}</div>
                <div className="assign-subtotal">
                  Subtotal: ${driverCost.toFixed(2)}
                </div>
              </div>
            </div>
          ) : (
            <div className="assign-placeholder">Drop a driver here</div>
          )}
        </div>

        {/* Vehicle Drop Zone */}
        <div
          ref={dropVehicleRef}
          className={`assign-zone vehicle-zone ${
            isOverVehicle ? "zone-hover" : ""
          } ${assignedVehicle ? "zone-filled" : ""}`}
        >
          {assignedVehicle ? (
            <div className="assign-info">
              <div className="assign-header">
                <span className="assign-name">{assignedVehicle.name}</span>
                <span className="assigned-label">Assigned</span>
              </div>
              <div className="assign-details">
                <div>{assignedVehicle.type}</div>
                <div>
                  ${assignedVehicle.ratePerKm}/km × {order.distance}km = $
                  {vehicleCost.toFixed(2)}
                </div>
                <div className="assign-subtotal">
                  Subtotal: ${vehicleCost.toFixed(2)}
                </div>
              </div>
            </div>
          ) : (
            <div className="assign-placeholder">Drop a vehicle here</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
