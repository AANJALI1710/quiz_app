import React, { useEffect, useState } from "react";
import { API } from "../api";
import "./leaderboard.css";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/quiz/leaderboard").then((res) => setData(res.data));
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>High Score</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.highScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
