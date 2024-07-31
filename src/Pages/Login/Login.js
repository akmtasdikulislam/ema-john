import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import google from "../../assets/images/google.svg";
import logo from "../../assets/images/logo.png";

const Login = () => {
  document.title = "Login | Ema John";
  return (
    <main id="login" className="row">
      <div className="col-6" id="login-photo-column">
        <img
          id="login-photo"
          src="https://images.unsplash.com/photo-1508957454729-17eb89cd4b67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="col-6" id="login-form-column">
        <div className="login-form-container">
          <Link to="/">
            <img src={logo} alt="Ema John" className="logo" />
          </Link>

          <h3>Login</h3>
          <p>Welcome back! We're so happy to have you back</p>
          <form className="login-form">
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
          <button className="login-button">Login</button>
          <p>Or</p>
          <button className="login-with-google-button">
            <img src={google} alt="Google" /> Log in with Google
          </button>
          <p>
            Don't have an account? <a href="/sign-up">Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
