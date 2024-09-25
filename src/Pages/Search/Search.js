// ** React and React Router imports **

import React, { useEffect, useState } from "react"; // Import React and the useContext hook for state management
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"; // Import routing components and hooks from react-router-dom for navigation

// ** Font Awesome imports **

import { faFaceFrown, faFaceSadTear } from "@fortawesome/free-solid-svg-icons"; // Import the sad face icon from Font Awesome for use in error messages
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component to render Font Awesome icons

// ** Internal component imports **

import Cart from "../../components/Cart/Cart"; // Import the Cart component to display shopping cart
import Header from "../../components/Header/Header"; // Import the Header component for the page header
import Loader from "../../components/Loader/Loader"; // Import the Loader component to show loading state
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage"; // Import NotFoundErrorMessage component to display error messages
import Product from "../../components/Product/Product"; // Import the Product component to display individual product items

// ** Context imports **

import { BACKEND_URL } from "../../App"; // Import the AppDataContext to access global application state

const Search = () => {
  // ** State and hooks **

  const [failedToFetch, setFailedToFetch] = useState(false); // State to track whether fetching products failed
  const [isProductsLoaded, setIsProductsLoaded] = useState(false); // State to track whether products have been loaded from the server
  const [paginatedProducts, setPaginatedProducts] = useState([]); // State to store the current page of products for pagination
  const [products, setProducts] = useState([]); // State to store the list of all products
  const [searchParams] = useSearchParams(); // Hook to access and modify URL search parameters
  const query = searchParams.get("q") || ""; // Get the 'q' query parameter from the URL, or use an empty string if not present

  // ** Routing hooks**

  const { pageNumber = 1 } = useParams(); // Extract pageNumber from URL parameters, default to 1 if not provided
  const navigate = useNavigate(); // Get the navigate function from react-router for programmatic navigation

  // ** Pagination calculations **
  const currentPage = parseInt(pageNumber, 10) - 1; // Convert pageNumber to zero-based index for array access
  const productPages = paginatedProducts; // Assign paginatedProducts to productPages for clarity
  const totalPages = productPages.length; // Calculate total number of pages
  const currentPageProducts = productPages[currentPage] || []; // Get products for the current page, or empty array if page doesn't exist

  // ** Helper functions **

  // Function to fetch searched products from the backend API
  const fetchSearchedProducts = async () => {
    // Task list:
    // • Reset the failedToFetch state to false
    // • Send a GET request to the backend API to fetch products
    // • Check if the response is successful
    // • Parse the JSON response
    // • Update the products state with the fetched data
    // • Set the isProductsLoaded state to true
    // • Handle any errors that occur during the fetch process
    // • Set the failedToFetch state based on the outcome
    // • Log any errors to the console
    // • Update the isProductsLoaded state in case of failure

    // Reset the failedToFetch state to false before attempting to fetch products
    // This ensures we start with a clean slate and can accurately track fetch failures
    setFailedToFetch(false);

    try {
      // Send a GET request to the backend API to fetch products
      const response = await fetch(`${BACKEND_URL}/products/search?q=${query}`);
      // Check if the response is not successful
      if (!response.ok) {
        // Log an error message if the fetch was not successful
        console.log("Error fetching products:", response.statusText);
      }
      // Parse the JSON response
      const data = await response.json();
      console.log("Search results fetched");
      // Update the products state with the fetched data
      setProducts(data);
      // Set the isProductsLoaded state to true to indicate products have been loaded
      setIsProductsLoaded(true);
      // Set the failedToFetch state to false as the fetch was successful
      setFailedToFetch(false);
      console.log(data);
    } catch (error) {
      // Log any errors that occur during the fetch process
      console.error("Error fetching products:", error);
      // Set the failedToFetch state to true as an error occurred
      setFailedToFetch(true);
      setIsProductsLoaded(false);
    }
  };

  // Function to split products into paginated sets
  const splitProductsIntoPaginatedSets = (pageSize = 10) => {
    // Task list:
    // • Initialize an array to store all product pages
    // • Initialize an array to store the current page of products
    // • Iterate through each product in the products array
    // • Add each product to the current page
    // • Check if the current page is full or if we've reached the last product
    // • If so, add the current page to the productPages array
    // • Reset the current page to an empty array for the next set of products
    // • Return the array of product pages

    // Initialize an array to store all product pages
    const productPages = [];
    // Initialize an array to store the current page of products
    let currentPage = [];

    // Iterate through each product in the products array
    products.forEach((product, index) => {
      // Add the current product to the current page
      currentPage.push(product);

      // Check if the current page is full or if we've reached the last product
      if (currentPage.length === pageSize || index === products.length - 1) {
        // Add the current page to the productPages array
        productPages.push(currentPage);
        // Reset the current page to an empty array for the next set of products
        currentPage = [];
      }
    });
    return productPages;
  };

  // ** Navigation functions **

  // Function to navigate to the previous page
  const goToPreviousPage = () => {
    // Task list:
    // • Check if there is a previous page (currentPage > 0)
    // • If there is a previous page:
    //   - Navigate to the search page with query parameter ("/search?q={query}") if going to the first page
    //   - Otherwise, navigate to the specific previous page ("/search/{pageNumber}?q={query}")
    // • If there is no previous page, do nothing

    // Check if there is a previous page
    if (currentPage > 0) {
      // Navigate to home if going to first page, otherwise to specific page
      navigate(
        currentPage === 1
          ? `/search?q=${query}`
          : `/search/${currentPage}?q=${query}`
      );
    }
  };

  // Function to navigate to the next page
  const goToNextPage = () => {
    // Task list:
    // • Check if there is a next page (currentPage < totalPages - 1)
    // • If there is a next page:
    //   - Navigate to the next page ("/search/{pageNumber}?q={query}")
    // • If there is no next page, do nothing

    // Check if there is a next page
    if (currentPage < totalPages - 1) {
      // Navigate to the next page
      navigate(`/search/${currentPage + 2}?q=${query}`);
    }
  };

  // ** UseEffect Hooks **

  // Use the useEffect hook to fetch products when the component mounts or when the query changes
  useEffect(() => {
    // Set the document title for the Search results page
    document.title = `Search result of ${query} | Ema John`;
    // Reset the products array to an empty state when the query changes
    setProducts([]);
    // Set the loading state to false to indicate that new products are being fetched
    setIsProductsLoaded(false);
    // Clear the paginated products array to prepare for new search results
    setPaginatedProducts([]);
    // Fetch new products based on the updated search query
    fetchSearchedProducts();
    // Disable ESLint warning for missing dependencies in the useEffect hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); // Re-run the effect when the search query changes

  // Use the useEffect hook to update paginated products when products are loaded
  useEffect(() => {
    // Check if products have been loaded
    if (isProductsLoaded) {
      // Split products into paginated sets and update state
      setPaginatedProducts(splitProductsIntoPaginatedSets());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsLoaded]);

  // Return statement for the component
  return (
    <main id="search">
      {/* Header component */}
      <Header searchParams={query}/>
      <div className="container">
        <h1>Showing search results of "{query}"</h1>
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
                    onClick={() => fetchSearchedProducts()}
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
            products.length > 0 ? (
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
              <div className="col-9">
                <NotFoundErrorMessage
                  errorMessage={"Nothing found. Try to search anything else"}
                >
                  <FontAwesomeIcon className="icon" icon={faFaceFrown} />
                </NotFoundErrorMessage>
              </div>
            )
          ) : (
            // If products are still loading, display a loading indicator
            <div className="col-9 loader-container">
              <Loader />{" "}
              {/* Custom Loader component to show loading animation */}
              <p>Please wait while we load your searched products...</p>
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
                // Set the appropriate URL for each page number:
                // - For the first page (index 0), use '/search?q=query'
                // - For subsequent pages, use '/search/pageNumber?q=query'
                to={
                  index === 0
                    ? `/search?q=${query}`
                    : `/search/${index + 1}?q=${query}`
                }
                // Apply 'pagination' class to each NavLink for consistent styling
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

export default Search;
