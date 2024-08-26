// ** React and React Router imports **

import React, { useContext } from "react"; // Import React and the useContext hook for state management
import { NavLink, useNavigate, useParams } from "react-router-dom"; // Import routing components and hooks from react-router-dom for navigation

// ** Font Awesome imports **

import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons"; // Import the sad face icon from Font Awesome for use in error messages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component to render Font Awesome icons

// ** Internal component imports **

import Cart from "../../components/Cart/Cart"; // Import the Cart component to display shopping cart
import Header from "../../components/Header/Header"; // Import the Header component for the page header
import Loader from "../../components/Loader/Loader"; // Import the Loader component to show loading state
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage"; // Import NotFoundErrorMessage component to display error messages
import Product from "../../components/Product/Product"; // Import the Product component to display individual product items

// ** Context imports **

import { AppDataContext } from "../../App"; // Import the AppDataContext to access global application state

// Component for the Home page
// Props:
// - failedToFetch: boolean indicating if there was an error fetching products
// - fetchAllProducts: function to fetch all products from the API
const Home = ({ failedToFetch, fetchAllProducts }) => {
  // Set the document title for the Home page
  document.title = "Home | Ema John";

  // ** Context and routing hooks**

  const { isProductsLoaded, paginatedProducts } = useContext(AppDataContext); // Destructure values from AppDataContext using useContext hook
  // isProductsLoaded: boolean indicating if products have been loaded
  // paginatedProducts: array of product pages
  const { pageNumber = 1 } = useParams(); // Extract pageNumber from URL parameters, default to 1 if not provided
  const navigate = useNavigate(); // Get the navigate function from react-router for programmatic navigation

  // ** Pagination calculations **
  const currentPage = parseInt(pageNumber, 10) - 1; // Convert pageNumber to zero-based index for array access
  const productPages = paginatedProducts; // Assign paginatedProducts to productPages for clarity
  const totalPages = productPages.length; // Calculate total number of pages
  const currentPageProducts = productPages[currentPage] || []; // Get products for the current page, or empty array if page doesn't exist

  // ** Navigation functions **

  // Function to navigate to the previous page
  const goToPreviousPage = () => {
    // Task list:
    // • Check if there is a previous page (currentPage > 0)
    // • If there is a previous page:
    //   - Navigate to the home page ("/") if going to the first page
    //   - Otherwise, navigate to the specific previous page ("/products/page/{pageNumber}")
    // • If there is no previous page, do nothing

    // Check if there is a previous page
    if (currentPage > 0) {
      // Navigate to home if going to first page, otherwise to specific page
      navigate(currentPage === 1 ? "/" : `/products/page/${currentPage}`);
    }
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    // Task list:
    // • Check if there is a next page (currentPage < totalPages - 1)
    // • If there is a next page:
    //   - Navigate to the next page ("/products/page/{pageNumber}")
    // • If there is no next page, do nothing

    // Check if there is a next page
    if (currentPage < totalPages - 1) {
      // Navigate to the next page
      navigate(`/products/page/${currentPage + 2}`);
    }
  };

  // Return statement for the component
  return (
    <main id="home">
      {/* Header component */}
      <Header />
      <div className="container">
        <h1>Discover Our Best-Selling Products</h1>
        {/* Main content area */}
        <div
          className={`row ${
            isProductsLoaded
              ? ""
              : "d-flex justify-content-center align-items-center flex-row"
          }`}
        >
          {failedToFetch ? ( // Check if there was an error fetching the products
            // If fetching failed, display an error message with a "Try Again" button and a sad face icon
            <div className="col-9 loader-container">
              <NotFoundErrorMessage
                errorMessage={"Ops! Something went wrong"}
                dynamicContent={
                  <button
                    className="try-again"
                    onClick={() => fetchAllProducts()}
                  >
                    Try Again
                  </button>
                }
              >
                <FontAwesomeIcon className="icon" icon={faFaceSadTear} />
              </NotFoundErrorMessage>
            </div>
          ) : // If fetching was successful, proceed to render products or loading indicator
          isProductsLoaded ? (
            // If products have been loaded successfully, display them
            <div className="col-9">
              {/* Map through the products of the current page and render each one */}
              {currentPageProducts.map((product) => (
                <Product
                  key={product.key} // Use a unique identifier for each product
                  productDetails={product} // Pass the entire product object as props
                  parent={"home"} // Indicate that this product is being rendered on the home page
                />
              ))}
            </div>
          ) : (
            // If products are still loading, display a loading indicator
            <div className="col-9 loader-container">
              <Loader />{" "}
              {/* Custom Loader component to show loading animation */}
              <p>
                Please wait while we load our best-selling products for you...
              </p>
            </div>
          )}
          {/* Shopping cart component */}
          <div className="col-3">
            <Cart />
          </div>
        </div>
        {/* Pagination section - This portion handles the display and functionality of pagination controls */}
        {/* Only render pagination if products are loaded */}
        {isProductsLoaded && (
          <div
            // Container for pagination controls with dynamic classes based on current page
            className={`pagination-container ${
              currentPage > 0 ? "has-prev" : ""
            } ${currentPage < totalPages - 1 ? "has-next" : ""}`}
          >
            {/* Previous page button - Only show if not on the first page */}
            {currentPage > 0 && (
              <button onClick={goToPreviousPage}>Prev</button>
            )}
            {/* Page number links - Create an array of length totalPages and map over it */}
            {[...Array(totalPages)].map((_, index) => (
              <NavLink
                // Unique key for each NavLink
                key={index}
                // Set the appropriate URL for each page number
                to={index === 0 ? "/" : `/products/page/${index + 1}`}
                // Apply 'pagination' class to each NavLink
                className="pagination"
              >
                {/* Display page number (index + 1) */}
                {index + 1}
              </NavLink>
            ))}
            {/* Next page button - Only show if not on the last page */}
            {currentPage < totalPages - 1 && (
              <button onClick={goToNextPage}>Next</button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
