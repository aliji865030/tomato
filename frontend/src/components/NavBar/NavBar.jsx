import React, { useContext, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
const NavBar = ({ setShowLonIn }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmmount } = useContext(StoreContext);
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <img src="./searching.gif" alt="" />
        <div className="navbar-search-icon">
          {/* <img src={assets.basket_icon} alt="" /> */}
          <Link to="/cart">
            {" "}
            <img src="./grocery.gif" alt="" />{" "}
          </Link>
          <div className={getTotalCartAmmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLonIn(true)}>sign in</button>
      </div>
    </div>
  );
};

export default NavBar;
