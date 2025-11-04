import { Edit, Trash2 } from "lucide-react";
import "./OrderList.css";

export default function OrderList({ orders, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "badge pending";
      case "In Progress":
        return "badge in-progress";
      case "Completed":
        return "badge completed";
      case "Cancelled":
        return "badge cancelled";
      default:
        return "badge default";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? "-" : date.toLocaleDateString();
  };

  return (
    <div className="order-card-container">
      {orders.length === 0 ? (
        <p className="no-data">No orders available</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            {/* Header */}
            <div className="order-card-header">
              <div className="order-card-title">
                <h3>{order.customerName}</h3>
                <p className="order-id">#{order._id}</p>
              </div>
              <div className="order-card-actions">
                <button
                  className="btn edit"
                  onClick={() => onEdit(order)}
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="btn delete"
                  onClick={() => onDelete(order._id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="order-card-body">
              <p>
                <strong>From:</strong> {order.startLoc || "-"}
              </p>
              <p>
                <strong>To:</strong> {order.dropLoc || "-"}
              </p>
              <p>
                <strong>Start Date:</strong> {formatDate(order.startDate)}
              </p>
              <p>
                <strong>End Date:</strong> {formatDate(order.endDate)}
              </p>
              <p>
                <strong>Service Type:</strong> {order.typeOfService}
              </p>
              {order.typeOfService === "passenger" && (
                <p>
                  <strong>Passengers:</strong>{" "}
                  {order.numPassengers
                    ? `${order.numPassengers} Passengers`
                    : "-"}
                </p>
              )}

              {order.typeOfService === "goods" && order.weight != null && (
                <p>
                  <strong>Weight:</strong> {order.weight} Ton
                </p>
              )}

              <p>
                <strong>Distance:</strong> {order.distance || "-"}
              </p>

              {/* === Allocated Driver and Vehicle === */}
              {order.driver?.name && (
                <p>
                  <strong>Driver:</strong> {order.driver.name}
                </p>
              )}
              {order.vehicle?.name && (
                <p>
                  <strong>Vehicle:</strong> {order.vehicle.name}
                </p>
              )}
              <p>
                <strong>Total Cost:</strong> {order.totalCost || "-"}
              </p>
              <p>
                <strong>Overtime Hours:</strong> {order.overtimeHours || "-"}
              </p>
              <p>
                <strong>Number Of days:</strong> {order.numberOfDays || "-"}
              </p>
            </div>

            {/* Footer */}
            <div className="order-card-footer">
              <span className={getStatusColor(order.status)}>
                {order.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
