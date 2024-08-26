/* eslint-disable no-unused-vars */
// ** Firebase Authentication Imports **
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Importing necessary Firebase authentication functions:
// - getAuth: To get the Firebase Auth instance
// - GoogleAuthProvider: To create a Google sign-in provider
// - signInWithPopup: To handle the pop-up based Google sign-in process

// ** Firebase Configuration Import **
import app from "../firebase.app.config";
// Importing the Firebase app instance with configuration
// This is used to initialize Firebase in the application

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app); // Create an instance of Firebase Authentication using the Firebase app configuration
const provider = new GoogleAuthProvider(); // Create a new Google authentication provider instance for sign-in

// Define a function that signs in the user with Google
export const signInWithGoogle = () => {
  /*
   * Description: This function handles the Google sign-in process using Firebase Authentication.
   * It opens a popup window for the user to sign in with their Google account.
   *
   * Task list:
   * - Log the initiation of the sign-in process
   * - Attempt to sign in with Google using Firebase
   * - Handle successful sign-in
   * - Handle and display any errors that occur during sign-in
   */

  // Log a message to indicate the start of the Google sign-in process
  console.log("Signing in with Google");

  // Initiate the Google sign-in process using Firebase Authentication
  signInWithPopup(auth, provider)
    .then((result) => {
      // Log a success message if the sign-in is successful
      console.log("Sign in successful");
    })
    .catch((error) => {
      // Extract the error code and message from the error object
      const errorCode = error.code;
      const errorMessage = error.message;

      // Log the error details to the console for debugging purposes
      console.log({ errorCode, errorMessage });

      // Display an alert to the user with the error message
      alert(`Error: ${errorMessage}`);
    });
};
