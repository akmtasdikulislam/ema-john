// ** React related imports **
import React, { useContext, useEffect, useState } from "react"; // Import the React library, which is the foundation of the React framework.

// ** React Router related imports **
import { Link, NavLink } from "react-router-dom"; // Import the Link and NavLink components from the react-router-dom library. These components are used to create links between routes in the app.

// ** Font Awesome related imports **

import {
  faArrowRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"; // Import the faArrowRightFromBracket icon from the @fortawesome/free-solid-svg-icons library. This icon is used to render the sign in button.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component from the @fortawesome/react-fontawesome library. This component is used to render icons from the Font Awesome library.

// ** Context import **
import { AppDataContext } from "../../App"; // Import the AppDataContext from the App.js file. This context is used to share user and cart data between components.

// ** Image imports **
import logo from "../../assets/images/logo-inverted.png"; // Import the logo image from the assets/images directory.

// ** Component imports **
import UserNav from "../UserNav/UserNav"; // Import the UserNav component from the UserNav directory. This component is used to render the user navigation menu.

// Define the Header component, which is a functional component.
const Header = ({searchParams}) => {
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

  // Return the JSX that makes up the Header component.
  return (
    // The header element is the root element of the Header component.
    <header>
      {/* The container element is used to wrap the header content. */}
      <div className="container">
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
    </header>
  );
};

// Export the Header component so it can be used in other parts of the app.
export default Header;
