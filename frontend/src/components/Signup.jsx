import React, { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      setMsg("Signup successful! Redirecting...");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg("Signup failed! Try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>

      {msg && <p className="form-message">{msg}</p>}

      <input
        type="text"
        placeholder="Name"
        className="form-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button className="form-btn" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}
