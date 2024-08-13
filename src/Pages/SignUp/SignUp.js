// Import the faArrowLeftLong icon from the @fortawesome/free-solid-svg-icons library
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

// Import the FontAwesomeIcon component from the @fortawesome/react-fontawesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import the React library and its useContext and useEffect hooks
import React, { useContext, useEffect } from "react";

// Import the Link component and useNavigate hook from the react-router-dom library
import { Link, useNavigate } from "react-router-dom";

// Import the logo image from the ../../assets/images/logo.png file
import logo from "../../assets/images/logo.png";

// Import the ContinueWithGoogleButton component from the ../../components/ContinueWithGoogleButton/ContinueWithGoogleButton file
import ContinueWithGoogleButton from "../../components/ContinueWithGoogleButton/ContinueWithGoogleButton";

// Import the AppDataContext from the ../../App file
import { AppDataContext } from "../../App";

// Define a functional component named SignUp
const SignUp = () => {
  // Use the useNavigate hook to get a reference to the navigate function
  const navigate = useNavigate();

  // Use the useContext hook to get the user object from the AppDataContext
  const { user } = useContext(AppDataContext);

  // Use the useEffect hook to set the document title to "Sign up | Ema John" when the component mounts
  useEffect(() => {
    // Set the document title to "Sign up | Ema John"
    document.title = "Sign up | Ema John";
  }, []);

  // Use the useEffect hook to navigate to the root URL when the user object changes
  useEffect(() => {
    // Check if the user object is truthy
    if (user) {
      // Navigate to the root URL
      navigate("/");
    }
  }, [user, navigate]);
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
