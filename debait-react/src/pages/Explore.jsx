// src/pages/Explore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    title: "Social Media Impact",
    description: "Is social media more harmful than helpful?",
    question: "Is social media more harmful than helpful?",
  },
  {
    title: "College Tuition",
    description: "Should college education be free for everyone?",
    question: "Should college education be free for everyone?",
  },
  {
    title: "AI in Education",
    description: "Are AI tutors better than human teachers?",
    question: "Are AI tutors better than human teachers?",
  },
  {
    title: "Homework Debate",
    description: "Should homework be removed from schools?",
    question: "Should homework be removed from schools?",
  },
];

function Explore() {
  const navigate = useNavigate();

  const handleStart = (question) => {
    navigate(`/start?topic=${encodeURIComponent(question)}`);
  };

  return (
    <section className="section-card">
      <h2>Explore Debate Topics</h2>
      <p>Choose a topic to send it directly into the Start Debate page.</p>

      <div className="topic-grid">
        {topics.map((t) => (
          <div className="topic-card" key={t.title}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <button
              className="topic-btn"
              onClick={() => handleStart(t.question)}
            >
              Start this debate
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Explore;
