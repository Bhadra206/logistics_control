import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNav.css";
import { LogOut } from "lucide-react";

function AdminNav() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="admin-nav">
      <div className="admin-left">
        <h1>Logistics Control App</h1>
      </div>
      <div className="admin-right">
        <Link to="/adminDashboard">DashBoard</Link>
        <button onClick={handleLogout} className="admin-btn-outline">
          <LogOut className="logout-icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNav;
