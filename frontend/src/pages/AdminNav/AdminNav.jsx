import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNav.css";

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
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminNav;
