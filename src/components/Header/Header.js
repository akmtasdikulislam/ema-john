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
        <button id="sign-in">Sign in</button>
      </div>
    </header>
  );
};

export default Header;
