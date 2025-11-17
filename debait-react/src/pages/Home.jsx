// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="section-card hero">
        <div className="hero-main">
          <div className="badge">Academic tool · AI-assisted debating</div>
          <h2>Welcome to DebAIt</h2>
          <p className="hero-text">
            DebAIt helps students practice argumentation by debating real topics
            with an AI. Ask a question, see a structured response, and then
            build your own counterarguments.
          </p>

          <div className="hero-actions">
            <Link to="/start" className="primary-link">
              Start a debate
            </Link>
            <Link to="/explore" className="secondary-link">
              Browse example topics
            </Link>
          </div>

          <p className="small-text">
            Designed for classrooms, study groups, and anyone who wants to
            sharpen critical thinking skills.
          </p>
        </div>

        <div className="hero-side">
          <h3>What can I do here?</h3>
          <ul>
            <li>Practice building clear arguments and rebuttals</li>
            <li>Explore common debate topics with pros &amp; cons</li>
            <li>Draft responses you can use in class or assignments</li>
            <li>Compare your thinking to AI-generated perspectives</li>
          </ul>
        </div>
      </section>

      {/* Quick overview cards */}
      <section className="section-card">
        <h2>Get started in three steps</h2>

        <div className="home-grid">
          <div className="home-card">
            <h3>1. Pick a question</h3>
            <p>
              Use a topic from class or choose one from the Explore page. Keep
              it specific so the AI can give a focused response.
            </p>
          </div>

          <div className="home-card">
            <h3>2. Read the AI’s stance</h3>
            <p>
              DebAIt will outline a position with reasoning. Treat it like a
              starting point, not the final answer.
            </p>
          </div>

          <div className="home-card">
            <h3>3. Build your own argument</h3>
            <p>
              Use the response to agree, disagree, or refine your view. Add your
              own evidence, examples, and counterpoints.
            </p>
          </div>
        </div>

        <p className="small-text">
          Tip: You can mention rubric words like <em>claim</em>,{" "}
          <em>evidence</em>, and <em>counterargument</em> in your prompts to
          make DebAIt’s responses more structured.
        </p>
      </section>
    </>
  );
}

export default Home;
