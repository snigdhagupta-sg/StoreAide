"use client"
import { Link } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const quickLinks = [
    { name: "Chatbot", icon: "💬", path: "/chatbot" },
    { name: "Feedback", icon: "📝", path: "/feedback" },
    { name: "Item Search Help", icon: "🔍", path: "/item-search-help" },
    { name: "Cart", icon: "🛒", path: "/cart" },
    { name: "Order History", icon: "📋", path: "/order-history" },
    { name: "Search in different isle", icon: "📋", path: "/item_not_present" },
  ]

  const handleLinkClick = () => {
    toggleSidebar() // Close sidebar when link is clicked
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h3>Quick Links</h3>
          <button className="close-btn" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="quick-link" onClick={handleLinkClick}>
              <span className="link-icon">{link.icon}</span>
              <span className="link-text">{link.name}</span>
              <span className="link-arrow">→</span>
            </Link>
          ))}
        </div>
        <div className="sidebar-footer">
          <div className="help-section">
            <h4>Need Help?</h4>
            <p>Contact our customer service team for assistance with your shopping experience.</p>
            <button className="help-btn">Get Help</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
