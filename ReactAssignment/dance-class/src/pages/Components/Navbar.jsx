import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-body">
      <div className="nav-left">
        <Link to="/">Srishti</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
