// Import the Link, useLocation, and useNavigate hooks from the react-router-dom library.
// These hooks are used to create links between routes, access the current location, and navigate to new routes.
import { Link, useLocation, useNavigate } from "react-router-dom";

// Import the logo image from the assets/images directory.
import logo from "../../assets/images/logo.png";

// Import the ContinueWithGoogleButton component from the ContinueWithGoogleButton directory.
// This component is used to render the "Continue with Google" button.
import ContinueWithGoogleButton from "../../components/ContinueWithGoogleButton/ContinueWithGoogleButton";

// Import the AppDataContext from the App.js file.
// This context is used to share user and cart data between components.
import { AppDataContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";

// Define the Login component, which is a functional component.
const Login = () => {
  // Use the useLocation hook to access the current location.
  // This hook returns an object with information about the current location, including the URL and any state that was passed to the location.
  const { state } = useLocation();

  // Use the useNavigate hook to access the navigate function.
  // This hook returns a function that can be used to navigate to new routes.
  const navigate = useNavigate();

  // Use the useContext hook to access the AppDataContext.
  // This hook allows us to access the user and cart data from the context.
  const { user } = useContext(AppDataContext);

  // Use the useEffect hook to set the document title to "Login | Ema John".
  // This hook is used to run side effects, such as setting the document title, after the component has rendered.
  useEffect(() => {
    document.title = "Login | Ema John";
  }, []);

  // Use the useEffect hook to navigate to the home route if the user is already authenticated.
  // This hook is used to run side effects, such as navigating to a new route, after the component has rendered.
  useEffect(() => {
    if (user) {
      navigate(state?.from || "/");
    }
  }, [user, navigate]);
  // Return the JSX that makes up the Login component.
  // ...
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
