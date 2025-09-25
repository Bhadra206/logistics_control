import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import AdminNav from "./pages/AdminNav/AdminNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
