// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import StartDebate from "./pages/StartDebate.jsx";
import Explore from "./pages/Explore.jsx";
import About from "./pages/About.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Add/remove .dark on the <body> element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="page">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<StartDebate />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
