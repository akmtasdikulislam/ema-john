/**
 * PrivateRoute component
 *
 * This component is used to protect routes that require authentication.
 * It checks if the user is authenticated and renders the child components if true.
 * If the user is not authenticated, it redirects them to the login page.
 *
 * Props:
 * - children: React.ReactNode
 *   The child components to be rendered if the user is authenticated.
 *
 * Usage:
 * <PrivateRoute>
 *   <ProtectedComponent />
 * </PrivateRoute>
 */

// ** React related imports **
import { useContext } from "react"; // Used to access the AppDataContext for authLoading state

// ** React Router related imports **
import { Navigate, useLocation } from "react-router-dom"; // Navigate for redirecting unauthenticated users, useLocation for getting current URL

// ** Firebase related imports **
import { getAuth } from "firebase/auth"; // Used to get the Firebase Authentication instance for checking user authentication status

// ** Context related imports **
import { AppDataContext } from "../../App"; // Provides access to global app data, specifically authLoading state

// ** Component imports **
import Loader from "../Loader/Loader"; // Renders a loading spinner while checking authentication state

// Define a new React component named PrivateRoute, which takes a children prop.
const PrivateRoute = ({ children }) => {
  // Use the useLocation hook to get the current location object, which contains information about the current URL.
  const location = useLocation();

  // Use the getAuth function to get the Firebase Authentication instance.
  const auth = getAuth();
  // Get the authLoading state from the AppDataContext
  const { authLoading } = useContext(AppDataContext);

  // If authentication is still loading, show a loading indicator
  if (authLoading) {
    return (
      <div className="loader-container">
        <Loader /> {/* Show a loading spinner while checking auth state */}
      </div>
    );
  }

  // Once authentication check is complete, render appropriate content
  // Return a JSX fragment that contains the conditional logic for the private route.
  return (
    <>
      {
        // Check if the user is currently authenticated by checking the auth.currentUser property.
        auth.currentUser ? (
          // If the user is authenticated, render the children prop, which is the content that should be displayed when the user is authenticated.
          children
        ) : (
          // If the user is not authenticated, redirect them to the /login route using the Navigate component.
          // Pass the current location pathname as a state object to the /login route, so that the user can be redirected back to the original route after logging in.
          <Navigate to="/login" state={{ from: location.pathname }} replace />
        )
      }
    </>
  );
};

// Export the PrivateRoute component as the default export of this module.
export default PrivateRoute;
