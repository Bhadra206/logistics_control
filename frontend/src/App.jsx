import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import Driver from "./pages/Driver/Driver";
import Vehicle from "./pages/Vehicle/Vehicle";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashBoard />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/vehicle" element={<Vehicle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
