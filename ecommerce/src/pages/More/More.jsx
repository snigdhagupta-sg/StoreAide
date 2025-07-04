"use client"

import { useNavigate } from "react-router-dom"
import "./More.css"

const More = () => {
  const navigate = useNavigate()

  const moreCategories = [
    {
      title: "Shop by Category",
      items: [
        { name: "Electronics", icon: "📱", path: "/departments" },
        { name: "Clothing", icon: "👕", path: "/departments" },
        { name: "Home & Garden", icon: "🏠", path: "/departments" },
        { name: "Sports & Outdoors", icon: "⚽", path: "/departments" },
        { name: "Health & Beauty", icon: "💄", path: "/departments" },
        { name: "Automotive", icon: "🚗", path: "/departments" },
      ],
    },
    {
      title: "Services",
      items: [
        { name: "Pharmacy", icon: "💊", path: "/pharmacy" },
        { name: "Vision Center", icon: "👓", path: "/services" },
        { name: "Photo Services", icon: "📸", path: "/services" },
        { name: "Money Services", icon: "💰", path: "/services" },
        { name: "Auto Care", icon: "🔧", path: "/services" },
        { name: "Grocery Pickup", icon: "🛒", path: "/services" },
      ],
    },
    {
      title: "Account & Orders",
      items: [
        { name: "My Account", icon: "👤", path: "/my-items" },
        { name: "Order History", icon: "📋", path: "/order-history" },
        { name: "Track Orders", icon: "📦", path: "/order-history" },
        { name: "Returns", icon: "↩️", path: "/order-history" },
        { name: "Walmart+", icon: "⭐", path: "/walmart-plus" },
        { name: "Gift Cards", icon: "🎁", path: "/gift-cards" },
      ],
    },
    {
      title: "Help & Support",
      items: [
        { name: "Customer Service", icon: "🎧", path: "/chatbot" },
        { name: "Help Center", icon: "❓", path: "/item-search-help" },
        { name: "Contact Us", icon: "📞", path: "/feedback" },
        { name: "Store Locator", icon: "📍", path: "/store-locator" },
        { name: "Feedback", icon: "📝", path: "/feedback" },
        { name: "Accessibility", icon: "♿", path: "/accessibility" },
      ],
    },
  ]

  return (
    <div className="more-page">
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate("/")} className="home-btn">
            🏠 Home
          </button>
          <h1>More</h1>
          <p>Explore all Walmart services and features</p>
        </div>

        <div className="categories-grid">
          {moreCategories.map((category, index) => (
            <div key={index} className="category-section">
              <h2>{category.title}</h2>
              <div className="items-grid">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="more-item" onClick={() => navigate(item.path)}>
                    <div className="item-icon">{item.icon}</div>
                    <span className="item-name">{item.name}</span>
                    <span className="item-arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate("/cart")}>
              <span className="action-icon">🛒</span>
              <span>View Cart</span>
            </button>
            <button className="action-btn" onClick={() => navigate("/my-items")}>
              <span className="action-icon">❤️</span>
              <span>My Favorites</span>
            </button>
            <button className="action-btn" onClick={() => navigate("/order-history")}>
              <span className="action-icon">📋</span>
              <span>Order History</span>
            </button>
            <button className="action-btn" onClick={() => navigate("/chatbot")}>
              <span className="action-icon">💬</span>
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default More
