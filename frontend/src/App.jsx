import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import Driver from "./pages/Driver/Driver";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashBoard />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
