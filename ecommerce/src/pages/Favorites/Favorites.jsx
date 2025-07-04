"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Favorites.css"

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(stored)
  }, [])

  const clearFavorites = () => {
    localStorage.removeItem("favorites")
    setFavorites([])
  }

  const removeFromFavorites = (productId) => {
    const updated = favorites.filter((item) => item.id !== productId)
    localStorage.setItem("favorites", JSON.stringify(updated))
    setFavorites(updated)
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>,
      )
    }

    return stars
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1>My Favorites</h1>
          {favorites.length > 0 && (
            <button className="clear-btn" onClick={clearFavorites}>
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h2>No favorite items yet</h2>
            <p>Add items to your favorites by clicking the heart icon on product pages.</p>
            <button className="browse-btn" onClick={() => navigate("/")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((item) => (
              <div key={item.id} className="favorite-card">
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromFavorites(item.id)
                  }}
                  title="Remove from favorites"
                >
                  ❤️
                </button>
                <div className="card-content" onClick={() => handleProductClick(item.id)}>
                  <div className="product-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <div className="product-rating">
                      <div className="stars">{renderStars(item.rating)}</div>
                    </div>
                    <div className="product-pricing">
                      <span className="current-price">${item.price}</span>
                      {item.originalPrice && <span className="original-price">${item.originalPrice}</span>}
                    </div>
                    <div className="added-date">Added {new Date(item.addedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
