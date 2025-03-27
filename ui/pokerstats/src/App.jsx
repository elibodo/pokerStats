import "./App.css";
import React, { useState, useEffect } from "react";
import PokerStatGraph from "./components/PokerStatGraph";

const API_URL = "http://localhost:5258/";

function App() {
  const [stats, setStats] = useState([]);
  const [formData, setFormData] = useState({
    game: "",
    moneyIn: "",
    moneyOut: "",
    duration: "",
    datePlayed: "",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(API_URL + "api/PokerStats/getStats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL + "api/PokerStats/addStat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({
        game: "",
        moneyIn: "",
        moneyOut: "",
        duration: "",
        datePlayed: "",
      }); // Clear input fields
      fetchStats(); // Refresh list
    } catch (error) {
      console.error("Error adding stat:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(API_URL + `api/PokerStats/deleteStat/${id}`, {
        method: "DELETE",
      });
      fetchStats(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit} className="form">
          <h2>Poker Stats</h2>
          <input
            type="text"
            name="game"
            placeholder="Game (1/2 NLH, etc.)"
            value={formData.game}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="moneyIn"
            placeholder="Money In ($)"
            value={formData.moneyIn}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="moneyOut"
            placeholder="Money Out ($)"
            value={formData.moneyOut}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (hrs)"
            step="0.1"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="datePlayed"
            value={formData.datePlayed}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Stat</button>
        </form>
        <PokerStatGraph stats={stats} />
      </div>
      <ul className="stats-list">
        {[...stats].reverse().map((stat) => (
          <li key={stat.id} className="stat-box">
            <div className="stat-header">{stat.game}</div>

            <div className="stat-details">
              <div className="stat-info">
                <span>Money In: ${stat.moneyIn}</span>
                <span>Money Out: ${stat.moneyOut}</span>
              </div>

              <div className="stat-info">
                <span>{stat.duration} hours</span>
                <span>
                  {new Date(stat.datePlayed).toLocaleDateString("en-US")}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(stat.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
