import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="home-wrapper">
      <div className="hero">
        <h1>Quiz Master</h1>
        <p>Test your knowledge across multiple subjects and compete globally!</p>

        <div className="hero-buttons">
          {!token && <button onClick={() => nav("/signup")} className="btn primary">Sign Up</button>}
          {!token && <button onClick={() => nav("/login")} className="btn outline">Login</button>}

          {token && <button onClick={() => nav("/quiz")} className="btn primary">Start Quiz</button>}
          {token && <button onClick={() => nav("/leaderboard")} className="btn outline">Leaderboard</button>}
        </div>
      </div>

      <div className="subjects">
        <h2>Available Subjects</h2>
        <div className="subject-cards">
          <div className="card">General Knowledge</div>
          <div className="card">Math</div>
          <div className="card">HTML</div>
        </div>
      </div>

      <footer>
        <p>© 2025 Quiz Master | Built for learning and fun 🚀</p>
      </footer>
    </div>
  );
}
