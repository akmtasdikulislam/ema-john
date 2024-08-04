import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Header from "../../components/Header/Header";
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage";

const NotFound = () => {
  document.title = "Oops! Page Not Found | Ema John";
  return (
    <main id="not-found">
      <Header />
      <NotFoundErrorMessage
        erroMessage={"Oops! Page Not Found"}
        remarks={"Please check your URL and try again"}
      >
        <FontAwesomeIcon className="icon" icon={faSadTear} />
      </NotFoundErrorMessage>
    </main>
  );
};

export default NotFound;
