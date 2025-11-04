import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DriverList } from "../Components/AllocationComponents/DriverList/DriverList";
import { VehicleList } from "../Components/AllocationComponents/VehicleList/VehicleList";
import { OrderCard } from "../Components/AllocationComponents/OrderCard/OrderCard";
import { Calculator, Save, CalendarDays } from "lucide-react";
import "./AllocationOrder.css";

export default function AllocationOrder() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useState(null);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/drivers");
      const data = await res.json();

      return data?.data?.drivers || [];
    } catch (err) {
      console.error("Error fetching drivers:", err);
      return [];
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/vehicles");
      const data = await res.json();

      return data?.data?.vehicles || [];
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      return [];
    }
  };

  const fetchOrders = async () => {
    try {
      let url = "http://localhost:3000/order/getAllOrders";
      if (filterDate) {
        url = `http://localhost:3000/order/getOrders?startDate=${filterDate}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      const allOrders = Array.isArray(data?.orders || data?.data)
        ? data.orders || data.data
        : [];
      const pendingOrders = allOrders.filter(
        (o) => o.status && o.status.toLowerCase() === "pending"
      );
      setOrders(pendingOrders);
      return pendingOrders;
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
      const availableDrivers = await fetchDrivers(ordersData);
      const availableVehicles = await fetchVehicles(ordersData);
      setDrivers(availableDrivers);
      setVehicles(availableVehicles);
    };
    loadData();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [filterDate]);

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((o) => {
        if (!o.startDate) return false;
        const orderDate = new Date(o.startDate).toISOString().split("T")[0];
        return !filterDate || orderDate === filterDate;
      })
    : [];

  const handleAssignDriver = useCallback((orderId, driverId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, assignedDriverId: driverId } : o
      )
    );
  }, []);

  const handleAssignVehicle = useCallback((orderId, vehicleId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, assignedVehicleId: vehicleId } : o
      )
    );
  }, []);

  const calculateOrderCost = (order) => {
    let totalCost = 0;
    if (order.assignedVehicleId) {
      const v = vehicles.find((x) => x._id === order.assignedVehicleId);
      if (v) totalCost += order.distance * v.ratePerKm;
    }
    if (order.assignedDriverId) {
      const d = drivers.find((x) => x._id === order.assignedDriverId);
      if (d) {
        const overtimeHours = order.overtimeHours || 0;
        totalCost += order.numberOfDays * d.perDayRate;
        if (overtimeHours > 0) {
          totalCost += overtimeHours * d.overTimeRate;
        }
      }
    }
    return totalCost;
  };

  const calculateTotalCost = () =>
    filteredOrders.reduce((sum, o) => sum + calculateOrderCost(o), 0);

  const getAssignedCount = () => {
    const assignedDrivers = new Set(
      filteredOrders
        .filter((o) => o.assignedDriverId)
        .map((o) => o.assignedDriverId)
    );
    const assignedVehicles = new Set(
      filteredOrders
        .filter((o) => o.assignedVehicleId)
        .map((o) => o.assignedVehicleId)
    );
    const fullyAssignedOrders = filteredOrders.filter(
      (o) => o.assignedDriverId && o.assignedVehicleId
    ).length;
    return {
      drivers: assignedDrivers.size,
      vehicles: assignedVehicles.size,
      orders: fullyAssignedOrders,
    };
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "All Orders";
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return "Today's Orders";
    if (date.toDateString() === tomorrow.toDateString())
      return "Tomorrow's Orders";
    return `Orders for ${date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  };

  const handleSaveAllocations = async () => {
    const allocatedOrders = orders.filter(
      (o) => o.assignedDriverId && o.assignedVehicleId
    );

    if (allocatedOrders.length === 0) {
      alert("No fully allocated orders to save.");
      return;
    }

    for (let i = 0; i < allocatedOrders.length; i++) {
      const current = allocatedOrders[i];

      const conflicts = orders.filter((other) => {
        if (other._id === current._id) return false;
        const sameDate =
          new Date(other.startDate).toISOString().split("T")[0] ===
          new Date(current.startDate).toISOString().split("T")[0];

        const driverConflict =
          sameDate &&
          other.assignedDriverId &&
          other.assignedDriverId === current.assignedDriverId;

        const vehicleConflict =
          sameDate &&
          other.assignedVehicleId &&
          other.assignedVehicleId === current.assignedVehicleId;

        return driverConflict || vehicleConflict;
      });

      if (conflicts.length > 0) {
        const conflict = conflicts[0];
        const driverConflict =
          conflict.assignedDriverId === current.assignedDriverId;
        const vehicleConflict =
          conflict.assignedVehicleId === current.assignedVehicleId;

        let message = "";
        if (driverConflict)
          message += `❌ Driver already assigned to another order on ${current.startDate}\n`;
        if (vehicleConflict)
          message += `❌ Vehicle already assigned to another order on ${current.startDate}\n`;

        alert(message.trim());
        return;
      }
    }

    try {
      for (const order of allocatedOrders) {
        const totalCost = calculateOrderCost(order);
        const res = await fetch(
          `http://localhost:3000/order/replaceOrder/${order._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              driver: order.assignedDriverId,
              vehicle: order.assignedVehicleId,
              totalCost,
              status: "Allocated",
            }),
          }
        );
        const data = await res.json();
        if (!data.success) {
          console.error(`Failed to save order ${order._id}`, data.message);
        }
      }
      alert("Allocations saved successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Error saving allocations:", err);
      alert("An error occurred while saving allocations.");
    }
  };

  const stats = getAssignedCount();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="allocation-root">
        {/* Top Header */}
        <div className="top-bar">
          <div className="title-section">
            <h1 className="title">Allocation Planner</h1>
            <div className="cost-and-stats">
              <div className="total-cost">
                <Calculator className="icon" />
                <span className="total-cost-text">
                  Total Cost: ${calculateTotalCost().toFixed(2)}
                </span>
              </div>
              <div className="order-stats">
                <span className="stat-badge">
                  {stats.drivers}/{drivers.length} Drivers
                </span>
                <span className="stat-badge">
                  {stats.vehicles}/{vehicles.length} Vehicles
                </span>
                <span className="stat-badge">
                  {stats.orders}/{filteredOrders.length} Orders
                </span>
              </div>
            </div>
          </div>
          <div className="controls-section">
            <label className="date-label">
              <CalendarDays className="icon" /> Date:
            </label>
            <input
              type="date"
              className="date-input"
              value={filterDate || ""}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <button
              className="save-btn"
              type="button"
              onClick={handleSaveAllocations}
            >
              <Save className="icon" />
              <span>Save Allocation</span>
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="main-area">
          {/* Vehicles Section */}
          <div className="vehicles-top">
            <div className="panel">
              <div className="panel-header">Available Vehicles</div>
              <div className="panel-body vehicles-scroll">
                <VehicleList
                  vehicles={vehicles}
                  assignedVehicleIds={filteredOrders
                    .filter((o) => o.assignedVehicleId)
                    .map((o) => o.assignedVehicleId)}
                  horizontal={true}
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-area">
            {/* Drivers */}
            <div className="sidebar">
              <div className="panel">
                <div className="panel-header">Available Drivers</div>
                <div className="panel-body">
                  <DriverList
                    drivers={drivers}
                    assignedDriverIds={filteredOrders
                      .filter((o) => o.assignedDriverId)
                      .map((o) => o.assignedDriverId)}
                  />
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="orders-panel">
              <div className="panel">
                <div className="panel-header">
                  {formatDateForDisplay(filterDate)}
                </div>
                <div className="panel-body orders-scroll">
                  {filteredOrders.length === 0 ? (
                    <div className="no-orders">
                      <CalendarDays className="big-icon" />
                      <p>No orders for this date</p>
                      <p className="hint">
                        Select a different date to view orders
                      </p>
                    </div>
                  ) : (
                    <div className="orders-grid">
                      {filteredOrders.map((order) => (
                        <OrderCard
                          key={order._id}
                          order={order}
                          assignedDriver={drivers.find(
                            (d) => d._id === order.assignedDriverId
                          )}
                          assignedVehicle={vehicles.find(
                            (v) => v._id === order.assignedVehicleId
                          )}
                          totalCost={calculateOrderCost(order)}
                          onAssignDriver={handleAssignDriver}
                          onAssignVehicle={handleAssignVehicle}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
