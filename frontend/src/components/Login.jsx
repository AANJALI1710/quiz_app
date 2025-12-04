import React, { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      setMsg("Login successful! Redirecting...");
      setTimeout(() => nav("/quiz"), 1500);
    } catch (err) {
      setMsg("Invalid email or password!");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      {msg && <p className="form-message">{msg}</p>}

      <input
        type="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="form-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
