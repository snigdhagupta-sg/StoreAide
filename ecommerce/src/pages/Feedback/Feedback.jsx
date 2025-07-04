"use client"

import { useState } from "react"
import "./Feedback.css"

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    rating: 5,
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = [
    "Product Quality",
    "Customer Service",
    "Website Experience",
    "Store Experience",
    "Delivery/Shipping",
    "Pricing",
    "Other",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        category: "",
        rating: 5,
        subject: "",
        message: "",
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Thank You for Your Feedback!</h2>
          <p>We appreciate your input and will use it to improve our services.</p>
          <p>You should receive a confirmation email shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-header">
          <h1>We Value Your Feedback</h1>
          <p>Help us improve your Walmart experience by sharing your thoughts</p>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Feedback Category *</label>
              <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Overall Rating</label>
              <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${formData.rating >= star ? "active" : ""}`}
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                  >
                    ⭐
                  </button>
                ))}
                <span className="rating-text">({formData.rating}/5)</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Brief description of your feedback"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Please provide detailed feedback..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  )
}

export default Feedback
