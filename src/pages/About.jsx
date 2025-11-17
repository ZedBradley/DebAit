// src/pages/About.jsx
import React from "react";

function About() {
  return (
    <>
      <section className="section-card">
        <h2>About DebAIt</h2>
        <p>
          DebAIt is an academic project that uses AI to simulate debate partners
          for students. Instead of only reading arguments in a textbook,
          learners can ask questions, get a clear response, and then practice
          agreeing, disagreeing, or refining the position.
        </p>
        <p>The main goal is not to “win” debates, but to help users:</p>
        <ul>
          <li>Practice building logical, well-structured arguments</li>
          <li>See multiple perspectives on complex issues</li>
          <li>Reflect on their own reasoning and potential biases</li>
          <li>Prepare for essays, presentations, or class discussions</li>
        </ul>
      </section>

      <section className="section-card">
        <h2>How DebAIt Works</h2>
        <p>
          DebAIt is split into a simple front end and an AI-powered back end
        </p>
        <ul>
          <li>
            <strong>Front end:</strong> React app with pages for Home, Start
            Debate, Explore, and About.
          </li>
          <li>
            <strong>Debate flow:</strong> The user enters a question or topic,
            and the system generates an AI stance (currently a placeholder).
          </li>
          <li>
            <strong>Student role:</strong> Students read the AI’s argument, then
            write their own response or rebuttal.
          </li>
          <li>
            <strong>Explore page:</strong> Provides sample topics that can be
            used in class or for practice.
          </li>
        </ul>
      </section>

      <section className="section-card">
        <h2>Project Details</h2>
        <ul>
            <li><strong>Course:</strong> CS 1200-001, Professor Klyne Smith, University of Texas at Dallas</li>
            <li><strong>Semester:</strong> Fall 2025</li>
            <li><strong>Team members:</strong> Zedekiah Bradley (UI/UX), Johnson Vasquez Lopez (AI integration), Sachin Rana (Log in feature)</li>
        </ul>
      </section>

      <section className="section-card">
        <h2>Ethics &amp; Limitations</h2>
        <p>Because DebAIt uses AI-generated responses (in the future):</p>
        <ul>
          <li>
            AI might oversimplify or miss important context in complex topics.
          </li>
          <li>Responses should be treated as starting points, not final answers.</li>
          <li>
            Students are encouraged to fact-check claims and bring in real
            sources.
          </li>
          <li>
            Debates involving sensitive topics should be handled respectfully and
            thoughtfully.
          </li>
        </ul>
        <p className="small-text">
          DebAIt is meant as a learning tool to support critical thinking, not
          to replace research, teachers, or expert feedback.
        </p>
      </section>
    </>
  );
}

export default About;
