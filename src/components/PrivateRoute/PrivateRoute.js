// Import the getAuth function from the firebase/auth module, which returns the Firebase Authentication instance.
import { getAuth } from "firebase/auth";

// Import the Navigate component and useLocation hook from the react-router-dom module.
// Navigate is used to redirect the user to a different route, and useLocation provides the current location object.
import { Navigate, useLocation } from "react-router-dom";

// Define a new React component named PrivateRoute, which takes a children prop.
const PrivateRoute = ({ children }) => {
  // Use the useLocation hook to get the current location object, which contains information about the current URL.
  const location = useLocation();

  // Use the getAuth function to get the Firebase Authentication instance.
  const auth = getAuth();

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
