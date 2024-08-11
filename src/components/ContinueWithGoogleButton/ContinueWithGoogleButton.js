import React from "react";
import google from "../../assets/images/google.svg";
import { signInWithGoogle } from "../../functions/signInWithGoogle";

const ContinueWithGoogleButton = () => {
  return (
    <button className="google-button" onClick={() => signInWithGoogle()}>
      <img src={google} alt="Google" /> Continue with Google
    </button>
  );
};

export default ContinueWithGoogleButton;
