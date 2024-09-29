// ** React related imports **
import React, { useContext, useEffect, useState } from "react"; // Import the React library, which is the foundation of the React framework.

// ** React Router related imports **
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import the Link and NavLink components from the react-router-dom library. These components are used to create links between routes in the app.

// ** Font Awesome related imports **

import {
  faArrowRightFromBracket,
  faBars,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"; // Import the faArrowRightFromBracket icon from the @fortawesome/free-solid-svg-icons library. This icon is used to render the sign in button.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component from the @fortawesome/react-fontawesome library. This component is used to render icons from the Font Awesome library.

// ** Context import **
import { AppDataContext } from "../../App"; // Import the AppDataContext from the App.js file. This context is used to share user and cart data between components.

// ** Image imports **
import logo from "../../assets/images/logo-inverted.png"; // Import the logo image from the assets/images directory.

// ** Component imports **
import UserNav from "../UserNav/UserNav"; // Import the UserNav component from the UserNav directory. This component is used to render the user navigation menu.

// Define the Header component, which is a functional component.
const Header = ({ searchParams }) => {
  // Use the useContext hook to access the AppDataContext.
  // This hook allows us to access the user and cart data from the context.
  const { user } = useContext(AppDataContext);

  // Define a state variable 'searchQuery' and its setter function 'setSearchQuery'
  // This state will store and update the user's search input
  // useState("") initializes the searchQuery with an empty string
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom to enable programmatic navigation between routes

  // Effect hook to update searchQuery when searchParams changes
  useEffect(() => {
    // If searchParams exists, update searchQuery state with its value
    searchParams && setSearchQuery(searchParams);
  }, [searchParams]); // Dependency array: re-run effect when searchParams changes

  // Effect hook To ensure the dimmed background is always removed when navigating, we can add an effect that runs on component mount and unmount
  useEffect(() => {
    // Return a cleanup function to be executed when the component unmounts
    return () => {
      // Get the element with id "dimmed-bg"
      const dimmedBG = document.getElementById("dimmed-bg");
      // If the dimmed background element exists
      if (dimmedBG) {
        // Hide the dimmed background
        dimmedBG.style.display = "none";
      }
      // Enable vertical scrolling on the body
      document.body.style.overflowY = "auto";
      // Remove any max-height restriction on the body
      document.body.style.maxHeight = "";
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  // ** Helper Function **

  const handleNavigation = (path) => {
    /*
    This function handles navigation to a specified path while ensuring the sidebar is closed.

    Task List:
    • Close the sidebar
    • Navigate to the specified path
    */

    closeSidebar(); // Close the sidebar before navigation
    navigate(path); // Use the navigate function to go to the specified path
  };

  // Function to open the sidebar
  const openSidebar = () => {
    /*
      This function is responsible for opening the sidebar navigation menu, displaying a dimmed background,
      and preventing scrolling on the main body.

      Task List:
      • Get the sidebar and user navigation elements
      • Prevent scrolling on the main body
      • Display the sidebar and user navigation
      • Animate the sidebar and user navigation positions
      • Get the dimmed background element
      • Display the dimmed background
      */

    // Get the sidebar and user navigation elements by their IDs
    const navMenu = document.getElementById("nav-menu");
    const userStatus = document.getElementById("user-status");

    // Prevent scrolling on the main body
    document.body.style.maxHeight = "100vh";
    document.body.style.overflowY = "hidden";

    // Set the sidebar's display style to "flex" to make it visible
    navMenu.style.display = "flex";

    // Use setTimeout to create a small delay before animating the sidebar and user navigation
    setTimeout(() => {
      // Animate the sidebar and user navigation positions by setting their left style to "0"
      navMenu.style.left = 0;
      userStatus.style.left = 0;
    }, 1);

    // Get the dimmed background element by its ID
    const dimmedBG = document.getElementById("dimmed-bg");

    // Set the dimmed background's display style to "block" to make it visible
    dimmedBG.style.display = "block";
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    /*
      This function is responsible for closing the sidebar navigation menu, hiding the dimmed background,
      and restoring scrolling on the main body.

      Task List:
      • Get the sidebar and user navigation elements
      • Restore scrolling on the main body
      • Animate the sidebar and user navigation positions off-screen
      • Hide the sidebar after animation
      • Get the dimmed background element
      • Hide the dimmed background
      */

    // Get the sidebar and user navigation elements by their IDs
    const navMenu = document.getElementById("nav-menu");
    const userStatus = document.getElementById("user-status");

    // Restore scrolling on the main body
    document.body.style.overflowY = "auto";
    document.body.style.maxHeight = "";

    // Animate the sidebar and user navigation positions by setting their left style to "-25em"
    navMenu.style.left = "-25em";
    userStatus.style.left = "-25em";

    // Use setTimeout to hide the sidebar after the animation completes
    setTimeout(() => {
      // Set the sidebar's display style to "none" to hide it
      navMenu.style.display = "none";
    }, 1000);

    // Get the dimmed background element by its ID
    const dimmedBG = document.getElementById("dimmed-bg");

    // Set the dimmed background's display style to "none" to hide it
    dimmedBG.style.display = "none";
  };

  // Return the JSX that makes up the Header component.
  return (
    // The header element is the root element of the Header component.
    <header>
      <div className="container" id="large-screen">
        <div className="nav-bar">
          {/* The logo element is used to render the logo image. */}
          <img className="logo" src={logo} alt="ema-john Logo" />

          {/* The nav element is used to render the navigation menu. */}
          <nav id="nav-menu">
            {/* NavLink for the Home page */}
            <NavLink to="/" onClick={() => handleNavigation("/")}>
              Home
            </NavLink>
            {/* NavLink for the Order Review page */}
            <NavLink
              to="/order/review"
              onClick={() => handleNavigation("/order/review")}
            >
              Order Review
            </NavLink>
            {/* NavLink for the Manage Inventory page */}
            <NavLink
              to="/inventory"
              onClick={() => handleNavigation("/inventory")}
            >
              Manage Inventory
            </NavLink>

            <FontAwesomeIcon
              icon={faXmark}
              className="icon close-icon"
              onClick={closeSidebar}
            />
          </nav>

          {/* The sign in button and user navigation menu are conditionally rendered based on the user's authentication status. */}
          <div id="user-status">
            {user?.uid ? (
              // If the user is authenticated, render the UserNav component.
              <UserNav />
            ) : (
              // If the user is not authenticated, render the sign in button.
              <Link id="sign-in-button" className="link" to={"/login"}>
                {/* The button element is used to render the sign in button. */}
                <button id="sign-in">
                  {/* The FontAwesomeIcon component is used to render the sign in icon. */}
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  {/* The text "Sign in" is rendered inside the button. */}
                  Sign in
                </button>
              </Link>
            )}
          </div>

          {/* The button element is used to render the menu icon. */}
          <FontAwesomeIcon
            className="icon nav-menu-icon"
            icon={faBars}
            onClick={openSidebar}
          />
        </div>
        <div className="search-bar">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Find products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={`/search?q=${searchQuery}`}>
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

// Export the Header component so it can be used in other parts of the app.
export default Header;
