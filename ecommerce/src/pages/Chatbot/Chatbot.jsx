"use client"

import { useState } from "react"
import "./Chatbot.css"

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Walmart shopping assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickReplies = [
    "Track my order",
    "Find store hours",
    "Return policy",
    "Product availability",
    "Price match",
    "Walmart+ benefits",
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("order")) {
      return "I can help you track your order! Please provide your order number or email address."
    } else if (lowerMessage.includes("store") || lowerMessage.includes("hours")) {
      return "Most Walmart stores are open 6 AM - 11 PM. Would you like me to find specific store hours near you?"
    } else if (lowerMessage.includes("return")) {
      return "Walmart has a 90-day return policy for most items. Do you need help with a specific return?"
    } else {
      return "I understand you're asking about that. Let me connect you with a specialist who can provide more detailed assistance."
    }
  }

  const handleQuickReply = (reply) => {
    setInputMessage(reply)
  }

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
                <p>{message.text}</p>
                <span className="timestamp">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="quick-replies">
          <p>Quick replies:</p>
          <div className="quick-reply-buttons">
            {quickReplies.map((reply, index) => (
              <button key={index} className="quick-reply-btn" onClick={() => handleQuickReply(reply)}>
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
  )
}

export default Chatbot
