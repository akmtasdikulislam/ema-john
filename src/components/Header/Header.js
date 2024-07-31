import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink to="/order/review">Order Review</NavLink>
          <NavLink to="/inventory">Manage Inventory</NavLink>
        </nav>

        {/* Sign in button and sign in status */}
        <Link className="link" to={"/login"}>
          <button id="sign-in">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Sign in
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
