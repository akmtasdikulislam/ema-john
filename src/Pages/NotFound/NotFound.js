// ** React related imports **
import React from "react"; // Core React library for building UI components

// ** Font Awesome related imports **
import { faSadTear } from "@fortawesome/free-solid-svg-icons"; // Sad tear icon for displaying on the not found page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Component to render Font Awesome icons

// ** Custom component imports **
import Header from "../../components/Header/Header"; // Header component for consistent page layout
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage"; // Component to display the not found error message

const NotFound = () => {
  document.title = "Oops! Page Not Found | Ema John"; // Set the page title to indicate a 404 error, maintaining consistency with the site's branding
  return (
    <main id="not-found">
      <Header />
      <NotFoundErrorMessage
        errorMessage={"Oops! Page Not Found"}
        remarks={"Please check your URL and try again"}
      >
        <FontAwesomeIcon className="icon" icon={faSadTear} />
      </NotFoundErrorMessage>
    </main>
  );
};

export default NotFound;
