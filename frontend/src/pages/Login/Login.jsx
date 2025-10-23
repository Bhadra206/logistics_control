import { useState } from "react";
import { Truck, Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    const { email, password } = formData;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      if (data.staff.type === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/staffDashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    const { email, newPassword, confirmPassword } = forgotData;

    if (!email || !newPassword || !confirmPassword) {
      setForgotError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/staff/updateStaff", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Password reset failed");

      setForgotSuccess("Password reset successfully! You can now log in.");
      setForgotData({ email: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setForgotError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-header">
          <div className="logo">
            <Truck className="logo-icon" />
          </div>
          <div>
            <h1>Welcome</h1>
            <p>Sign in to your account</p>
          </div>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <Lock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                ></button>
              </div>
            </div>

            <div className="flex-between">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button
                type="button"
                className="forgot-password"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {loginError && (
              <p className="error-message" style={{ color: "red" }}>
                {loginError}
              </p>
            )}

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowForgotModal(false)}
            >
              <X />
            </button>
            <h2>Reset Password</h2>
            <form onSubmit={handleForgotPassword} className="forgot-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotData.email}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={forgotData.newPassword}
                  onChange={(e) =>
                    setForgotData({
                      ...forgotData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={forgotData.confirmPassword}
                  onChange={(e) =>
                    setForgotData({
                      ...forgotData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {forgotError && (
                <p className="error-message" style={{ color: "red" }}>
                  {forgotError}
                </p>
              )}
              {forgotSuccess && (
                <p className="success-message" style={{ color: "green" }}>
                  {forgotSuccess}
                </p>
              )}

              <button type="submit" className="submit-btn">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
