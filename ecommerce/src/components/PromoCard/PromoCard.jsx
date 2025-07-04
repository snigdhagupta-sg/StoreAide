import "./PromoCard.css"

const PromoCard = ({ title, subtitle, image, backgroundColor, size, featured, textColor = "black" }) => {
  return (
    <div className={`promo-card ${size} ${featured ? "featured" : ""}`} style={{ backgroundColor }}>
      <div className="promo-content" style={{ color: textColor }}>
        <div className="promo-text">
          <h3 className="promo-title">{title}</h3>
          <p className="promo-subtitle">{subtitle}</p>
          <button className="shop-btn">Shop now</button>
        </div>
        <div className="promo-image">
          <img src={image || "/placeholder.svg"} alt={title} />
        </div>
      </div>
    </div>
  )
}

export default PromoCard
