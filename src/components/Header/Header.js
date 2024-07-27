import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../assets/images/logo-inverted.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        {/* Logo */}
        <img className="logo" src={logo} alt="ema-john Logo" />
        {/* Navbar */}
        <nav>
          <a href="/" className="active">
            Home
          </a>
          <a href="/cart">Cart</a>
          <a href="/manage-inventory">Manage Inventory</a>
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
