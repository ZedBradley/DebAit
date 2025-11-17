// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import StartDebate from "./pages/StartDebate";
import Explore from "./pages/Explore";
import About from "./pages/About";

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartDebate />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
