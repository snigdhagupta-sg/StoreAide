"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./WalmartPlus.css"

const WalmartPlus = () => {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  const benefits = [
    {
      icon: "🚚",
      title: "Free Delivery",
      description: "Free delivery on orders $35+ from your store",
    },
    {
      icon: "⛽",
      title: "Fuel Discounts",
      description: "Save up to 10¢ per gallon at participating stations",
    },
    {
      icon: "📱",
      title: "Mobile Scan & Go",
      description: "Skip the checkout line with Scan & Go",
    },
    {
      icon: "🎬",
      title: "Paramount+ Essential",
      description: "Included subscription to Paramount+ Essential",
    },
    {
      icon: "💊",
      title: "Pharmacy Benefits",
      description: "Free shipping on prescriptions",
    },
    {
      icon: "🛒",
      title: "Early Access",
      description: "Early access to deals and special events",
    },
  ]

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: 12.95,
      period: "month",
      savings: null,
    },
    {
      id: "yearly",
      name: "Yearly",
      price: 98,
      period: "year",
      savings: "Save $57",
      popular: true,
    },
  ]

  return (
    <div className="walmart-plus-page">
      <div className="page-container">
        <button onClick={() => navigate("/")} className="home-btn">
          🏠 Home
        </button>

        <div className="hero-section">
          <div className="hero-content">
            <h1>Walmart+</h1>
            <p className="hero-subtitle">Save time and money with membership benefits</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">$1,300+</span>
                <span className="stat-label">Average annual savings</span>
              </div>
              <div className="stat">
                <span className="stat-number">160M+</span>
                <span className="stat-label">Items eligible for free delivery</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop"
              alt="Walmart+ Benefits"
            />
          </div>
        </div>

        <div className="benefits-section">
          <h2>Membership Benefits</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pricing-section">
          <h2>Choose Your Plan</h2>
          <div className="plans-container">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? "selected" : ""} ${plan.popular ? "popular" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">${plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                {plan.savings && <div className="savings-badge">{plan.savings}</div>}
              </div>
            ))}
          </div>
          <button className="join-btn">Start Free 30-Day Trial</button>
          <p className="trial-note">Cancel anytime. Terms apply.</p>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>What is Walmart+?</h4>
              <p>
                Walmart+ is a membership program that offers benefits like free delivery, fuel discounts, and more to
                help you save time and money.
              </p>
            </div>
            <div className="faq-item">
              <h4>How much does Walmart+ cost?</h4>
              <p>Walmart+ costs $12.95/month or $98/year. The annual plan saves you $57 compared to paying monthly.</p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Yes, you can cancel your Walmart+ membership at any time with no cancellation fees.</p>
            </div>
            <div className="faq-item">
              <h4>What's included in the free trial?</h4>
              <p>
                Your 30-day free trial includes all Walmart+ benefits. You won't be charged until after your trial ends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalmartPlus
