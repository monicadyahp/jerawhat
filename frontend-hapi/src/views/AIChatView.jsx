import React, { useRef, useEffect } from "react";

export default function AIChatView({
  messages,
  input,
  loading,
  handleInputChange,
  handleSubmit,
  justSent,
  setJustSent,
  typingResponse // <-- pastikan ini dipassing dari presenter!
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (justSent) {
      setJustSent(false); // reset setelah scroll
    }
    // eslint-disable-next-line
  }, [messages, justSent]);

  // Auto scroll ke bawah saat typingResponse update
  useEffect(() => {
    if (typingResponse) {
    }
  }, [typingResponse]);

  return (
    <section className="section" id="ai-chat">
      <div className="chat-container">
        <h2 className="section__title reveal-from-bottom">AI Chat</h2>
        <div className="chat-history">
            {messages
            .filter(msg => msg.role !== "system") // <-- ini kuncinya!
            .map((msg, idx) => (
                <div
                key={idx}
                className={`chat-row ${msg.role === "user" ? "chat-row--user" : "chat-row--ai"}`}
                >
                <div
                    className={`chat-bubble ${msg.role === "user" ? "chat-bubble--user" : "chat-bubble--ai"}`}
                >
                    {msg.content}
                </div>
                </div>
            ))}

          {/* TYPING EFFECT */}
          {typingResponse && (
            <div className="chat-row chat-row--ai">
              <div className="chat-bubble chat-bubble--ai">
                {typingResponse}
                <span className="blinking-cursor">|</span>
              </div>
            </div>
          )}

          {/* SPINNER INSIDE BUBBLE */}
          {loading && !typingResponse && (
            <div className="chat-row chat-row--ai">
              <div className="chat-bubble chat-bubble--ai" style={{ display: "flex", alignItems: "center" }}>
                <div className="spinner" style={{ marginRight: 10, marginLeft: 2 }} />
                <span className="chat-typing-text">AI is typing...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            placeholder="Type your message here..."
            rows={2}
            className="chat-input"
            value={input}
            onChange={handleInputChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="button"
            disabled={loading || !input.trim()}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}