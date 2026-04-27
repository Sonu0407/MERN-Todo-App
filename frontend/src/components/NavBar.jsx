import { act, useState } from "react";
import "../styles/NavBar.css";
import { TurkishLira } from "lucide-react";

const NavBar = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <a className="navbar-logo" href="#">
          ToDo
        </a>
        <button
          className={`navbar-toggle ${active ? "active" : ""}`}
          onClick={() => setActive(!active)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`navbar-menu ${active ? "active" : ""}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
