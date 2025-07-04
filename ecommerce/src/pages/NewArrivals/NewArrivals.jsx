"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NewArrivals.css"

const NewArrivals = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [timeFilter, setTimeFilter] = useState("week")

  const newProducts = [
    {
      id: 9,
      name: "Wireless Earbuds Pro Max",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
      category: "electronics",
      rating: 4.9,
      reviews: 234,
      arrivalDate: "2024-01-20",
      badge: "✨ Just Launched",
      features: ["Active Noise Cancellation", "Wireless Charging", "30hr Battery"],
    },
    {
      id: 10,
      name: "Smart Home Hub 2024",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      category: "electronics",
      rating: 4.7,
      reviews: 156,
      arrivalDate: "2024-01-18",
      badge: "🆕 New Tech",
      features: ["Voice Control", "Smart Integration", "Energy Efficient"],
    },
    {
      id: 11,
      name: "Fitness Tracker Elite",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop",
      category: "sports",
      rating: 4.6,
      reviews: 89,
      arrivalDate: "2024-01-17",
      badge: "⌚ Wearable",
      features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"],
    },
    {
      id: 12,
      name: "Portable Power Bank Ultra",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1609592806596-4d8b5b5c5b1a?w=300&h=300&fit=crop",
      category: "electronics",
      rating: 4.5,
      reviews: 67,
      arrivalDate: "2024-01-16",
      badge: "🔋 Power",
      features: ["Fast Charging", "Wireless Charging", "20000mAh"],
    },
    {
      id: 13,
      name: "Organic Skincare Bundle",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      category: "beauty",
      rating: 4.8,
      reviews: 145,
      arrivalDate: "2024-01-15",
      badge: "🌿 Organic",
      features: ["All Natural", "Cruelty Free", "Dermatologist Tested"],
    },
    {
      id: 14,
      name: "Smart Kitchen Scale",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      category: "home",
      rating: 4.4,
      reviews: 78,
      arrivalDate: "2024-01-14",
      badge: "🍳 Kitchen",
      features: ["App Connected", "Nutritional Info", "Recipe Suggestions"],
    },
    {
      id: 15,
      name: "Resistance Bands Set Pro",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      category: "sports",
      rating: 4.7,
      reviews: 123,
      arrivalDate: "2024-01-13",
      badge: "💪 Fitness",
      features: ["5 Resistance Levels", "Door Anchor", "Exercise Guide"],
    },
    {
      id: 16,
      name: "LED Desk Lamp Smart",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      category: "home",
      rating: 4.6,
      reviews: 92,
      arrivalDate: "2024-01-12",
      badge: "💡 Smart",
      features: ["Touch Control", "USB Charging", "Eye Protection"],
    },
  ]

  const categories = [
    { id: "all", name: "All New Items", icon: "✨" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "home", name: "Home & Kitchen", icon: "🏠" },
    { id: "sports", name: "Sports & Fitness", icon: "⚽" },
    { id: "beauty", name: "Beauty & Care", icon: "💄" },
  ]

  const timeFilters = [
    { id: "today", name: "Today" },
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "all", name: "All Time" },
  ]

  const filteredProducts = newProducts.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory,
  )

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < Math.floor(rating) ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="new-arrivals-page">
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate("/")} className="home-btn">
            🏠 Home
          </button>
          <div className="header-content">
            <h1>✨ New Arrivals</h1>
            <p>Discover the latest products just added to our collection</p>
            <div className="arrival-stats">
              <div className="stat">
                <span className="stat-number">{newProducts.length}</span>
                <span className="stat-label">New This Week</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">More Coming Soon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="category-filters">
            <h3>Categories:</h3>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="time-filters">
            <h3>Added:</h3>
            <div className="time-buttons">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  className={`time-btn ${timeFilter === filter.id ? "active" : ""}`}
                  onClick={() => setTimeFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="new-product-card" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="new-badge">{product.badge}</div>
              <div className="days-badge">{getDaysAgo(product.arrivalDate)} days ago</div>

              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <div className="image-overlay">
                  <span className="new-label">NEW</span>
                </div>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="rating-section">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="rating-text">({product.reviews} reviews)</span>
                </div>

                <div className="features-list">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="price-section">
                  <span className="price">${product.price}</span>
                  <span className="arrival-date">Added {new Date(product.arrivalDate).toLocaleDateString()}</span>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log("Added to cart:", product.name)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="coming-soon-section">
          <h2>🚀 Coming Soon</h2>
          <p>Stay tuned for more exciting new products launching this month!</p>
          <button className="notify-btn">🔔 Notify Me of New Arrivals</button>
        </div>
      </div>
    </div>
  )
}

export default NewArrivals
