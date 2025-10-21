import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import Driver from "./pages/Driver/Driver";
import Vehicle from "./pages/Vehicle/Vehicle";
import Staff from "./pages/Staff/Staff";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashBoard />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
