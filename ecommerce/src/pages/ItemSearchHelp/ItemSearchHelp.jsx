import "./ItemSearchHelp.css"

const ItemSearchHelp = () => {
  const searchTips = [
    {
      title: "Use specific keywords",
      description: "Try searching for specific product names, brands, or model numbers for better results.",
      icon: "🔍",
    },
    {
      title: "Check spelling",
      description: "Make sure your search terms are spelled correctly. Try different variations if needed.",
      icon: "✏️",
    },
    {
      title: "Use filters",
      description: "Narrow down your search using our category, price, and brand filters.",
      icon: "🎯",
    },
    {
      title: "Browse categories",
      description: "If you're not sure what to search for, browse our organized product categories.",
      icon: "📂",
    },
  ]

  const popularSearches = [
    "iPhone",
    "Samsung TV",
    "Nike shoes",
    "Coffee maker",
    "Laptop",
    "Headphones",
    "Vitamins",
    "Toys",
    "Home decor",
    "Kitchen appliances",
  ]

  return (
    <div className="item-search-help-page">
      <div className="help-container">
        <div className="help-header">
          <h1>Item Search Help</h1>
          <p>Tips and tricks to help you find exactly what you're looking for</p>
        </div>

        <div className="search-tips">
          <h2>Search Tips</h2>
          <div className="tips-grid">
            {searchTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="popular-searches">
          <h2>Popular Searches</h2>
          <div className="search-tags">
            {popularSearches.map((search, index) => (
              <span key={index} className="search-tag">
                {search}
              </span>
            ))}
          </div>
        </div>

        <div className="contact-help">
          <h2>Still Need Help?</h2>
          <p>Our customer service team is here to assist you with finding the right products.</p>
          <div className="help-buttons">
            <button className="help-btn primary">Chat with Us</button>
            <button className="help-btn secondary">Call Support</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemSearchHelp
