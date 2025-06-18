import React, { useEffect, useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Home = () => {
  const [tools, setTools] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/tools${category ? "?category=" + category : ""}`)
      .then(res => {
        setTools(res.data);
        setLoading(false);
        setMsg("");
      })
      .catch(err => {
        console.error("❌ Error loading tools:", err.message);
        setTools([]);
        setLoading(false);
        setMsg("❌ Failed to load tools");
      });
  }, [category]);

  const addToFavorites = (toolId) => {
    axios
      .post(`${API_BASE}/api/favorites`, { toolId: Number(toolId) })
      .then(() => {
        setMsg("✅ Added to favorites!");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      })
      .catch(err => {
        console.error("❌ Add to favorites error:", err.message);
        setMsg(`❗ ${err.response?.data?.message || "Failed to add"}`);
      });
  };

  const categoryCounts = tools.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      data: Object.values(categoryCounts),
      backgroundColor: ["#36D1DC", "#FF9A8B", "#A18CD1", "#5B86E5"],
    }]
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    document.body.style.background = dark ? "#111" : "#fff";
    document.body.style.color = dark ? "#eee" : "#000";
  }, [dark]);

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      {showConfetti && <Confetti />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>⭐ All AI Tools</h2>
        <button onClick={() => setDark(!dark)} style={{ padding: "5px 10px" }}>
          {dark ? "🌞 Light Mode" : "🌑 Dark Mode"}
        </button>
      </div>

      <label><strong>🔍 Search: </strong></label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tool name..."
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />

      <label><strong>📂 Filter by category: </strong></label>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All</option>
        <option value="Writing">Writing</option>
        <option value="Image">Image</option>
      </select>

      {!loading && tools.length > 0 && (
        <div style={{ maxWidth: "400px", margin: "20px auto" }}>
          <Pie data={chartData} />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <p>⏳ Loading...</p>
        ) : filteredTools.length === 0 ? (
          <p>⚠️ No tools found</p>
        ) : (
          filteredTools.map(tool => (
            <div key={tool.id} style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "10px",
              background: dark ? "#222" : "#fafafa"
            }}>
              <h4>{tool.name}</h4>
              <p>🧩 Category: {tool.category}</p>
              <button onClick={() => addToFavorites(tool.id)}>❤️ Favorite</button>
            </div>
          ))
        )}
        {msg && <p style={{ fontWeight: "bold", color: "blue" }}>{msg}</p>}
      </div>
    </div>
  );
};

export default Home;
