/* eslint-disable no-unused-vars */
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase.app.config";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Define a function that signs in the user with Google
export const signInWithGoogle = () => {
  console.log("Signing in with Google"); // Log a message to the console indicating that the user is signing in

  // Call the signInWithPopup function with the auth and provider objects
  // This function will open a popup window to allow the user to sign in with Google
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Sign in successful"); // Log a message to the console indicating that the sign in was successful
    })
    .catch((error) => {
      const errorCode = error.code; // Get the error code from the error object
      const errorMessage = error.message; // Get the error message from the error object
      console.log({ errorCode, errorMessage }); // Log the error code and message to the console
      alert(`Error: ${errorMessage}`); // Show an alert with the error message to the user
    });
};
