// src/pages/StartDebate.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function StartDebate() {
  const location = useLocation();

  const [question, setQuestion] = useState("");
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const [supportCount, setSupportCount] = useState(0);
  const [noSupportCount, setNoSupportCount] = useState(0);
  const [supportMessage, setSupportMessage] = useState("");
  const [roundNumber, setRoundNumber] = useState(0);
  const [currentStance, setCurrentStance] = useState("");

  const [followUpPrompt, setFollowUpPrompt] = useState("");
  const [followUpText, setFollowUpText] = useState("");
  const [thread, setThread] = useState([]);

  // Read ?topic= from URL and prefill
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topic = params.get("topic");
    if (topic) {
      setQuestion(topic);
    }
  }, [location.search]);

  const handleAsk = () => {
    const trimmed = question.trim();
    setDisplayedQuestion(trimmed || "(No question entered yet.)");
    setHasStarted(true);

    // reset debate state
    setSupportCount(0);
    setNoSupportCount(0);
    setSupportMessage("");
    setRoundNumber(0);
    setCurrentStance("");
    setFollowUpPrompt("");
    setFollowUpText("");
    setThread([]);
  };

  const generateAiReply = (userText, stance) => {
    const supportReplies = [
      "That's a thoughtful way to support the position. Another angle is to highlight long-term consequences or equity concerns.",
      "You make a strong supporting point. It could be even stronger if you add a concrete example or statistic.",
      "Your reasoning supports the claim well. You might also explain why alternatives are less convincing.",
    ];

    const opposeReplies = [
      "Good pushback. To deepen your critique, you could question the assumptions behind the original argument.",
      "You’ve identified a real weakness. Consider adding evidence or a counter-example to make it more persuasive.",
      "Nice challenge to the claim. You might also suggest an alternative solution or middle ground.",
    ];

    const list = stance === "Support" ? supportReplies : opposeReplies;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  };

  const handleSupportClick = (type) => {
    if (!hasStarted) return;

    if (type === "support") {
      setSupportCount((c) => c + 1);
      setSupportMessage("You chose to support this AI response.");
      setCurrentStance("Support");
      setFollowUpPrompt("Why do you support this response?");
    } else {
      setNoSupportCount((c) => c + 1);
      setSupportMessage("You chose not to support this AI response.");
      setCurrentStance("Do not support");
      setFollowUpPrompt("What was missing or incorrect?");
    }
    setFollowUpText("");
  };

  const handleFollowUpSubmit = () => {
    const text = followUpText.trim();
    if (!text || !currentStance) return;

    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);

    const userEntry = {
      id: Date.now() + "-user",
      round: nextRound,
      author: "You",
      stance: currentStance,
      text,
    };

    const aiEntry = {
      id: Date.now() + "-ai",
      round: nextRound,
      author: "AI",
      stance: "",
      text: generateAiReply(text, currentStance),
    };

    setThread((prev) => [...prev, userEntry, aiEntry]);
    setFollowUpPrompt("");
    setFollowUpText("");
  };

  return (
    <section className="section-card">
      <h2>Start a Debate</h2>
      <p>Type a topic or question you want to debate with the AI.</p>

      <textarea
        id="debate-input"
        placeholder="Example: Should college be free for all students?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button id="ask-button" onClick={handleAsk}>
        Ask AI (demo)
      </button>

      <p className="small-text">
        This is a demo version. It shows a placeholder AI message and lets you
        build a short debate thread.
      </p>

      {hasStarted && (
        <div id="ai-response-box" className="ai-box">
          <h3>AI response</h3>

          <p className="small-text">
            <strong>Your question:</strong> <span id="user-question">{displayedQuestion}</span>
          </p>

          <p className="ai-text">AI response coming soon.</p>

          <div className="support-row">
            <div className="support-buttons">
              <button
                className={
                  "support-btn support-yes" +
                  (currentStance === "Support" ? " selected" : "")
                }
                id="support-btn"
                onClick={() => handleSupportClick("support")}
              >
                👍 Support
              </button>
              <button
                className={
                  "support-btn support-no" +
                  (currentStance === "Do not support" ? " selected" : "")
                }
                id="nosupport-btn"
                onClick={() => handleSupportClick("nosupport")}
              >
                👎 Do not support
              </button>
            </div>
            <div className="support-counts small-text">
              Supports: <span id="support-count">{supportCount}</span> • Do not
              support: <span id="nosupport-count">{noSupportCount}</span>
            </div>
          </div>

          <p id="support-message" className="small-text">
            {supportMessage}
          </p>

          {/* Follow-up form */}
          {followUpPrompt && (
            <div style={{ marginTop: "10px" }}>
              <p className="small-text">
                <strong>{followUpPrompt}</strong>
              </p>
              <textarea
                id="followup-input"
                placeholder="Write your reasoning here..."
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
              />
              <button
                id="submit-followup"
                className="support-btn"
                onClick={handleFollowUpSubmit}
              >
                Submit
              </button>
            </div>
          )}

          {/* Debate thread */}
          <div id="debate-thread" className="debate-thread">
            {thread.map((entry) => (
              <div
                key={entry.id}
                className={
                  "debate-entry " +
                  (entry.author === "AI" ? "ai-entry" : "user-entry")
                }
              >
                <p className="small-text">
                  <strong>
                    Round {entry.round} – {entry.author}
                    {entry.stance ? ` (${entry.stance})` : ""}
                  </strong>
                </p>
                <p className="ai-text">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default StartDebate;
