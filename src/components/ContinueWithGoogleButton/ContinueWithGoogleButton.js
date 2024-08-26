import React from "react"; // Import React library to use JSX and create React components
import google from "../../assets/images/google.svg"; // Import the Google logo SVG file to use as an icon in the button
import { signInWithGoogle } from "../../functions/signInWithGoogle"; // Import the signInWithGoogle function to handle Google authentication

const ContinueWithGoogleButton = () => {
  return (
    <button className="google-button" onClick={() => signInWithGoogle()}>
      <img src={google} alt="Google" /> Continue with Google
    </button>
  );
};

export default ContinueWithGoogleButton;
