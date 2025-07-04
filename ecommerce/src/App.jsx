"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import MainContent from "./components/MainContent/MainContent"
import Departments from "./pages/Departments/Departments"
import Services from "./pages/Services/Services"
import Chatbot from "./pages/Chatbot/Chatbot"
import Feedback from "./pages/Feedback/Feedback"
import Cart from "./pages/Cart/Cart"
import "./App.css"
import ItemSearchHelp from "./pages/ItemSearchHelp/ItemSearchHelp"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import MyItems from "./pages/MyItems/MyItems"
import WalmartPlus from "./pages/WalmartPlus/WalmartPlus"
import More from "./pages/More/More"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Router>
      <div className="App">
        <Header toggleSidebar={toggleSidebar} />
        <Navbar />
        <div className="app-container">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/services" element={<Services />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item-search-help" element={<ItemSearchHelp />} />
           
            <Route path="/my-items" element={<MyItems />} />
            <Route path="/walmart-plus" element={<WalmartPlus />} />
            <Route path="/more" element={<More />} />
            <Route path="/new-arrivals" element={<div className="page-placeholder">New Arrivals - Coming Soon!</div>} />
            <Route path="/trending" element={<div className="page-placeholder">Trending - Coming Soon!</div>} />
            <Route path="/pharmacy" element={<div className="page-placeholder">Pharmacy - Coming Soon!</div>} />
            <Route path="/gift-cards" element={<div className="page-placeholder">Gift Cards - Coming Soon!</div>} />
            <Route
              path="/store-locator"
              element={<div className="page-placeholder">Store Locator - Coming Soon!</div>}
            />
            <Route
              path="/accessibility"
              element={<div className="page-placeholder">Accessibility - Coming Soon!</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
