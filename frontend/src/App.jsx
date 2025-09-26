import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetVehicle from "./pages/GetVehicle/GetVehicle";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashBoard />} />
        {/* <Route path="/vehicle" element={<GetVehicle />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
