import { useState } from "react";
import Login from "./pages/Login/Login";
import EmployeeList from "./pages/EmployeeList/EmployeeList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token"); 
  }
  return (
    <div>
      {!token ? <Login onLogin={setToken} /> : <EmployeeList token={token} handleLogout={handleLogout}/>}
    </div>
  );
}

export default App;
