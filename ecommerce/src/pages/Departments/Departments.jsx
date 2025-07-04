import "./Departments.css"

const Departments = () => {
  const departments = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      subcategories: ["Computers", "TVs", "Cell Phones", "Audio", "Gaming"],
    },
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      subcategories: ["Men's", "Women's", "Kids", "Shoes", "Accessories"],
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      subcategories: ["Furniture", "Decor", "Kitchen", "Garden", "Tools"],
    },
    {
      name: "Sports & Outdoors",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      subcategories: ["Exercise", "Outdoor Recreation", "Sports", "Hunting", "Fishing"],
    },
    {
      name: "Health & Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
      subcategories: ["Personal Care", "Health Care", "Beauty", "Vitamins", "Medicine"],
    },
    {
      name: "Automotive",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&fit=crop",
      subcategories: ["Car Electronics", "Tires", "Oil", "Car Care", "Tools"],
    },
  ]

  return (
    <div className="departments-page">
      <div className="page-header">
        <h1>Shop by Department</h1>
        <p>Find everything you need in our organized departments</p>
      </div>

      <div className="departments-grid">
        {departments.map((dept, index) => (
          <div key={index} className="department-card">
            <div className="department-image">
              <img src={dept.image || "/placeholder.svg"} alt={dept.name} />
            </div>
            <div className="department-content">
              <h3>{dept.name}</h3>
              <ul className="subcategories">
                {dept.subcategories.map((sub, subIndex) => (
                  <li key={subIndex}>{sub}</li>
                ))}
              </ul>
              <button className="shop-department-btn">Shop {dept.name}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Departments
