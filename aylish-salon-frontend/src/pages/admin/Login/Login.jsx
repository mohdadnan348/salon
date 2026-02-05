import { useState } from "react";
import "./Login.css";

import Loader from "../../../components/common/Loader/Loader";
import { adminLogin } from "../../../services/auth.service";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await adminLogin(form);

      // 🔒 SAFE TOKEN EXTRACTION
      const token =
        res?.data?.token ||
        res?.data?.data?.token;

      if (!token) {
        throw new Error("Token missing");
      }

      // save token via context
      login(token);

      // redirect AFTER token saved
      window.location.replace("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p>Login to access admin dashboard</p>

        {error && <div className="error-msg">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Login;
