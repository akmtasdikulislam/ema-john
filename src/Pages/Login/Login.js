import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ContinueWithGoogleButton from "../../components/ContinueWithGoogleButton/ContinueWithGoogleButton";

const Login = () => {
  document.title = "Login | Ema John";
  return (
    <main id="login" className="row">
      <div className="col-6" id="photo-column">
        <img
          src="https://images.unsplash.com/photo-1508957454729-17eb89cd4b67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

          <h3>Login</h3>
          <p>Welcome back! We're so happy to have you back</p>
          <form>
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
            <div className="additional-form-items">
              <fieldset>
                <input type="checkbox" name="remember-me" id="remember-me" />
                <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                <label htmlFor="remember-me">Remember Me</label>
              </fieldset>
              <a href="/forgot-password">Forgot Password ?</a>
            </div>
          </form>
          <button>Login</button>
          <p className="or-text">Or</p>
          <ContinueWithGoogleButton />
          <p>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
