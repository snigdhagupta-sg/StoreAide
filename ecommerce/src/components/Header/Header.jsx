"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Header.css"

const Header = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/offline-store?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
          <div className="logo">
            <span className="logo-icon">⭐</span>
            <span className="logo-text">Walmart</span>
          </div>
          <div className="location">
            <span className="location-icon">📍</span>
            <div className="location-text">
              <span>Pickup or delivery?</span>
              <span>Sacramento, 95829</span>
            </div>
          </div>
        </div>

        <div className="header-center">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search everything at Walmart online and in store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>

        <div className="header-right">
          <div className="header-item">
            <span className="icon">❤️</span>
            <div className="header-text">
              <span>Reorder</span>
              <span>My Items</span>
            </div>
          </div>
          <div className="header-item">
            <span className="icon">👤</span>
            <div className="header-text">
              <span>Sign In</span>
              <span>Account</span>
            </div>
          </div>
          <div className="header-item cart">
            <span className="icon">🛒</span>
            <span className="cart-count">0</span>
            <span className="cart-total">$0.00</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
