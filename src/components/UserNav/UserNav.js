// Import the faArrowRightFromBracket icon from the @fortawesome/free-solid-svg-icons module.
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Import the FontAwesomeIcon component from the @fortawesome/react-fontawesome module.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import the React library and the useContext hook from the react module.
import React, { useContext } from "react";

// Import the getAuth and signOut functions from the firebase/auth module.
// getAuth returns the Firebase Authentication instance, and signOut signs out the current user.
import { getAuth, signOut } from "firebase/auth";

// Import the AppDataContext from the ../../App module.
// AppDataContext is a React context that provides the current user object and a function to update the user.
import { AppDataContext } from "../../App";

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
    // Call the signOut function from the Firebase Authentication instance to sign out the current user.
    // This will remove the user's authentication credentials and sign them out of the app.
    signOut(auth)
      .then(() => {
        // If the sign out is successful, log a message to the console and set the user to null using the setUser function.
        // This will update the app's state to reflect that the user is no longer signed in.
        console.log("Sign out successful");
        setUser(null);
      })
      .catch((error) => {
        // If an error occurs during sign out, log the error to the console.
        // This will help us diagnose any issues that may occur during the sign out process.
        console.error("Error signing out:", error);
        alert("Error signing out. Please try again.");
      });
  };
  return (
    <div className="row user-nav">
      <div className="col-4 user-photo">
        <img src={photoURL} alt={displayName} />
      </div>
      <div className="col-8">
        <p className="name">
          Hello, <span className="text-bold">{displayName}</span>
        </p>
        <button id="log-out" onClick={() => handleSignOut()}>
          <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserNav;
