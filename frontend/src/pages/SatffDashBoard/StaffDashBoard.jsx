import { useState, useEffect } from "react";
import OrderForm from "../Components/OrderComponents/OrderForm/OrderForm";
import OrderList from "../Components/OrderComponents/OrderList/OrderList";
import "./StaffDashBoard.css";
import { Plus, Calendar, Search, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffDashBoard() {
  const [orders, setOrders] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [editingOrder, setEditingOrder] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all orders on load (staff login)
  // Fetch all orders on load (staff login)
  useEffect(() => {
    fetchOrders();
  }, [filterDate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:3000/order/getAllOrders";

      if (filterDate) {
        url = `http://localhost:3000/order/getOrders?startDate=${filterDate}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();

      setOrders(data.orders || data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search filter (client-side)
  const filteredOrders = orders.filter((order) => {
    return (
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to delete order");
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSaveOrder = async (order) => {
    try {
      if (editingOrder) {
        console.log("Saving order:", order);
        const res = await fetch(
          `http://localhost:3000/order/replaceOrder/${order._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
          }
        );
        if (!res.ok) throw new Error("Failed to update order");
        await res.json();
      } else {
        const res = await fetch("http://localhost:3000/order/createOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        if (!res.ok) throw new Error("Failed to create order");
        await res.json();
      }
      await fetchOrders();

      setCurrentView("list");
      setEditingOrder(null);
      alert("Order updated successfully ✅");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = async () => {
    setCurrentView("list");
    setEditingOrder(null);
    await fetchOrders();
  };

  return (
    <div className="staffDashboard-container">
      {/* Header */}
      <header className="staffDashboard-header">
        <div className="staffDashboard-header-left">
          {currentView === "list" && <h1>Travel Orders Management</h1>}
        </div>
        {currentView === "list" && (
          <div className="header-button-group">
            <button
              className="btn-outline"
              onClick={() => navigate("/allocateOrders")}
            >
              <Truck className="order-icon" />
              Order Allocation
            </button>
            <button className="btn-primary" onClick={handleCreateOrder}>
              <Plus className="order-icon" />
              Create Order
            </button>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="staffDashboard-main">
        {currentView === "list" && (
          <>
            {/* Hero Section */}
            <div className="staffDashboard-hero">
              <h2>Travel Orders from Kochi</h2>
              <p>Manage passenger and goods transportation across India</p>
            </div>

            {/* Filters */}
            <div className="orders-section">
              <div className="orders-header">
                <h3>Order List</h3>
                <div className="orders-filters">
                  {/* Search */}
                  <div className="search-filter">
                    <div className="search-input-wrapper">
                      <Search size={14} className="icon-inside" />
                      <input
                        type="text"
                        placeholder="Search by Order ID or Customer Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="date-filter">
                    <Calendar size={16} className="icon-small" />
                    <label htmlFor="filter-date">Filter by Date:</label>
                    <input
                      id="filter-date"
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </div>

                  <p className="order-count">
                    Showing {filteredOrders.length} orders for{" "}
                    {new Date(filterDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* List */}
              <OrderList
                orders={filteredOrders}
                onEdit={handleEditOrder}
                onDelete={handleDeleteOrder}
              />

              {/* No orders */}
              {filteredOrders.length === 0 && !loading && (
                <div className="no-orders">
                  <Calendar className="icon-large" />
                  <p>
                    No orders found for{" "}
                    {new Date(filterDate).toLocaleDateString()}
                  </p>
                  <p className="note">
                    Try selecting a different date or create a new order.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {(currentView === "create" || currentView === "edit") && (
          <OrderForm
            order={editingOrder}
            onSave={handleSaveOrder}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}
