"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Trending.css"

const Trending = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")

  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      category: "electronics",
      rating: 4.8,
      reviews: 2847,
      trendingRank: 1,
      badge: "🔥 #1 Trending",
      discount: 31,
    },
    {
      id: 2,
      name: "Smart Watch Series 8",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      category: "electronics",
      rating: 4.7,
      reviews: 1523,
      trendingRank: 2,
      badge: "🔥 Hot Deal",
      discount: 33,
    },
    {
      id: 3,
      name: "Coffee Maker Deluxe",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      category: "home",
      rating: 4.5,
      reviews: 892,
      trendingRank: 3,
      badge: "⚡ Fast Seller",
      discount: 20,
    },
    {
      id: 4,
      name: "Running Shoes Pro",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "sports",
      rating: 4.6,
      reviews: 2156,
      trendingRank: 4,
      badge: "🔥 Popular",
      discount: 19,
    },
    {
      id: 5,
      name: "Skincare Set Premium",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
      category: "beauty",
      rating: 4.9,
      reviews: 1834,
      trendingRank: 5,
      badge: "💄 Beauty Hit",
      discount: 38,
    },
    {
      id: 6,
      name: "Gaming Keyboard RGB",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
      category: "electronics",
      rating: 4.4,
      reviews: 967,
      trendingRank: 6,
      badge: "🎮 Gaming",
      discount: 25,
    },
    {
      id: 7,
      name: "Yoga Mat Premium",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      category: "sports",
      rating: 4.5,
      reviews: 567,
      trendingRank: 7,
      badge: "🧘 Wellness",
      discount: 25,
    },
    {
      id: 8,
      name: "Air Fryer Digital",
      price: 99.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
      category: "home",
      rating: 4.7,
      reviews: 1245,
      trendingRank: 8,
      badge: "🍳 Kitchen",
      discount: 33,
    },
  ]

  const categories = [
    { id: "all", name: "All Categories", icon: "🔥" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "home", name: "Home & Kitchen", icon: "🏠" },
    { id: "sports", name: "Sports & Fitness", icon: "⚽" },
    { id: "beauty", name: "Beauty & Personal Care", icon: "💄" },
  ]

  const sortOptions = [
    { id: "popularity", name: "Most Popular" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "discount", name: "Biggest Discount" },
  ]

  const filteredProducts = trendingProducts.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory,
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "discount":
        return b.discount - a.discount
      default:
        return a.trendingRank - b.trendingRank
    }
  })

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < Math.floor(rating) ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="trending-page">
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate("/")} className="home-btn">
            🏠 Home
          </button>
          <div className="header-content">
            <h1>🔥 Trending Now</h1>
            <p>Discover what's hot and popular right now</p>
            <div className="trending-stats">
              <div className="stat">
                <span className="stat-number">{trendingProducts.length}</span>
                <span className="stat-label">Trending Items</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Customers</span>
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

          <div className="sort-section">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-grid">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="trending-product-card" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="product-rank">#{product.trendingRank}</div>
              <div className="product-badge">{product.badge}</div>
              <div className="discount-badge">{product.discount}% OFF</div>

              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="rating-section">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="rating-text">({product.reviews})</span>
                </div>

                <div className="price-section">
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="savings">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
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
      </div>
    </div>
  )
}

export default Trending
