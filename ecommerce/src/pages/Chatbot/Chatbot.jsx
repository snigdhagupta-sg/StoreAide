"use client";

import { useState } from "react";
import "./Chatbot.css";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Walmart shopping assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = [
    "Return policy",
    "Walmart+ benefits",
  ];

  const fetchBotResponse = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userMessage }),
      });
      const data = await response.json();
      return data.reply || "Sorry, I didn't understand that.";
    } 
    catch (error) {
      return "Sorry, there was an error connecting to the server.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      const botReply = await fetchBotResponse(inputMessage);

      const botMessage = {
        id: messages.length + 2,
        text: botReply,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Bot reply failed:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, something went wrong!",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="bot-avatar">🤖</div>
          <div className="bot-info">
            <h2>Walmart Assistant</h2>
            <span className="status">Online</span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <ReactMarkdown>{message.text}</ReactMarkdown>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="quick-replies">
          <p>Quick replies:</p>
          <div className="quick-reply-buttons">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button type="submit" className="send-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
