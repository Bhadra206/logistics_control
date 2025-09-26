import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://trainingapi.zerone-consulting.net/api.publish/api/account`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        }
      );

      if (!res.ok) {
        alert("Authentication Failed");
        return;
      }

      const data = await res.json();
      if (data.token) {
        onLogin(data.token);
        localStorage.setItem("token", data.token);
      } else {
        alert("Authentication Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="input-text"
            type="text"
            value={userName}
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="input-text"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
