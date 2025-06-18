import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: "20px" }}>
        <h1>⭐ AI Tools Explorer</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">🏠 Home</Link> | <Link to="/favorites">❤️ Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

