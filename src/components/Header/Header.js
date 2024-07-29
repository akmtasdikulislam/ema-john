import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-inverted.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        {/* Logo */}
        <img className="logo" src={logo} alt="ema-john Logo" />
        {/* Navbar */}
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/manage-inventory">Manage Inventory</NavLink>
        </nav>

        {/* Sign in button and sign in status */}
        <button id="sign-in">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Sign in
        </button>
      </div>
    </header>
  );
};

export default Header;
