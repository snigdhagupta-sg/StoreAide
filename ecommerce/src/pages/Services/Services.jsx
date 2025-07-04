import "./Services.css"

const Services = () => {
  const services = [
    {
      name: "Pharmacy",
      icon: "💊",
      description: "Prescription refills, vaccinations, and health services",
      features: ["Free prescription delivery", "90-day supplies", "Immunizations", "Health screenings"],
    },
    {
      name: "Auto Care Center",
      icon: "🚗",
      description: "Complete automotive services and maintenance",
      features: ["Oil changes", "Tire installation", "Battery service", "State inspections"],
    },
    {
      name: "Vision Center",
      icon: "👓",
      description: "Eye exams, glasses, and contact lenses",
      features: ["Eye exams", "Designer frames", "Contact lenses", "Sunglasses"],
    },
    {
      name: "Photo Services",
      icon: "📸",
      description: "Print photos, create photo books, and custom gifts",
      features: ["Same-day prints", "Photo books", "Canvas prints", "Custom gifts"],
    },
    {
      name: "Money Services",
      icon: "💰",
      description: "Check cashing, money transfers, and bill pay",
      features: ["Check cashing", "Money transfers", "Bill payments", "Prepaid cards"],
    },
    {
      name: "Grocery Pickup",
      icon: "🛒",
      description: "Order online and pickup curbside",
      features: ["Free pickup", "Same-day service", "Fresh guarantee", "Easy returns"],
    },
  ]

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Walmart Services</h1>
        <p>Convenient services to make your life easier</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <button className="service-btn">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
