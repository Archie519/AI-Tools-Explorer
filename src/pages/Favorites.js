import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch favorites on load
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/api/favorites`)
      .then((res) => {
        setFavorites(res.data);
        setMsg("");
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading favorites:", err.message);
        setMsg("❌ Failed to load favorites");
        setLoading(false);
      });
  }, []);

  const removeFavorite = (id) => {
    axios
      .delete(`${API_BASE}/api/favorites/${id}`)
      .then(() => {
        setFavorites((prev) => prev.filter((t) => t.id !== id));
        setMsg("🗑️ Removed from favorites");
      })
      .catch((err) => {
        console.error("❌ Remove error:", err.message);
        setMsg("❌ Failed to remove favorite");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>❤️ My Favorite Tools</h2>

      {loading ? (
        <p style={styles.spinner}>⏳ Loading...</p>
      ) : favorites.length === 0 ? (
        <p style={styles.empty}>⚠️ No favorites saved yet.</p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((tool) => (
            <div key={tool.id} style={styles.card}>
              <h3>{tool.name}</h3>
              <p>📂 {tool.category}</p>
              <button style={styles.removeBtn} onClick={() => removeFavorite(tool.id)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {msg && <p style={styles.msg}>{msg}</p>}
    </div>
  );
};

// 💄 Basic responsive styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
  },
  spinner: {
    textAlign: "center",
    color: "#333",
    fontSize: "18px",
  },
  empty: {
    textAlign: "center",
    fontSize: "16px",
    color: "gray",
  },
  msg: {
    textAlign: "center",
    color: "blue",
    marginTop: "10px",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  removeBtn: {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Favorites;

