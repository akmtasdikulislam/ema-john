/** React and React Router related imports **/
import React, { useContext, useEffect, useState } from "react"; // Import React and hooks for state management and side effects
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import routing components for navigation

/** Context related imports **/
import { AppDataContext } from "../../App"; // Import context for global app data

/** Firebase related imports **/
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth"; // Import Firebase authentication functions

/** UI Component imports **/
import {
  faArrowLeftLong,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icon for back navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome component for icons
import ContinueWithGoogleButton from "../../components/ContinueWithGoogleButton/ContinueWithGoogleButton"; // Import Google sign-in button component
import Loader from "../../components/Loader/Loader"; // Import loading indicator component

/** Asset imports **/
import logoAlt from "../../assets/images/logo-inverted.png"; // Import logo image for branding
import logo from "../../assets/images/logo.png"; // Import logo image for branding
import signupBG from "../../assets/images/signup-bg.jpg"; // Import background image for signup page

/** Utility imports **/
import { showToast } from "../../functions/showToast"; // Import toast notification function
import { validateForm } from "../../functions/validateForm";

// Define a functional component named SignUp
const SignUp = () => {
  //====================//
  //  STATE AND EFFECTS //
  //====================//

  // Create a new user object.
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    photoURL:
      "https://res.cloudinary.com/disqpzshx/image/upload/v1723570944/xndmubs4xbbwthbmidyc.png", // Default photo URL
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use the useNavigate hook to get a reference to the navigate function
  const navigate = useNavigate();

  // Use the useLocation hook to access the current location.
  // This hook returns an object with information about the current location, including the URL and any state that was passed to the location.
  const { state } = useLocation();

  // Use the useContext hook to get the user object from the AppDataContext
  const { user, toasts, setToasts } = useContext(AppDataContext);

  // Use the useEffect hook to set the document title to "Sign up | Ema John" when the component mounts
  useEffect(() => {
    // Set the document title to "Sign up | Ema John"
    document.title = "Sign up | Ema John";
  }, []);

  // Use the useEffect hook to navigate to the home route if the user is already authenticated.
  // This hook is used to run side effects, such as navigating to a new route, after the component has rendered.
  useEffect(() => {
    // Check if the user object is truthy
    if (user) {
      // Navigate to the previous route (if available) or the root route by default
      navigate(state?.from || "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  //====================//
  //  HELPER FUNCTIONS   //
  //====================//

  // Get the authentication object.
  const auth = getAuth();

  // Define a function to handle the sign up form submission.
  const handleSignUp = () => {
    // Tasks performed by handleSignUp:
    // • Set the isSubmitted state to true.
    // • Create a new user object.
    // • Show a toast notification with a success message.
    // • Create a new user with the email and password.
    // • Update the user profile with the display name and photo URL.
    // • Send the verification email.
    // • Show a toast notification with a success message.

    // Set the isSubmitted state to true.
    if (validateForm()) {
      setIsSubmitted(true);
      // Create a new user with the email and password.
      createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // Update user profile with displayName and photoURL
          return updateProfile(user, {
            displayName: newUser.name,
            photoURL: newUser.photoURL,
          }).then(() => {
            // Send email verification
            return sendEmailVerification(user).then(() => {
              // Show a toast notification with a success message.
              showToast(
                toasts,
                setToasts,
                "success",
                "Welcome & Verify Your Email!",
                "Your account has been created, and a verification email has been sent. Please check your inbox to verify your email address.",
                7000
              );
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Show a toast notification with an error message.
          showToast(toasts, setToasts, "error", errorCode, errorMessage);
          setIsSubmitted(false);
        });
    }
  };

  return (
    <main id="sign-up" className="row">
      <div className="col-6" id="photo-column">
        <img src={signupBG} alt="" />
      </div>
      <div className="col-6" id="form-column">
        <Link to="/" className="back">
          <FontAwesomeIcon icon={faArrowLeftLong} /> Back
        </Link>
        <div className="form-container">
          <Link to="/">
            <img
              src={logo}
              alt="Login background"
              className="logo logo-normal"
            />
            <img
              src={logoAlt}
              alt="Login background"
              className="logo logo-inverted"
            />
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
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <label htmlFor="name">Full Name</label>
            </fieldset>
            <fieldset>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your e-mail address"
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <label htmlFor="email">E-mail Address</label>
            </fieldset>
            <fieldset>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <label htmlFor="password">Password</label>
            </fieldset>
          </form>
          <div className="message" id="error-message">
            <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
            <p>Please fill in all required fields before submitting.</p>
          </div>
          {
            // Check if isSubmitted is true
            isSubmitted ? (
              // If isSubmitted is true, render the following JSX
              <button className="disabled-button">
                {/* Render a Loader component */}
                <Loader />
                {/* Render the text "Signing up" */}
                Signing up
              </button>
            ) : (
              // If isSubmitted is false, render the following JSX
              <button onClick={() => handleSignUp()}>
                {/* Render a button with an onClick event handler that calls the handleSignUp function */}
                Sign up
              </button>
            )
          }
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
