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
  const [stance, setStance] = useState({});

  // ---------------- WORD LIMIT ----------------
  function trimTo200Words(text) {
    const words = text.split(/\s+/);
    return words.length <= 200 ? text : words.slice(0, 200).join(" ") + "...";
  }

  // ---------------- AI REQUEST ----------------
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
    const reply = data.choices?.[0]?.message?.content || "";
    return trimTo200Words(reply);
  }

  // ---------------- START DEBATE ----------------
  async function startDebate() {
    if (!question.trim()) return alert("Enter a debate question first.");

    setHasStarted(true);
    setDebateEnded(false);
    setThread([]);
    setRoundNumber(1);
    setFeedback("");
    setStance({});

    const prompt = `
You are an aggressive debate opponent.
Always argue against the user.
Response MUST be under 200 words.

User topic: "${question}"
Give Round 1 – AI response.
`;

    setAiTyping(true);
    const aiReply = await askOpenAI(prompt);
    setAiTyping(false);

    setThread([
      { id: Date.now(), round: 1, author: "AI", text: aiReply }
    ]);
  }

  // ---------------- USER ARGUMENT ----------------
  async function submitUserArgument() {
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    setUserInput("");

    const newUserEntry = {
      id: Date.now(),
      round: roundNumber,
      author: "You",
      text: userText
    };

    setThread((prev) => [...prev, newUserEntry]);

    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);

    const aiPrompt = `
Continue this debate.
Always argue AGAINST the user's argument.
Response must be under 200 words.

User said: "${userText}"
Respond as Round ${nextRound} – AI.
`;

    setAiTyping(true);
    const aiReply = await askOpenAI(aiPrompt);
    setAiTyping(false);

    setThread((prev) => [
      ...prev,
      { id: Date.now() + 1, round: nextRound, author: "AI", text: aiReply }
    ]);
  }

  // ---------------- SUPPORT BUTTONS ----------------
  function chooseStance(round, choice) {
    setStance((prev) => ({ ...prev, [round]: choice }));
  }

  // ---------------- END DEBATE ----------------
  async function endDebateNow() {
    setDebateEnded(true);

    const allText = thread.map((t) => `${t.author}: ${t.text}`).join("\n\n");

    const feedbackPrompt = `
You are a debate judge.
Give constructive feedback.
Mention strengths, weaknesses, improvement.
Under 200 words.

Debate Transcript:
${allText}
`;

    setAiTyping(true);
    const judgeReply = await askOpenAI(feedbackPrompt);
    setAiTyping(false);

    setFeedback(judgeReply);
  }

  // ---------------- RESET ----------------
  function resetDebate() {
    setHasStarted(false);
    setQuestion("");
    setThread([]);
    setUserInput("");
    setFeedback("");
    setDebateEnded(false);
    setStance({});
    setRoundNumber(0);
  }

  return (
    <section className="section-card">
      <h2>Start a Debate</h2>
      <p>Type a topic you want to debate with the AI.</p>

      {/* START INPUT */}
      {!hasStarted && (
        <>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Should college be free?"
          />
          <button onClick={startDebate}>Start Debate</button>
        </>
      )}

      {/* END DEBATE BUTTON */}
      {hasStarted && !debateEnded && (
        <button
          onClick={endDebateNow}
          className="end-btn"
        >
          End Debate
        </button>
      )}

      {/* THREAD */}
      {thread.length > 0 && (
        <div className="ai-box">
          {thread.map((entry) => (
            <div
              key={entry.id}
              className={`debate-entry ${
                entry.author === "AI" ? "ai-entry" : "user-entry"
              }`}
            >
              <strong>
                Round {entry.round} – {entry.author}
              </strong>
              <p>{entry.text}</p>

              {/* SUPPORT / DON'T SUPPORT under AI only */}
              {entry.author === "AI" && !debateEnded && (
                <div className="support-row">
                  <button
                    onClick={() => chooseStance(entry.round, "support")}
                    className={`support-btn support-yes ${
                      stance[entry.round] === "support" ? "selected" : ""
                    }`}
                  >
                    👍 Support
                  </button>

                  <button
                    onClick={() => chooseStance(entry.round, "oppose")}
                    className={`support-btn support-no ${
                      stance[entry.round] === "oppose" ? "selected" : ""
                    }`}
                  >
                    👎 Don’t Support
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* USER INPUT */}
      {!debateEnded && hasStarted && (
        <div className="user-input-block">
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

      {/* FEEDBACK */}
      {debateEnded && (
        <div className="feedback-box">
          <h3>🔥 Debate Finished</h3>
          <p>{feedback}</p>

          <button onClick={resetDebate}>
            Start New Debate
          </button>
        </div>
      )}
    </section>
  );
}

export default StartDebate;
