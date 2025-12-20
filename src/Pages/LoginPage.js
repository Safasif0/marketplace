import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.api";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);

      // ✅ redirect to home
      navigate("/home");
    } catch (err) {
      setError("Login failed, try again");
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT */}
      <div className="login-left">
        {/* LOGO + TECH HUB */}
        <div className="text-center mb-3">
          <img src="images\logo.svg" className="brand-logo" />
          <div className="brand">Buyer App</div>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log In</button>
        </form>
        <p className="subtitle">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
        {error && <p className="error">{error}</p>}
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="overlay">
          <h2>Welcome Back 👋</h2>
          <p>
            Login to access your buyer dashboard and explore the marketplace.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
