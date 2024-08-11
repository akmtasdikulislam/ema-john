import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ContinueWithGoogleButton from "../../components/ContinueWithGoogleButton/ContinueWithGoogleButton";

const SignUp = () => {
  document.title = "Sign up | Ema John";
  return (
    <main id="sign-up" className="row">
      <div className="col-6" id="photo-column">
        <img
          src="https://images.unsplash.com/photo-1577587230708-187fdbef4d91?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-6" id="form-column">
        <Link to="/" className="back">
          <FontAwesomeIcon icon={faArrowLeftLong} /> Back
        </Link>
        <div className="form-container">
          <Link to="/">
            <img src={logo} alt="Ema John" className="logo" />
          </Link>

          <h3>Sign up</h3>
          <p>Experience Shopping Like Never Before!</p>
          <form>
            <fieldset>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
              />
              <label htmlFor="name">Fullname</label>
            </fieldset>
            <fieldset>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your e-mail address"
              />
              <label htmlFor="email">E-mail Address</label>
            </fieldset>
            <fieldset>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
              />
              <label htmlFor="password">Password</label>
            </fieldset>
          </form>
          <button>Sign up</button>
          <p className="or-text">Or</p>
          <ContinueWithGoogleButton />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
