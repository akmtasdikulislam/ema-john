/** React router related imports **/
import { useContext, useEffect, useState } from "react"; // Hooks for managing state, side effects, and context
import { Link, useLocation, useNavigate } from "react-router-dom"; // For creating links, accessing current location, and navigating between routes

/** Context imports **/
import { AppDataContext } from "../../App"; // For accessing shared user and cart data

/** UI Component imports **/
import ContinueWithGoogleButton from "../../components/ContinueWithGoogleButton/ContinueWithGoogleButton"; // Renders the "Continue with Google" button
import Loader from "../../components/Loader/Loader"; // Displays a loading spinner

/** Icon imports **/
import {
  faArrowLeftLong,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons"; // Specific icons used in the component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // For using Font Awesome icons

/** Firebase related imports **/
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Firebase authentication functions

/** Asset imports **/
import loginBG from "../../assets/images/login-bg.jpg"; // Background image for the login page
import logo from "../../assets/images/logo.png"; // Logo image for the login page

/** Utility function imports **/
import { showToast } from "../../functions/showToast"; // Function to display toast notifications
import { handleInputChange, validateForm } from "../../functions/validateForm"; // Functions for form input handling and validation

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
  const { user, toasts, setToasts } = useContext(AppDataContext);

  // Initialize a state variable to track whether the form has been submitted.
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize a state variable to track whether the user wants to remember their login credentials.
  const [rememberMe, setRememberMe] = useState(false);

  // Use the useEffect hook to set the document title to "Login | Ema John".
  // This hook is used to run side effects, such as setting the document title, after the component has rendered.
  useEffect(() => {
    document.title = "Login | Ema John";
  }, []);

  // Use the useEffect hook to navigate to the home route if the user is already authenticated.
  // This hook is used to run side effects, such as navigating to a new route, after the component has rendered.
  useEffect(() => {
    // Check if the user is already authenticated.
    if (user) {
      // Navigate to the previous route (if available) or the root route by default
      navigate(state?.from || "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  // Get the authentication object.
  const auth = getAuth();

  // Define a function to handle resending the verification email.
  const handleResendVerificationEmail = () => {
    // Tasks performed by handleResendVerificationEmail:
    // • Get the current user.
    // • Send the verification email.
    // • Show a toast notification with a success message if the email is sent successfully.
    // • Show a toast notification with an error message if there is an error sending the email.

    // Get the authentication object.
    const user = auth.currentUser;
    // Send the verification email.
    sendEmailVerification(user)
      .then(() => {
        // Show a toast notification with a success message.
        showToast(
          toasts,
          setToasts,
          "success",
          "Verification email resent!",
          "Please check your inbox for the verification email."
        );
      })
      .catch((error) => {
        // Show a toast notification with an error message.
        showToast(toasts, setToasts, "error", error.name, error.message);
      });
  };
  // Define a function to handle the login form submission.
  const handleLogin = () => {
    // Tasks performed by handleLogin:
    // • Check if the form is valid.
    // • Set the isSubmitted state to true.
    // • Get the email and password from the form.
    // • Get the authentication object.
    // • Set the persistence of the authentication session.
    // • Sign in with the email and password.
    // • Check if the user's email is verified.
    // • Show a toast notification

    // Check if the form is valid.
    if (validateForm()) {
      // Set the isSubmitted state to true.
      setIsSubmitted(true);

      // Get the email and password from the form.
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      // Set the persistence of the authentication session based on the 'rememberMe' state
      setPersistence(
        auth,
        // Use local persistence if 'rememberMe' is true, otherwise use session persistence
        rememberMe
          ? browserLocalPersistence // Stores auth state locally, allowing user to remain logged in after closing browser
          : browserSessionPersistence // Stores auth state only for current browser session, requiring login after closing browser
      )
        .then(() => {
          // Sign in with the email and password.
          return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
              // Check if the user's email is verified.
              if (!result.user.emailVerified) {
                // Show a toast notification with a warning message.
                showToast(
                  toasts,
                  setToasts,
                  "warning",
                  "Action Required !",
                  "Your email is not yet verified. Please verify your email address.",
                  7000,
                  <p>
                    <span
                      className="resend-button"
                      onClick={() => handleResendVerificationEmail()}
                    >
                      Click Here
                    </span>{" "}
                    to resend the verification email.
                  </p>
                );
              } else {
                // Show a toast notification with a success message.
                showToast(
                  toasts,
                  setToasts,
                  "success",
                  "Login Successful",
                  "",
                  2000
                );
              }

              setIsSubmitted(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // Show a toast notification with an error message.
              showToast(toasts, setToasts, "error", errorCode, errorMessage);
              // Set the isSubmitted state to false.
              setIsSubmitted(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Show a toast notification with an error message.
          showToast(toasts, setToasts, "error", errorCode, errorMessage);
          // Set the isSubmitted state to false.
          setIsSubmitted(false);
        });
    }
  };
  // Return the JSX that makes up the Login component.
  return (
    <main id="login" className="row">
      <div className="col-6" id="photo-column">
        <img src={loginBG} alt="" />
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
                onChange={(e) => handleInputChange(e)}
              />
              <label htmlFor="email">E-mail Address</label>
            </fieldset>
            <p id="email-error-message">&bull; Invalid E-mail Address</p>
            <fieldset>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => handleInputChange(e)}
              />
              <label htmlFor="password">Password</label>
            </fieldset>
            <div className="additional-form-items">
              <fieldset>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  onChange={(e) => setRememberMe(!rememberMe)}
                />
                <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                <label htmlFor="remember-me">Remember Me</label>
              </fieldset>
              <a href="/forgot-password">Forgot Password ?</a>
            </div>
          </form>
          {/* Error Message */}
          <div className="message" id="error-message">
            <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
            <p>Please fill in all required fields before submitting.</p>
          </div>
          {isSubmitted ? (
            <button className="submitting">
              <Loader /> Logging in
            </button>
          ) : (
            <button onClick={() => handleLogin()}>Login</button>
          )}
          <p className="or-text">Or</p>
          <ContinueWithGoogleButton />
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" state={{ from: state?.from }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
