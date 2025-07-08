"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./ProductDetail.css"
import ReactMarkdown from 'react-markdown'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showReviewSummary, setShowReviewSummary] = useState(false)
  const [reviewSummary, setReviewSummary] = useState("")
  const [loadingSummary, setLoadingSummary]     = useState(false)

  // Sample product data - in real app this would come from API
  const products = {
    1: {
      id: 1,
      name: "Wireless Headphones",
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
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 299.99,
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
      name: "Coffee Maker",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.3,
      reviewCount: 892,
      description:
        "Start your day right with this premium coffee maker. Features programmable brewing, thermal carafe, and multiple brew strength options for the perfect cup every time.",
      features: [
        "Programmable 24-hour timer",
        "Thermal carafe keeps coffee hot",
        "Multiple brew strength settings",
        "Auto shut-off safety feature",
        "Easy-clean removable parts",
        "12-cup capacity",
      ],
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Stainless Steel", value: "#C0C0C0" },
      ],
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "BrewMaster",
        Model: "BM-1200",
        Capacity: "12 cups",
        Power: "1200W",
        Dimensions: '14" x 10" x 12"',
        Warranty: "1 year",
      },
    },
    4: {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.6,
      reviewCount: 2156,
      description:
        "Elevate your running experience with these high-performance athletic shoes. Featuring advanced cushioning, breathable mesh upper, and durable rubber outsole for maximum comfort and performance.",
      features: [
        "Advanced cushioning technology",
        "Breathable mesh upper",
        "Durable rubber outsole",
        "Lightweight design",
        "Arch support system",
        "Moisture-wicking lining",
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
        Sole: "Rubber",
        Weight: "10.5 oz",
        Drop: "10mm",
      },
    },
    5: {
      id: 5,
      name: "Laptop Stand",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.4,
      reviewCount: 743,
      description:
        "Improve your workspace ergonomics with this adjustable laptop stand. Made from premium aluminum with multiple height and angle adjustments for optimal viewing comfort.",
      features: [
        "Adjustable height and angle",
        "Premium aluminum construction",
        "Heat dissipation design",
        "Non-slip silicone pads",
        "Foldable and portable",
        "Compatible with 10-17 inch laptops",
      ],
      colors: [
        { name: "Silver", value: "#C0C0C0" },
        { name: "Space Gray", value: "#4A4A4A" },
      ],
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "ErgoTech",
        Model: "ET-LS100",
        Material: "Aluminum Alloy",
        "Max Load": "22 lbs",
        Compatibility: "10-17 inch laptops",
        Weight: "2.1 lbs",
      },
    },
    6: {
      id: 6,
      name: "Bluetooth Speaker",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.2,
      reviewCount: 1234,
      description:
        "Enjoy powerful, crystal-clear sound anywhere with this portable Bluetooth speaker. Features 360-degree sound, waterproof design, and 12-hour battery life.",
      features: [
        "360-degree surround sound",
        "IPX7 waterproof rating",
        "12-hour battery life",
        "Bluetooth 5.0 connectivity",
        "Built-in microphone for calls",
        "Compact and portable design",
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
        "Battery Life": "12 hours",
        "Water Rating": "IPX7",
        Connectivity: "Bluetooth 5.0",
        Dimensions: '7" x 3" x 3"',
      },
    },
    7: {
      id: 7,
      name: "Yoga Mat",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.5,
      reviewCount: 567,
      description:
        "Practice yoga in comfort with this premium non-slip yoga mat. Made from eco-friendly materials with excellent grip and cushioning for all your yoga sessions.",
      features: [
        "Non-slip textured surface",
        "Eco-friendly TPE material",
        "6mm thick for comfort",
        "Lightweight and portable",
        "Easy to clean",
        "Alignment lines for proper positioning",
      ],
      colors: [
        { name: "Purple", value: "#800080" },
        { name: "Blue", value: "#0071CE" },
        { name: "Pink", value: "#FFC0CB" },
        { name: "Green", value: "#008000" },
      ],
      images: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "ZenFit",
        Model: "ZF-YM6",
        Material: "TPE (Eco-friendly)",
        Thickness: "6mm",
        Dimensions: '72" x 24"',
        Weight: "2.2 lbs",
      },
    },
    8: {
      id: 8,
      name: "Phone Case",
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.1,
      reviewCount: 892,
      description:
        "Protect your phone in style with this premium protective case. Features military-grade drop protection, wireless charging compatibility, and precise cutouts.",
      features: [
        "Military-grade drop protection",
        "Wireless charging compatible",
        "Precise port cutouts",
        "Anti-scratch coating",
        "Slim profile design",
        "Easy installation",
      ],
      colors: [
        { name: "Clear", value: "transparent" },
        { name: "Black", value: "#000000" },
        { name: "Blue", value: "#0071CE" },
      ],
      sizes: ["iPhone 14", "iPhone 14 Pro", "iPhone 15", "iPhone 15 Pro"],
      images: [
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1601593346740-925612772716?w=500&h=500&fit=crop",
      ],
      inStock: true,
      freeShipping: true,
      specifications: {
        Brand: "GuardTech",
        Model: "GT-Shield",
        Material: "TPU + PC",
        "Drop Protection": "10 feet",
        Compatibility: "Wireless charging",
        Thickness: "2mm",
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

  const getProductReviews = (productId) => {
    // Product-specific review templates
    const reviewTemplates = {
      1: {
        // Wireless Headphones
        reviews: [
          {
            id: 1,
            author: "Sarah M.",
            rating: 5,
            date: "2024-01-15",
            title: "Amazing sound quality!",
            content:
              "These wireless headphones have incredible sound quality. The bass is deep and the highs are crystal clear. The noise cancellation works perfectly on my daily commute.",
            verified: true,
          },
          {
            id: 2,
            author: "Mike R.",
            rating: 4,
            date: "2024-01-10",
            title: "Great battery life",
            content:
              "The 30-hour battery life is no joke! I've been using these for a week straight without charging. Comfortable for long listening sessions.",
            verified: true,
          },
          {
            id: 3,
            author: "Jennifer L.",
            rating: 5,
            date: "2024-01-08",
            title: "Perfect for gaming",
            content:
              "These headphones are perfect for gaming. The sound positioning is excellent and the microphone quality is great for voice chat.",
            verified: false,
          },
          {
            id: 4,
            author: "David K.",
            rating: 5,
            date: "2024-01-05",
            title: "Excellent noise cancellation",
            content:
              "The active noise cancellation is incredible. I can focus on my music even in noisy environments. Worth every penny!",
            verified: true,
          },
          {
            id: 5,
            author: "Lisa P.",
            rating: 4,
            date: "2024-01-03",
            title: "Comfortable fit",
            content:
              "Very comfortable even after wearing for hours. The padding is soft and doesn't cause any discomfort. Great for long flights.",
            verified: true,
          },
        ],
      },
      2: {
        // Smart Watch
        reviews: [
          {
            id: 1,
            author: "Alex T.",
            rating: 5,
            date: "2024-01-15",
            title: "Perfect fitness companion",
            content:
              "This smartwatch tracks everything perfectly - heart rate, steps, sleep. The GPS is accurate and the battery lasts exactly 7 days as advertised.",
            verified: true,
          },
          {
            id: 2,
            author: "Emma S.",
            rating: 4,
            date: "2024-01-12",
            title: "Great health features",
            content:
              "Love the ECG and heart rate monitoring. The sleep tracking is very detailed. Only wish the screen was a bit brighter in sunlight.",
            verified: true,
          },
          {
            id: 3,
            author: "John D.",
            rating: 5,
            date: "2024-01-10",
            title: "Water resistance works great",
            content:
              "Took this swimming and it worked perfectly. The water resistance is legit. All the workout modes are useful too.",
            verified: false,
          },
          {
            id: 4,
            author: "Maria G.",
            rating: 4,
            date: "2024-01-08",
            title: "Stylish and functional",
            content:
              "Looks great on my wrist and has all the features I need. The notifications work seamlessly with my iPhone.",
            verified: true,
          },
          {
            id: 5,
            author: "Chris W.",
            rating: 5,
            date: "2024-01-05",
            title: "Best smartwatch I've owned",
            content:
              "Upgraded from an older model and this is so much better. The display is gorgeous and the health tracking is spot on.",
            verified: true,
          },
        ],
      },
      3: {
        // Coffee Maker
        reviews: [
          {
            id: 1,
            author: "Coffee_Lover_23",
            rating: 5,
            date: "2024-01-15",
            title: "Perfect morning coffee",
            content:
              "This coffee maker brews the perfect cup every time. The programmable timer means I wake up to fresh coffee. The thermal carafe keeps it hot for hours.",
            verified: true,
          },
          {
            id: 2,
            author: "Morning_Person",
            rating: 4,
            date: "2024-01-12",
            title: "Great value for money",
            content:
              "Makes excellent coffee and the 12-cup capacity is perfect for our family. Easy to clean and the auto shut-off gives peace of mind.",
            verified: true,
          },
          {
            id: 3,
            author: "Java_Jane",
            rating: 5,
            date: "2024-01-10",
            title: "Love the brew strength options",
            content:
              "Finally a coffee maker that lets me customize the strength! The strong setting makes coffee just how I like it. Highly recommend.",
            verified: false,
          },
          {
            id: 4,
            author: "Office_Manager",
            rating: 4,
            date: "2024-01-08",
            title: "Perfect for the office",
            content:
              "We use this in our office and it's been great. Makes enough coffee for everyone and the thermal carafe keeps it warm all morning.",
            verified: true,
          },
          {
            id: 5,
            author: "Busy_Mom",
            rating: 5,
            date: "2024-01-05",
            title: "Lifesaver for busy mornings",
            content:
              "The programmable feature is a lifesaver! I set it up the night before and wake up to fresh coffee. Makes mornings so much easier.",
            verified: true,
          },
        ],
      },
      4: {
        // Running Shoes
        reviews: [
          {
            id: 1,
            author: "Marathon_Runner",
            rating: 5,
            date: "2024-01-15",
            title: "Excellent for long runs",
            content:
              "These shoes are amazing for long distance running. The cushioning is perfect and they're incredibly lightweight. No blisters after 10+ mile runs.",
            verified: true,
          },
          {
            id: 2,
            author: "Weekend_Jogger",
            rating: 4,
            date: "2024-01-12",
            title: "Comfortable and breathable",
            content:
              "Very comfortable shoes with great arch support. The mesh upper keeps my feet cool during runs. Good value for the price.",
            verified: true,
          },
          {
            id: 3,
            author: "Track_Coach",
            rating: 5,
            date: "2024-01-10",
            title: "Great for athletes",
            content:
              "Recommended these to my track team and they love them. Excellent traction and the cushioning technology really works.",
            verified: false,
          },
          {
            id: 4,
            author: "Fitness_Enthusiast",
            rating: 4,
            date: "2024-01-08",
            title: "Perfect for gym workouts",
            content:
              "Use these for all my workouts - running, HIIT, weightlifting. They're versatile and comfortable. The moisture-wicking lining works great.",
            verified: true,
          },
          {
            id: 5,
            author: "New_Runner",
            rating: 5,
            date: "2024-01-05",
            title: "Great for beginners",
            content:
              "Just started running and these shoes are perfect. They provide great support and cushioning. My feet don't hurt after runs anymore.",
            verified: true,
          },
        ],
      },
      5: {
        // Laptop Stand
        reviews: [
          {
            id: 1,
            author: "Remote_Worker",
            rating: 5,
            date: "2024-01-15",
            title: "Perfect for home office",
            content:
              "This laptop stand has improved my posture so much! The adjustable height is perfect and the aluminum construction feels premium. Great for video calls.",
            verified: true,
          },
          {
            id: 2,
            author: "Student_Life",
            rating: 4,
            date: "2024-01-12",
            title: "Great for studying",
            content:
              "Makes studying so much more comfortable. The angle adjustment is smooth and it's very stable. Folds up nicely for transport.",
            verified: true,
          },
          {
            id: 3,
            author: "Designer_Pro",
            rating: 5,
            date: "2024-01-10",
            title: "Excellent build quality",
            content:
              "The aluminum construction is solid and the heat dissipation really works. My laptop runs cooler now. Worth the investment.",
            verified: false,
          },
          {
            id: 4,
            author: "Office_Worker",
            rating: 4,
            date: "2024-01-08",
            title: "Ergonomic improvement",
            content:
              "My neck pain is gone since using this stand. The adjustability is great and it fits my 15-inch laptop perfectly.",
            verified: true,
          },
          {
            id: 5,
            author: "Tech_Reviewer",
            rating: 5,
            date: "2024-01-05",
            title: "Best laptop accessory",
            content:
              "This is a must-have accessory for anyone who uses a laptop regularly. The build quality is excellent and it's very portable.",
            verified: true,
          },
        ],
      },
      6: {
        // Bluetooth Speaker
        reviews: [
          {
            id: 1,
            author: "Music_Lover",
            rating: 5,
            date: "2024-01-15",
            title: "Amazing 360-degree sound",
            content:
              "The sound quality is incredible for such a compact speaker. The 360-degree audio fills the entire room. Perfect for parties!",
            verified: true,
          },
          {
            id: 2,
            author: "Beach_Goer",
            rating: 4,
            date: "2024-01-12",
            title: "Truly waterproof",
            content:
              "Took this to the beach and it survived sand and water perfectly. The IPX7 rating is legit. Sound quality is great outdoors.",
            verified: true,
          },
          {
            id: 3,
            author: "Outdoor_Enthusiast",
            rating: 5,
            date: "2024-01-10",
            title: "Perfect for camping",
            content:
              "The 12-hour battery life is perfect for camping trips. Loud enough for outdoor use and the Bluetooth connection is very stable.",
            verified: false,
          },
          {
            id: 4,
            author: "Shower_Singer",
            rating: 4,
            date: "2024-01-08",
            title: "Great for bathroom use",
            content:
              "Love using this in the shower. The waterproofing works perfectly and the sound quality is surprisingly good for the size.",
            verified: true,
          },
          {
            id: 5,
            author: "Party_Host",
            rating: 5,
            date: "2024-01-05",
            title: "Party essential",
            content:
              "This speaker is loud enough for house parties and the sound quality is excellent. The built-in microphone works great for calls too.",
            verified: true,
          },
        ],
      },
      7: {
        // Yoga Mat
        reviews: [
          {
            id: 1,
            author: "Yoga_Instructor",
            rating: 5,
            date: "2024-01-15",
            title: "Perfect grip and cushioning",
            content:
              "This mat has excellent grip even during hot yoga sessions. The 6mm thickness provides perfect cushioning for my knees and joints.",
            verified: true,
          },
          {
            id: 2,
            author: "Beginner_Yogi",
            rating: 4,
            date: "2024-01-12",
            title: "Great for beginners",
            content:
              "The alignment lines are super helpful for proper positioning. The mat is comfortable and doesn't slip during poses.",
            verified: true,
          },
          {
            id: 3,
            author: "Eco_Conscious",
            rating: 5,
            date: "2024-01-10",
            title: "Love the eco-friendly material",
            content:
              "Happy to find a yoga mat made from eco-friendly TPE. It's comfortable, non-slip, and doesn't have any chemical smell.",
            verified: false,
          },
          {
            id: 4,
            author: "Home_Workout",
            rating: 4,
            date: "2024-01-08",
            title: "Perfect for home workouts",
            content:
              "Use this for yoga, pilates, and stretching. It's the perfect thickness and the non-slip surface works great on hardwood floors.",
            verified: true,
          },
          {
            id: 5,
            author: "Travel_Yogi",
            rating: 5,
            date: "2024-01-05",
            title: "Lightweight and portable",
            content:
              "This mat is surprisingly lightweight for its thickness. Easy to carry to classes and rolls up compactly. Great quality!",
            verified: true,
          },
        ],
      },
      8: {
        // Phone Case
        reviews: [
          {
            id: 1,
            author: "Clumsy_User",
            rating: 5,
            date: "2024-01-15",
            title: "Survived multiple drops",
            content:
              "I've dropped my phone so many times with this case and it's still perfect. The military-grade protection really works!",
            verified: true,
          },
          {
            id: 2,
            author: "Wireless_Charger",
            rating: 4,
            date: "2024-01-12",
            title: "Works great with wireless charging",
            content:
              "The case doesn't interfere with wireless charging at all. Slim profile but still provides excellent protection.",
            verified: true,
          },
          {
            id: 3,
            author: "Clear_Case_Fan",
            rating: 5,
            date: "2024-01-10",
            title: "Crystal clear and protective",
            content:
              "The clear version shows off my phone's color perfectly while providing great protection. No yellowing after months of use.",
            verified: false,
          },
          {
            id: 4,
            author: "Precise_Fit",
            rating: 4,
            date: "2024-01-08",
            title: "Perfect fit and cutouts",
            content:
              "All the cutouts are perfectly aligned. Easy access to all ports and buttons. The anti-scratch coating works well.",
            verified: true,
          },
          {
            id: 5,
            author: "Protection_First",
            rating: 5,
            date: "2024-01-05",
            title: "Best protection for the price",
            content:
              "Excellent protection without adding too much bulk. The installation was super easy and it feels very secure.",
            verified: true,
          },
        ],
      },
    }

    return reviewTemplates[productId]?.reviews || []
  }

  const reviews = getProductReviews(product.id)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }


const fetchReviewSummary = async () => {
  setLoadingSummary(true)
  try {
    // 1️⃣ Gather review texts into an array
    const reviewTexts = reviews.map((r) => r.content)

    // 2️⃣ POST them to your FastAPI endpoint
    const res = await fetch("http://localhost:5000/summarize_reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: reviewTexts }),  // matches ReviewsRequest
    })

    // 3️⃣ Parse the JSON response
    const data = await res.json()

    // 4️⃣ Store the summary in state
    setReviewSummary(data.summary || "No summary available.")
  } catch (err) {
    console.error("Error fetching summary:", err)
    setReviewSummary("Error fetching summary.")
  } finally {
    setLoadingSummary(false)
  }
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
              <button className="review-summary-btn" onClick={() => {setShowReviewSummary(!showReviewSummary), fetchReviewSummary()}}>
                📊 Review Summary
              </button>
            </div>
          </div>

          {showReviewSummary && (
  <div className="review-summary-box">
    {loadingSummary
      ? <p>Loading summary…</p>
      : (console.log(`Summary: ${reviewSummary}`),
      <ReactMarkdown>{reviewSummary}</ReactMarkdown>)
    }
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