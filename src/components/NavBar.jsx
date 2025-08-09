import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";
import "../css/NavBar.css";

function NavBar() {
  const location = useLocation();
  const current = location.pathname;

  const navItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/search", icon: <FaSearch />, label: "Search" },
    { path: "/likes", icon: <FaHeart />, label: "Likes" },
    { path: "/contact", icon: <FaUser />, label: "Contact" },
  ];

  return (
    <div className="bottom-nav">
      <div className='logo'>
        <h1>Globle Moviez</h1>
      </div>
      <div className="nav-items">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`nav-item ${current === item.path ? "active" : ""}`}
          >
            <div className="icon">{item.icon}</div>
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
