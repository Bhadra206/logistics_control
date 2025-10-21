import { useState, useEffect } from "react";
import AdminNav from "../AdminNav/AdminNav";
import { useNavigate } from "react-router-dom";
import "./AdminDashBoard.css";

function AdminDashBoard() {
  const [stats, setStats] = useState({
    activeDrivers: 0,
    activeVehicles: 0,
    allocatedOrders: 0,
    pendingOrders: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/stats");
        const data = await res.json();
        if (res.ok) {
          setStats(data.data);
        } else {
          console.error("Error fetching the stats", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch the stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <AdminNav />
      <div className="stats">
        <div className="stats-card">
          <p className="stats-value">{stats.activeVehicles}</p>
          <p className="stats-label">Total Vehicles</p>
        </div>
        <div className="stats-card">
          <p className="stats-value">{stats.activeDrivers}</p>
          <p className="stats-label">Total Drivers</p>
        </div>
        <div className="stats-card">
          <p className="stats-value">{stats.allocatedOrders}</p>
          <p className="stats-label">Allocated Orders</p>
        </div>
        <div className="stats-card">
          <p className="stats-value">{stats.pendingOrders}</p>
          <p className="stats-label">Pending Orders</p>
        </div>
      </div>
      <div className="sections">
        <div>
          <h2 className="section-title">Quick Links</h2>
          <div className="section-buttons">
            <button
              onClick={() =>
                navigate("/driver", { state: { showAddForm: true } })
              }
              className="buttons"
            >
              Add Driver
            </button>
            <button
              onClick={() =>
                navigate("/vehicle", { state: { showAddForm: true } })
              }
              className="buttons"
            >
              Add Vehicle
            </button>
            <button
              onClick={() =>
                navigate("/staff", { state: { showAddForm: true } })
              }
              className="buttons"
            >
              Add Staff
            </button>
          </div>
        </div>
        <div className="section-title">
          <h2>Pages</h2>
          <div className="section-buttons">
            <button onClick={() => navigate("/driver")} className="buttons">
              Driver
            </button>
            <button onClick={() => navigate("/vehicle")} className="buttons">
              Vehicle
            </button>
            <button onClick={() => navigate("/staff")} className="buttons">
              Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
