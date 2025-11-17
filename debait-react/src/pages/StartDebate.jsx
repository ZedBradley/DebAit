// src/pages/StartDebate.jsx
import React, { useState } from "react";

function StartDebate() {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const [question, setQuestion] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [roundNumber, setRoundNumber] = useState(0);
  const [thread, setThread] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [debateEnded, setDebateEnded] = useState(false);
  const [feedback, setFeedback] = useState("");

  // ------------ AI REQUEST ------------
  async function askOpenAI(prompt) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  // ------------ START DEBATE ------------
  async function startDebate() {
    if (!question.trim()) return alert("Enter a debate question first.");

    setHasStarted(true);
    setDebateEnded(false);
    setThread([]);
    setRoundNumber(1);
    setFeedback("");

    const prompt = `
You are an aggressive debate opponent. 
ALWAYS argue against the user's position.
Keep responses under 200 words.

The user says: "${question}"
Respond as Round 1 – AI, arguing AGAINST the user's stance.
`;

    setAiTyping(true);
    const aiReply = await askOpenAI(prompt);
    setAiTyping(false);

    setThread([
      {
        id: Date.now(),
        round: 1,
        author: "AI",
        text: aiReply
      }
    ]);
  }

  // ------------ USER MOVE ------------
  async function submitUserArgument() {
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    setUserInput("");

    // Add user entry
    const newUserEntry = {
      id: Date.now(),
      round: roundNumber,
      author: "You",
      text: userText
    };

    setThread((prev) => [...prev, newUserEntry]);

    // NEXT ROUND AI RESPONSE
    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);

    const aiPrompt = `
Continue this debate. 
Always argue directly AGAINST the user's newest argument.

User argument: "${userText}"

Respond as "Round ${nextRound} – AI".
Keep it short (<150 words).
`;

    setAiTyping(true);
    const aiReply = await askOpenAI(aiPrompt);
    setAiTyping(false);

    const newAiEntry = {
      id: Date.now() + 1,
      round: nextRound,
      author: "AI",
      text: aiReply
    };

    setThread((prev) => [...prev, newAiEntry]);
  }

  // ------------ END DEBATE BUTTON ------------
  async function endDebateNow() {
    setDebateEnded(true);

    const allText = thread.map((t) => `${t.author}: ${t.text}`).join("\n");

    const feedbackPrompt = `
You are a debate judge.
Give the user constructive feedback about their debate performance.
Mention strengths, weaknesses, and how they can improve.
Keep it under 200 words.

Here is the debate:

${allText}
    `;

    setAiTyping(true);
    const judgeReply = await askOpenAI(feedbackPrompt);
    setAiTyping(false);

    setFeedback(judgeReply);
  }

  // ------------ RESET ------------
  function resetDebate() {
    setHasStarted(false);
    setQuestion("");
    setThread([]);
    setRoundNumber(0);
    setUserInput("");
    setFeedback("");
    setDebateEnded(false);
  }

  return (
    <section className="section-card">
      <h2>Start a Debate</h2>
      <p>Type a topic you want to debate with the AI.</p>

      {/* INPUT */}
      {!hasStarted && (
        <>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Should college be free?"
          />
          <br />
          <button onClick={startDebate}>Start Debate</button>
        </>
      )}

      {/* END DEBATE BUTTON */}
      {hasStarted && !debateEnded && (
        <button
          onClick={endDebateNow}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            marginLeft: "10px",
            borderRadius: "8px",
            padding: "8px 14px",
            border: "none",
            cursor: "pointer"
          }}
        >
          End Debate
        </button>
      )}

      {/* THREAD */}
      {thread.length > 0 && (
        <div className="ai-box" style={{ marginTop: "20px" }}>
          {thread.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "12px",
                background: entry.author === "AI" ? "#eef2ff" : "#ecfdf5",
                padding: "12px",
                borderRadius: "8px"
              }}
            >
              <strong>
                Round {entry.round} – {entry.author}
              </strong>
              <p>{entry.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* USER INPUT */}
      {!debateEnded && hasStarted && (
        <div style={{ marginTop: "20px" }}>
          <textarea
            placeholder="Write your next argument..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={submitUserArgument} disabled={aiTyping}>
            {aiTyping ? "AI thinking..." : "Submit Argument"}
          </button>
        </div>
      )}

      {/* FEEDBACK + END MESSAGE */}
      {debateEnded && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#fff7ed",
            borderRadius: "8px"
          }}
        >
          <h3>🔥 Debate Finished</h3>
          <p>{feedback}</p>

          <button
            onClick={resetDebate}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              marginTop: "12px",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Start New Debate
          </button>
        </div>
      )}
    </section>
  );
}

export default StartDebate;
