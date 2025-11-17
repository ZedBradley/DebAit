// src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const tabClass = ({ isActive }) =>
    "tab" + (isActive ? " active" : "");

  return (
    <header>
      <div className="logo">
        Deb<span>AI</span>t
      </div>
      <div className="tagline">
        Debate with AI. Practice critical thinking. See both sides.
      </div>

      <nav className="tabs">
        <NavLink to="/" end className={tabClass}>
          Home
        </NavLink>
        <NavLink to="/start" className={tabClass}>
          Start Debate
        </NavLink>
        <NavLink to="/explore" className={tabClass}>
          Explore Debates
        </NavLink>
        <NavLink to="/about" className={tabClass}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
