// ** React related imports **
import React, { useContext } from "react"; // Import React and useContext hook for creating functional components and accessing context
import { AppDataContext } from "../../App"; // Import AppDataContext to access user data and update functions

// ** Firebase related imports **
import { getAuth, signOut } from "firebase/auth"; // Import Firebase authentication functions for user sign-out

// ** Font Awesome related imports **
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // Import specific icon for logout button
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component for rendering icons

// Define a new React component named UserNav.
const UserNav = () => {
  // Use the useContext hook to get the current user object and the setUser function from the UserContext.
  // This will allow us to access the current user's data and update it if needed.
  const { user, setUser } = useContext(AppDataContext);

  // Destructure the displayName and photoURL properties from the user object.
  // This will give us easy access to the user's display name and photo URL.
  const { displayName, photoURL } = user;

  // Use the getAuth function to get the Firebase Authentication instance.
  // This will allow us to interact with the Firebase Authentication system.
  const auth = getAuth();

  // Define a new function named handleSignOut, which signs out the current user when called.
  // This function will be called when the user clicks the sign out button.
  const handleSignOut = () => {
    /*
     Description: This function handles the user sign-out process using Firebase Authentication.
     It signs out the current user, updates the app state, and handles any potential errors.
     
     Task list:
     • Call Firebase signOut function
     • Update app state on successful sign-out
     • Handle and log any errors during sign-out
     • Display error message to user if sign-out fails
     */

    // Initiate the sign-out process using Firebase Authentication
    signOut(auth)
      .then(() => {
        // Log a success message to the console for debugging purposes
        console.log("Sign out successful");

        // Update the app state to reflect that the user is no longer signed in
        setUser(null);
      })
      .catch((error) => {
        // Log any errors that occur during the sign-out process to the console
        console.error("Error signing out:", error);

        // Display an alert to the user informing them of the sign-out error
        alert("Error signing out. Please try again.");
      });
  };
  // Render the UserNav component
  return (
    <div className="row user-nav" id="user-nav">
      <div className="col-4 user-photo">
        <img src={photoURL} alt={displayName} />
      </div>
      <div className="col-8">
        <p className="name">
          Hello, <span className="text-bold">{displayName}</span>
        </p>
        {/* Button element for logging out the user */}
        <button id="log-out" onClick={() => handleSignOut()}>
          {/* FontAwesome icon component representing a logout action */}
          <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket} />
          {/* Text label for the logout button */}
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserNav;
