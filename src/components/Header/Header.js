// ** React related imports **
import React, { useContext, useEffect, useState } from "react"; // Import the React library, which is the foundation of the React framework.

// ** React Router related imports **
import { Link, NavLink } from "react-router-dom"; // Import the Link and NavLink components from the react-router-dom library. These components are used to create links between routes in the app.

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

  // Effect hook to update searchQuery when searchParams changes
  useEffect(() => {
    // If searchParams exists, update searchQuery state with its value
    searchParams && setSearchQuery(searchParams);
  }, [searchParams]); // Dependency array: re-run effect when searchParams changes

  // Function to open the sidebar
  const openSidebar = () => {
    /*
    This function is responsible for opening the sidebar navigation menu and displaying a dimmed background.

    Task List:
    • Get the sidebar element
    • Display the sidebar
    • Animate the sidebar's position
    • Get the dimmed background element
    • Display the dimmed background
    */

    // Get the sidebar element by its ID
    const sidebar = document.getElementById("nav-sidebar");

    // Set the sidebar's display style to "flex" to make it visible
    sidebar.style.display = "flex";

    // Use setTimeout to create a small delay before animating the sidebar
    setTimeout(() => {
      // Animate the sidebar's position by setting its left style to "0%"
      sidebar.style.left = "0%";
    }, 1);

    // Get the dimmed background element by its ID
    const dimmedBG = document.getElementById("dimmed-bg");

    // Set the dimmed background's display style to "block" to make it visible
    dimmedBG.style.display = "block";
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    /*
    This function is responsible for closing the sidebar navigation menu and hiding the dimmed background.

    Task List:
    • Get the sidebar element
    • Animate the sidebar's position off-screen
    • Hide the sidebar after animation
    • Get the dimmed background element
    • Hide the dimmed background
    */

    // Get the sidebar element by its ID
    const sidebar = document.getElementById("nav-sidebar");

    // Animate the sidebar's position by setting its left style to "-100%"
    sidebar.style.left = "-100%";

    // Use setTimeout to hide the sidebar after the animation completes
    setTimeout(() => {
      // Set the sidebar's display style to "none" to hide it
      sidebar.style.display = "none";
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
      {/* The container element is used to wrap the header content. */}
      <div className="container" id="large-screen">
        <div className="nav-bar">
          {/* The logo element is used to render the logo image. */}
          <img className="logo" src={logo} alt="ema-john Logo" />

          {/* The nav element is used to render the navigation menu. */}
          <nav>
            {/* The NavLink component is used to create a link to the home route. */}
            <NavLink to="/">Home</NavLink>
            {/* The NavLink component is used to create a link to the order review route. */}
            <NavLink to="/order/review">Order Review</NavLink>
            {/* The NavLink component is used to create a link to the inventory route. */}
            <NavLink to="/inventory">Manage Inventory</NavLink>
          </nav>

          {/* The sign in button and user navigation menu are conditionally rendered based on the user's authentication status. */}
          {user?.uid ? (
            // If the user is authenticated, render the UserNav component.
            <UserNav />
          ) : (
            // If the user is not authenticated, render the sign in button.
            <Link className="link" to={"/login"}>
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
      {/* Small Screen */}
      <div className="container" id="small-screen">
        <div className="logo-menu">
          {/* The logo element is used to render the logo image. */}
          <img className="logo" src={logo} alt="ema-john Logo" />

          {/* The button element is used to render the menu icon. */}
          <FontAwesomeIcon
            className="nav-menu-icon"
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
              <FontAwesomeIcon icon={faSearch} /> <span>Search</span>
            </button>
          </Link>
        </div>
      </div>

      <nav id="nav-sidebar">
        <FontAwesomeIcon
          icon={faXmark}
          className="close-icon"
          onClick={closeSidebar}
        />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/order/review">Order Review</NavLink>
        <NavLink to="/inventory">Manage Inventory</NavLink>
        {user?.uid ? (
          <UserNav />
        ) : (
          <Link className="link" to={"/login"}>
            <button id="sign-in">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Sign in
            </button>
          </Link>
        )}
      </nav>
      <div id="dimmed-bg"></div>
    </header>
  );
};

// Export the Header component so it can be used in other parts of the app.
export default Header;
