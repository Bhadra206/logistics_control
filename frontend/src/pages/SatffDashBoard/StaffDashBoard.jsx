import { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import "./StaffDashBoard.css";

const getTodayDate = () => new Date().toISOString().split("T")[0];

export default function App() {
  const [orders, setOrders] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [editingOrder, setEditingOrder] = useState(null);
  const [filterDate, setFilterDate] = useState(getTodayDate());
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/order/getAllOrders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by date and search
  const filteredOrders = orders.filter((order) => {
    const matchesDate = !filterDate || order.startDate === filterDate;

    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDate && matchesSearch;
  });

  const handleCreateOrder = () => {
    setEditingOrder(null);
    setCurrentView("create");
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setCurrentView("edit");
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const res = await fetch(
          `http://localhost:3000/order/deleteOrder/${orderId}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) throw new Error("Failed to delete order");
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSaveOrder = async (order) => {
    try {
      if (editingOrder) {
        const res = await fetch(
          `http://localhost:3000//order/replaceOrder/${order.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
          }
        );
        if (!res.ok) throw new Error("Failed to update order");
        const updatedOrder = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        );
      } else {
        const res = await fetch("http://localhost:3000/order/createOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        if (!res.ok) throw new Error("Failed to create order");
        const newOrder = await res.json();
        setOrders((prev) => [...prev, newOrder]);
      }
      setCurrentView("list");
      setEditingOrder(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setCurrentView("list");
    setEditingOrder(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header>
        <div>
          {currentView !== "list" && (
            <button onClick={() => setCurrentView("list")}>← Back</button>
          )}
          <h1>Travel Orders Management</h1>
        </div>
        {currentView === "list" && (
          <button onClick={handleCreateOrder}>+ Create Order</button>
        )}
      </header>

      {loading && <p className="loading">Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {/* List View */}
      {currentView === "list" && (
        <div>
          {/* Filters */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search by Order ID or Customer Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label>
              Filter by Date:
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                min={getTodayDate()}
              />
            </label>
          </div>
          <OrderList
            orders={filteredOrders}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
          />
          {/* Orders Table */}
          {filteredOrders.length > 0 ? (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Start</th>
                  <th>Drop</th>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Passengers/Weight</th>
                  <th>Distance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.startLocation}</td>
                    <td>{order.dropLocation}</td>
                    <td>{order.startDate}</td>
                    <td>{order.serviceType}</td>
                    <td>{order.passengersOrWeight}</td>
                    <td>{order.distance}</td>
                    <td>{order.status}</td>
                    <td>
                      <button onClick={() => handleEditOrder(order)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-orders">No orders found.</div>
          )}
        </div>
      )}

      {/* Create/Edit View */}
      {(currentView === "create" || currentView === "edit") && (
        <OrderForm
          order={editingOrder}
          onSave={handleSaveOrder}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
