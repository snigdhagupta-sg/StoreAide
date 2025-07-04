import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  const navItems = [
    { name: "Departments", path: "/departments", hasDropdown: true },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Trending", path: "/trending" },
    { name: "Pharmacy", path: "/pharmacy" },
    { name: "My Items", path: "/my-items" },
    { name: "Walmart+", path: "/walmart-plus" },
    { name: "More", path: "/more", hasDropdown: true },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.path} className="nav-link">
                {item.name}
                {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
