import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth.api";
import "./LoginPage.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await signup({
        name,
        email,
        password,
        role: "buyer",
      });

      localStorage.setItem("token", res.data.token);

      // ✅ redirect to home
      navigate("/home");
    } catch (err) {
      setError("Signup failed, try again");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="text-center mb-3">
          <img src="images\logo.svg" className="brand-logo" />
          <div className="brand">Buyer App</div>
        </div>

        <h2>Sign Up</h2>
        <p className="subtitle">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />

          <button type="submit">Create Account</button>
        </form>
      </div>

      <div className="login-right">
        <div className="overlay">
          <h2>Join Us 🚀</h2>
          <p>Start your journey with Tech Hub today.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
