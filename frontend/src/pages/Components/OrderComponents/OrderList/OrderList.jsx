import { Edit, Trash2 } from "lucide-react";
import "./OrderList.css";

export default function OrderList({ orders, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status pending";
      case "In Progress":
        return "status in-progress";
      case "Completed":
        return "status completed";
      case "Cancelled":
        return "status cancelled";
      default:
        return "status default";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? "-" : date.toLocaleDateString();
  };

  return (
    <div className="order-list-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Start Location</th>
            <th>Drop Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Service Type</th>
            <th>Passengers / Weight</th>
            <th>Distance</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="11" className="no-data">
                No orders available
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="bold">{order._id}</td>
                <td>{order.customerName}</td>
                <td>{order.startLoc}</td>
                <td>{order.dropLoc}</td>
                <td>{formatDate(order.startDate)}</td>
                <td>{formatDate(order.endDate)}</td>
                <td>
                  <span className="badge">{order.typeOfService}</span>
                </td>
                <td>
                  {order.typeOfService === "passenger"
                    ? `${order.numPassengers} Passengers`
                    : `${order.weight} Ton`}
                </td>
                <td>{order.distance || "-"}</td>
                <td>
                  <span className={getStatusColor(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="action-buttons">
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
