import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-inverted.png";
import UserNav from "../UserNav/UserNav";

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
        {/* <Link className="link" to={"/login"}>
          <button id="sign-in">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Sign in
          </button>
        </Link> */}
        <UserNav />
      </div>
    </header>
  );
};

export default Header;
