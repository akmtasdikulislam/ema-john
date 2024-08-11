import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import dispayPhoto from "../../assets/images/demo-dp.png";
import { getAuth, signOut } from "firebase/auth";
const UserNav = () => {
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out successful");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="row user-nav">
      <div className="col-4 user-photo">
        <img src={dispayPhoto} alt="Display" />
      </div>
      <div className="col-8">
        <p className="name">
          Hello, <span className="text-bold">{"Akm Tasdikul Islam"}</span>
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
