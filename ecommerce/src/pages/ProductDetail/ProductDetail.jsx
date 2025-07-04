"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showReviewSummary, setShowReviewSummary] = useState(false)

  // Sample product data - in real app this would come from API
  const products = {
    1: {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviewCount: 2847,
      description:
        "Experience premium sound quality with these wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for music, calls, and gaming.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0 connectivity",
        "Built-in microphone",
        "Foldable design",
        "Quick charge - 5 min for 2 hours playback",
      ],
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Blue", value: "#0071CE" },
        { name: "Red", value: "#FF0000" },
      ],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "AudioTech",
        Model: "AT-WH1000",
        Connectivity: "Bluetooth 5.0, 3.5mm jack",
        "Battery Life": "30 hours",
        Weight: "250g",
        Warranty: "2 years",
      },
    },
    2: {
      id: 2,
      name: "Smart Watch Series 8",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviewCount: 1523,
      description:
        "Stay connected and track your health with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, water resistance, and seamless smartphone integration.",
      features: [
        "Heart rate & ECG monitoring",
        "GPS tracking",
        "Water resistant (50m)",
        "7-day battery life",
        "Sleep tracking",
        "100+ workout modes",
      ],
      colors: [
        { name: "Space Gray", value: "#4A4A4A" },
        { name: "Silver", value: "#C0C0C0" },
        { name: "Gold", value: "#FFD700" },
      ],
      sizes: ["40mm", "44mm"],
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "TechWatch",
        Model: "TW-S8",
        Display: '1.9" AMOLED',
        Battery: "7 days typical use",
        "Water Resistance": "50 meters",
        Compatibility: "iOS & Android",
      },
    },
    3: {
      id: 3,
      name: "Coffee Maker Deluxe",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.3,
      reviewCount: 892,
      description:
        "Brew the perfect cup every time with this premium coffee maker. Features programmable settings, thermal carafe, and built-in grinder for the freshest coffee experience.",
      features: [
        "Built-in coffee grinder",
        "Programmable 24-hour timer",
        "Thermal carafe keeps coffee hot",
        "Auto shut-off safety feature",
        "Water filtration system",
        "12-cup capacity",
      ],
      colors: [
        { name: "Stainless Steel", value: "#C0C0C0" },
        { name: "Black", value: "#000000" },
      ],
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "BrewMaster",
        Model: "BM-1200",
        Capacity: "12 cups",
        Power: "1200W",
        Dimensions: '14" x 10" x 16"',
        Warranty: "3 years",
      },
    },
    4: {
      id: 4,
      name: "Running Shoes Premium",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviewCount: 1247,
      description:
        "Engineered for performance and comfort, these premium running shoes feature advanced cushioning technology and breathable materials for your best run yet.",
      features: [
        "Advanced cushioning technology",
        "Breathable mesh upper",
        "Durable rubber outsole",
        "Lightweight design",
        "Moisture-wicking lining",
        "Reflective details for visibility",
      ],
      colors: [
        { name: "Black/White", value: "#000000" },
        { name: "Blue/Gray", value: "#4169E1" },
        { name: "Red/Black", value: "#DC143C" },
      ],
      sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "RunTech",
        Model: "RT-Pro",
        Material: "Mesh/Synthetic",
        Weight: "10.5 oz",
        Drop: "10mm",
        Type: "Neutral",
      },
    },
    5: {
      id: 5,
      name: "Laptop Stand Adjustable",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.4,
      reviewCount: 634,
      description:
        "Improve your workspace ergonomics with this adjustable laptop stand. Features multiple height and angle adjustments for optimal viewing comfort.",
      features: [
        "6 height adjustments",
        "360-degree rotation",
        "Foldable and portable",
        "Heat dissipation design",
        "Non-slip silicone pads",
        "Supports up to 17-inch laptops",
      ],
      colors: [
        { name: "Silver", value: "#C0C0C0" },
        { name: "Space Gray", value: "#4A4A4A" },
      ],
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "ErgoDesk",
        Model: "ED-LS100",
        Material: "Aluminum Alloy",
        Weight: "2.2 lbs",
        Compatibility: "10-17 inch laptops",
        Warranty: "1 year",
      },
    },
    6: {
      id: 6,
      name: "Bluetooth Speaker Portable",
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.5,
      reviewCount: 1156,
      description:
        "Take your music anywhere with this powerful portable Bluetooth speaker. Waterproof design with 360-degree sound and long-lasting battery life.",
      features: [
        "360-degree surround sound",
        "IPX7 waterproof rating",
        "20-hour battery life",
        "Wireless stereo pairing",
        "Built-in microphone",
        "USB-C fast charging",
      ],
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Blue", value: "#0071CE" },
        { name: "Red", value: "#DC143C" },
      ],
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "SoundWave",
        Model: "SW-360",
        Power: "20W",
        Battery: "4000mAh",
        Range: "100 feet",
        Warranty: "2 years",
      },
    },
    7: {
      id: 7,
      name: "Yoga Mat Premium",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.7,
      reviewCount: 823,
      description:
        "Practice yoga in comfort with this premium non-slip yoga mat. Made from eco-friendly materials with superior grip and cushioning.",
      features: [
        "Non-slip textured surface",
        "Eco-friendly TPE material",
        "6mm thick cushioning",
        "Lightweight and portable",
        "Easy to clean",
        "Alignment lines included",
      ],
      colors: [
        { name: "Purple", value: "#800080" },
        { name: "Blue", value: "#0071CE" },
        { name: "Pink", value: "#FFC0CB" },
        { name: "Green", value: "#008000" },
      ],
      images: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "ZenFit",
        Model: "ZF-Premium",
        Material: "TPE",
        Thickness: "6mm",
        Size: '72" x 24"',
        Weight: "2.5 lbs",
      },
    },
    8: {
      id: 8,
      name: "Phone Case Protective",
      price: 19.99,
      originalPrice: 34.99,
      rating: 4.2,
      reviewCount: 567,
      description:
        "Protect your phone with this military-grade protective case. Features shock absorption, raised edges, and wireless charging compatibility.",
      features: [
        "Military-grade drop protection",
        "Shock-absorbing corners",
        "Raised camera protection",
        "Wireless charging compatible",
        "Precise cutouts",
        "Anti-fingerprint coating",
      ],
      colors: [
        { name: "Clear", value: "#FFFFFF" },
        { name: "Black", value: "#000000" },
        { name: "Blue", value: "#0071CE" },
      ],
      images: [
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1601593346740-925612772716?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "ShieldTech",
        Model: "ST-Pro",
        Material: "TPU + PC",
        Compatibility: "iPhone 14/15 Series",
        Drop: "12 feet tested",
        Warranty: "Lifetime",
      },
    },
  }

  const product = products[id]

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || "")
      setSelectedSize(product.sizes?.[0] || "")
    }
  }, [product])

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate("/")} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent quality!",
      content:
        "These headphones exceeded my expectations. The sound quality is amazing and the noise cancellation works perfectly. Highly recommend!",
      verified: true,
    },
    {
      id: 2,
      author: "Mike R.",
      rating: 4,
      date: "2024-01-10",
      title: "Great value for money",
      content:
        "Good build quality and comfortable to wear for long periods. Battery life is as advertised. Only minor complaint is the case could be smaller.",
      verified: true,
    },
    {
      id: 3,
      author: "Jennifer L.",
      rating: 5,
      date: "2024-01-08",
      title: "Perfect for work calls",
      content:
        "Crystal clear audio for video calls and music. The active noise cancellation is a game changer for my home office setup.",
      verified: false,
    },
    {
      id: 4,
      author: "David K.",
      rating: 5,
      date: "2024-01-05",
      title: "Amazing sound quality",
      content:
        "The bass is incredible and the highs are crystal clear. These headphones are worth every penny. Fast shipping too!",
      verified: true,
    },
    {
      id: 5,
      author: "Lisa P.",
      rating: 4,
      date: "2024-01-03",
      title: "Comfortable for long use",
      content:
        "I wear these for 8+ hours a day working from home. Very comfortable and the battery lasts all day. Great purchase!",
      verified: true,
    },
    {
      id: 6,
      author: "Robert T.",
      rating: 5,
      date: "2024-01-01",
      title: "Best headphones I've owned",
      content:
        "Upgraded from my old headphones and the difference is night and day. The noise cancellation is phenomenal.",
      verified: true,
    },
    {
      id: 7,
      author: "Amanda S.",
      rating: 4,
      date: "2023-12-28",
      title: "Great for travel",
      content:
        "Used these on a 12-hour flight and they were perfect. Noise cancellation blocked out the plane noise completely.",
      verified: false,
    },
    {
      id: 8,
      author: "Chris W.",
      rating: 5,
      date: "2023-12-25",
      title: "Perfect Christmas gift",
      content: "Bought these as a gift for my son and he absolutely loves them. Great quality and fast delivery.",
      verified: true,
    },
    {
      id: 9,
      author: "Maria G.",
      rating: 4,
      date: "2023-12-22",
      title: "Excellent build quality",
      content:
        "These feel very premium and well-made. The materials are high quality and they fold up nicely for travel.",
      verified: true,
    },
    {
      id: 10,
      author: "James H.",
      rating: 5,
      date: "2023-12-20",
      title: "Outstanding performance",
      content: "The sound quality is exceptional. I use these for music production and they're incredibly accurate.",
      verified: true,
    },
    {
      id: 11,
      author: "Nicole B.",
      rating: 4,
      date: "2023-12-18",
      title: "Love the wireless feature",
      content: "No more tangled wires! The Bluetooth connection is stable and the range is impressive.",
      verified: false,
    },
    {
      id: 12,
      author: "Kevin M.",
      rating: 5,
      date: "2023-12-15",
      title: "Incredible battery life",
      content: "The 30-hour battery life is not exaggerated. I charge these maybe once a week with daily use.",
      verified: true,
    },
    {
      id: 13,
      author: "Rachel D.",
      rating: 4,
      date: "2023-12-12",
      title: "Great for gaming",
      content: "Use these for gaming and the sound positioning is excellent. Can hear footsteps clearly in FPS games.",
      verified: true,
    },
    {
      id: 14,
      author: "Tom L.",
      rating: 5,
      date: "2023-12-10",
      title: "Stylish and functional",
      content:
        "These look great and perform even better. The design is sleek and modern. Very happy with this purchase.",
      verified: true,
    },
    {
      id: 15,
      author: "Emma R.",
      rating: 4,
      date: "2023-12-08",
      title: "Good value",
      content: "For the price, these are excellent headphones. The features you get for the money is impressive.",
      verified: false,
    },
    {
      id: 16,
      author: "Alex C.",
      rating: 5,
      date: "2023-12-05",
      title: "Perfect for commuting",
      content: "Use these on my daily train commute. The noise cancellation makes the journey so much more pleasant.",
      verified: true,
    },
    {
      id: 17,
      author: "Sophia J.",
      rating: 4,
      date: "2023-12-03",
      title: "Comfortable fit",
      content: "These don't hurt my ears even after wearing them for hours. The padding is soft and well-designed.",
      verified: true,
    },
    {
      id: 18,
      author: "Mark F.",
      rating: 5,
      date: "2023-12-01",
      title: "Excellent customer service",
      content: "Had a small issue and customer service resolved it immediately. Great product and great support.",
      verified: true,
    },
    {
      id: 19,
      author: "Hannah K.",
      rating: 4,
      date: "2023-11-28",
      title: "Quick charging feature",
      content: "The quick charge feature is amazing. 5 minutes of charging gives hours of playback time.",
      verified: false,
    },
    {
      id: 20,
      author: "Daniel P.",
      rating: 5,
      date: "2023-11-25",
      title: "Highly recommended",
      content:
        "I've tried many headphones and these are by far the best. Sound quality, comfort, and features are all top-notch.",
      verified: true,
    },
    {
      id: 21,
      author: "Grace T.",
      rating: 4,
      date: "2023-11-22",
      title: "Great for workouts",
      content: "These stay secure during workouts and the sweat resistance is good. Perfect for the gym.",
      verified: true,
    },
    {
      id: 22,
      author: "Ryan S.",
      rating: 5,
      date: "2023-11-20",
      title: "Amazing noise cancellation",
      content: "The active noise cancellation is incredible. I can focus completely on my music or calls.",
      verified: true,
    },
    {
      id: 23,
      author: "Olivia M.",
      rating: 4,
      date: "2023-11-18",
      title: "Sleek design",
      content: "These headphones look premium and feel premium. The design is modern and attractive.",
      verified: false,
    },
    {
      id: 24,
      author: "Nathan W.",
      rating: 5,
      date: "2023-11-15",
      title: "Best purchase this year",
      content: "Absolutely love these headphones. They've exceeded all my expectations. Worth every dollar.",
      verified: true,
    },
    {
      id: 25,
      author: "Chloe A.",
      rating: 4,
      date: "2023-11-12",
      title: "Great microphone quality",
      content: "The built-in microphone is excellent for calls. Everyone says I sound crystal clear.",
      verified: true,
    },
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }

  const reviewSummary = {
    averageRating: 4.6,
    totalReviews: 25,
    ratingBreakdown: {
      5: 16,
      4: 8,
      3: 1,
      2: 0,
      1: 0,
    },
    highlights: [
      "Excellent sound quality mentioned in 89% of reviews",
      "Battery life praised by 76% of customers",
      "Comfort highlighted in 68% of reviews",
      "Noise cancellation loved by 84% of users",
    ],
    commonPros: ["Amazing sound quality", "Long battery life", "Comfortable fit", "Great noise cancellation"],
    commonCons: ["Case could be smaller", "Price point", "Learning curve for controls"],
  }

  return (
    <div className="product-detail-page">
      <div className="product-container">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} className="breadcrumb-link">
            🏠 Home
          </span>
          <span className="breadcrumb-separator">›</span>
          <span onClick={() => navigate("/departments")} className="breadcrumb-link">
            Electronics
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-main">
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[activeImageIndex] || "/placeholder.svg"} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${activeImageIndex === index ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="stars">
                {renderStars(Math.floor(product.rating))}
                <span className="rating-number">({product.rating})</span>
              </div>
              <span className="review-count">{product.reviewCount} reviews</span>
            </div>

            <div className="product-pricing">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && <span className="original-price">${product.originalPrice}</span>}
              <span className="savings">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-options">
              {product.colors && (
                <div className="option-group">
                  <label>
                    Color: <strong>{selectedColor}</strong>
                  </label>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        className={`color-option ${selectedColor === color.name ? "selected" : ""}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div className="option-group">
                  <label>Size:</label>
                  <div className="size-options">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? "selected" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="quantity-group">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn">Add to Cart - ${(product.price * quantity).toFixed(2)}</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>

            <div className="shipping-info">
              {product.freeShipping && (
                <div className="shipping-item">
                  <span className="shipping-icon">🚚</span>
                  <span>Free shipping on orders over $35</span>
                </div>
              )}
              <div className="shipping-item">
                <span className="shipping-icon">📦</span>
                <span>Free pickup today</span>
              </div>
              <div className="shipping-item">
                <span className="shipping-icon">↩️</span>
                <span>Free 90-day returns</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-section">
          <div className="specifications">
            <h2>Specifications</h2>
            <div className="spec-table">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-label">{key}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h2>Customer Reviews</h2>
            <div className="reviews-summary">
              <div className="overall-rating">
                <span className="rating-large">{product.rating}</span>
                <div className="rating-details">
                  <div className="stars-large">{renderStars(Math.floor(product.rating))}</div>
                  <span>Based on {reviews.length} reviews</span>
                </div>
              </div>
              <button className="review-summary-btn" onClick={() => setShowReviewSummary(!showReviewSummary)}>
                📊 Review Summary
              </button>
            </div>
          </div>

          {showReviewSummary && (
            <div className="review-summary-box">
              <h3>📈 Review Analysis</h3>
              <div className="summary-content">
                <div className="rating-breakdown">
                  <h4>Rating Breakdown:</h4>
                  {Object.entries(reviewSummary.ratingBreakdown)
                    .reverse()
                    .map(([stars, count]) => (
                      <div key={stars} className="rating-bar">
                        <span>{stars} ⭐</span>
                        <div className="bar">
                          <div
                            className="bar-fill"
                            style={{ width: `${(count / reviewSummary.totalReviews) * 100}%` }}
                          ></div>
                        </div>
                        <span>{count}</span>
                      </div>
                    ))}
                </div>
                <div className="highlights">
                  <h4>Key Highlights:</h4>
                  <ul>
                    {reviewSummary.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="pros-cons">
                  <div className="pros">
                    <h4>Most Mentioned Pros:</h4>
                    <ul>
                      {reviewSummary.commonPros.map((pro, index) => (
                        <li key={index}>✅ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons">
                    <h4>Areas for Improvement:</h4>
                    <ul>
                      {reviewSummary.commonCons.map((con, index) => (
                        <li key={index}>⚠️ {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.author}</span>
                    {review.verified && <span className="verified-badge">Verified Purchase</span>}
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <h4 className="review-title">{review.title}</h4>
                <p className="review-content">{review.content}</p>
                <div className="review-actions">
                  <button className="helpful-btn">👍 Helpful</button>
                  <button className="report-btn">Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
