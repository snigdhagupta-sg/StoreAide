"use client"

import PromoCard from "../PromoCard/PromoCard"
import "./MainContent.css"
import { useNavigate } from "react-router-dom"

const MainContent = () => {
  const navigate = useNavigate()

  const promoData = [
    {
      id: 1,
      title: "Save on La Roche-Posay Anthelios",
      subtitle: "Shop now",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center",
      backgroundColor: "#f5f5f5",
      size: "small",
    },
    {
      id: 2,
      title: "July 4th faves from $1.98",
      subtitle: "Get it in as fast as an hour*",
      image: "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?w=600&h=400&fit=crop&crop=center",
      backgroundColor: "#e3f2fd",
      size: "large",
      featured: true,
    },
    {
      id: 3,
      title: "Up to 40% off home appliances",
      subtitle: "Shop now",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center",
      backgroundColor: "#f0f0f0",
      size: "medium",
    },
    {
      id: 4,
      title: "New Jurassic World movie",
      subtitle: "Shop toys & more",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
      backgroundColor: "#e8f5e8",
      size: "small",
    },
    {
      id: 5,
      title: "Premium beauty. Victoria's Secret.",
      subtitle: "Shop now",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center",
      backgroundColor: "#fff3e0",
      size: "medium",
    },
    {
      id: 6,
      title: "Up to 65% off",
      subtitle: "Shop now",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
      backgroundColor: "#fff9c4",
      size: "medium",
    },
  ]

  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop&crop=center",
    },
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop&crop=center",
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&crop=center",
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    },
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&crop=center",
    },
    {
      name: "Automotive",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop&crop=center",
    },
  ]

  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=250&h=250&fit=crop&crop=center",
      trending: true,
      badge: "🔥 Trending",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=250&h=250&fit=crop&crop=center",
      trending: true,
      badge: "🔥 Hot Deal",
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=250&h=250&fit=crop&crop=center",
      trending: true,
      badge: "⚡ Fast Seller",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=250&h=250&fit=crop&crop=center",
      trending: true,
      badge: "🔥 Popular",
    },
  ]

  const newArrivals = [
    {
      id: 9,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=250&h=250&fit=crop&crop=center",
      isNew: true,
      badge: "✨ New",
    },
    {
      id: 10,
      name: "Smart Home Hub",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=250&h=250&fit=crop&crop=center",
      isNew: true,
      badge: "🆕 Just In",
    },
    {
      id: 11,
      name: "Fitness Tracker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=250&h=250&fit=crop&crop=center",
      isNew: true,
      badge: "✨ New",
    },
    {
      id: 12,
      name: "Portable Charger",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1609592806596-4d8b5b5c5b1a?w=250&h=250&fit=crop&crop=center",
      isNew: true,
      badge: "🆕 Latest",
    },
  ]

  const pharmacyProducts = [
    {
      id: 13,
      name: "Multivitamins",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=250&h=250&fit=crop&crop=center",
      category: "Vitamins",
      badge: "💊 Health",
    },
    {
      id: 14,
      name: "Pain Relief Gel",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=250&h=250&fit=crop&crop=center",
      category: "Pain Relief",
      badge: "🏥 Pharmacy",
    },
    {
      id: 15,
      name: "First Aid Kit",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1603398938425-f2c8f5e6e3b8?w=250&h=250&fit=crop&crop=center",
      category: "First Aid",
      badge: "🚑 Essential",
    },
    {
      id: 16,
      name: "Blood Pressure Monitor",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=250&h=250&fit=crop&crop=center",
      category: "Health Monitoring",
      badge: "💊 Health",
    },
  ]

  return (
    <main className="main-content">
      <div className="content-container">
        {/* Hero Promo Section */}
        <div className="promo-grid">
          {promoData.map((promo) => (
            <PromoCard key={promo.id} {...promo} />
          ))}
        </div>

        <section className="additional-content">
          {/* Featured Categories */}
          <div className="content-section">
            <h2>Shop by Category</h2>
            <div className="category-grid">
              {categories.map((category, index) => (
                <div key={index} className="category-item" onClick={() => navigate("/departments")}>
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Products */}
          <div className="content-section">
            <div className="section-header">
              <h2>🔥 Trending Now</h2>
              <button className="view-all-btn" onClick={() => navigate("/trending")}>
                View All Trending →
              </button>
            </div>
            <div className="product-grid">
              {trendingProducts.map((product, index) => (
                <div key={index} className="product-item trending" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="product-badge trending-badge">{product.badge}</div>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <h4>{product.name}</h4>
                  <div className="price-container">
                    <p className="price">${product.price}</p>
                    {product.originalPrice && <p className="original-price">${product.originalPrice}</p>}
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("Added to cart:", product.name)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="content-section">
            <div className="section-header">
              <h2>✨ New Arrivals</h2>
              <button className="view-all-btn" onClick={() => navigate("/new-arrivals")}>
                View All New →
              </button>
            </div>
            <div className="product-grid">
              {newArrivals.map((product, index) => (
                <div
                  key={index}
                  className="product-item new-arrival"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-badge new-badge">{product.badge}</div>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">${product.price}</p>
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("Added to cart:", product.name)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pharmacy Section */}
          <div className="content-section">
            <div className="section-header">
              <h2>💊 Pharmacy & Health</h2>
              <button className="view-all-btn" onClick={() => navigate("/pharmacy")}>
                Visit Pharmacy →
              </button>
            </div>
            <div className="product-grid">
              {pharmacyProducts.map((product, index) => (
                <div key={index} className="product-item pharmacy" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="product-badge pharmacy-badge">{product.badge}</div>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                  <p className="price">${product.price}</p>
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("Added to cart:", product.name)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default MainContent
