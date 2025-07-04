"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MyItems.css"

const MyItems = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("favorites")

  const favoriteItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      inStock: true,
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Smart Watch Series 8",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      inStock: true,
      addedDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Coffee Maker Deluxe",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
      inStock: false,
      addedDate: "2024-01-08",
    },
  ]

  const recentlyViewed = [
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
      viewedDate: "2024-01-16",
    },
    {
      id: 5,
      name: "Laptop Stand",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
      viewedDate: "2024-01-15",
    },
  ]

  const savedForLater = [
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
      savedDate: "2024-01-12",
    },
  ]

  return (
    <div className="my-items-page">
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate("/")} className="home-btn">
            🏠 Home
          </button>
          <h1>My Items</h1>
          <p>Manage your favorite items, recently viewed products, and saved items</p>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              ❤️ Favorites ({favoriteItems.length})
            </button>
            <button className={`tab ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
              👁️ Recently Viewed ({recentlyViewed.length})
            </button>
            <button className={`tab ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
              💾 Saved for Later ({savedForLater.length})
            </button>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === "favorites" && (
            <div className="items-grid">
              {favoriteItems.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    {!item.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                    <p className="added-date">Added {new Date(item.addedDate).toLocaleDateString()}</p>
                    <div className="item-actions">
                      <button className="add-to-cart-btn" disabled={!item.inStock}>
                        {item.inStock ? "Add to Cart" : "Notify When Available"}
                      </button>
                      <button className="remove-btn">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "recent" && (
            <div className="items-grid">
              {recentlyViewed.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                    <p className="viewed-date">Viewed {new Date(item.viewedDate).toLocaleDateString()}</p>
                    <div className="item-actions">
                      <button className="add-to-cart-btn">Add to Cart</button>
                      <button className="save-btn">Save to Favorites</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="items-grid">
              {savedForLater.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                    <p className="saved-date">Saved {new Date(item.savedDate).toLocaleDateString()}</p>
                    <div className="item-actions">
                      <button className="add-to-cart-btn">Add to Cart</button>
                      <button className="move-btn">Move to Favorites</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyItems
