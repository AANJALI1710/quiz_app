import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/Home";
import "./index.css";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/">Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/quiz">Quiz</Link>
            <Link to="/leaderboard">Leaderboard</Link>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>404 - Page not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
