/** React related imports **/
import React, { useContext, useEffect, useState } from "react"; // Core React imports for component creation, context, side effects, and state management

/** FontAwesome related imports **/
import { faBoxOpen, faFaceSadTear } from "@fortawesome/free-solid-svg-icons"; // Icons for empty product list and error states
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome component for rendering icons

/** Context and constants **/
import { AppDataContext, BACKEND_URL } from "../../App"; // App-wide context and backend URL constant

/** Utility functions **/
import { formatNumber } from "../../functions/formatNumber"; // Function to format numbers (e.g., for displaying total product count)

/** Custom components **/
import Loader from "../Loader/Loader"; // Loading spinner component for async operations
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage"; // Component to display error messages
import ProductRecordRow from "../ProductRecordRow/ProductRecordRow"; // Component to render individual product rows

/**
 * MyProducts component displays a list of user's products.
 *
 * These props are crucial for managing state and navigation in the parent component:
 * - setFeatures: Likely used to update UI features or settings based on product selection.
 * - setProduct: Used to pass selected product data up to parent for detailed view or editing.
 * - setUpdateProduct: Triggers update process in parent, possibly for editing or refreshing product data.
 */
const MyProducts = ({ setFeatures, setProduct, setUpdateProduct }) => {
  // ** State variables **
  const [failedToFetch, setFailedToFetch] = useState(false); // State to track if there was an error fetching products. Initially set to false
  const [isProductsFetched, setIsProductsFetched] = useState(false); // State to track if products have been successfully fetched. Initially set to false
  const [myProducts, setMyProducts] = useState([]); // State to store the list of user's products. Initially an empty array

  // ** Context variables **
  const { user } = useContext(AppDataContext); // Destructure 'user' from the AppDataContext using the useContext hook. This line gives access to the user data stored in the app-wide context

  // ** Effects Hooks **
  useEffect(
    () => {
      // Function call to fetch and update the user's products
      fetchMyProducts();
    }, // Dependency array for useEffect
    []
  ); // Include fetchMyProducts in the dependency array to avoid the warning

  // ** Helper functions **
  const fetchMyProducts = async () => {
    /*
    Description: This function fetches the products of the current user (seller) from the backend.
    
    Task list:
    • Set initial states for error handling and fetching status
    • Make an API call to fetch products
    • Handle the API response
    • Update the state with fetched products
    • Handle any errors that occur during the process
    */

    setFailedToFetch(false); // Reset the error state before making a new request
    setIsProductsFetched(false); // Set the fetching status to false before starting the request

    try {
      const response = await fetch(
        `${BACKEND_URL}/products/seller/${user.uid}` // Make a GET request to fetch products for the current user
      );
      if (!response.ok) {
        console.log("Error to fetch products"); // Log an error message if the response is not OK
        setFailedToFetch(true); // Set the error state to true if the fetch failed
      }

      const myProducts = await response.json(); // Parse the response body as JSON
      setMyProducts(myProducts); // Update the state with the fetched products
      setIsProductsFetched(true); // Set the fetching status to true after successful fetch
    } catch (error) {
      console.error("Error fetching seller products:", error); // Log any errors that occur during the fetch process
      setFailedToFetch(true); // Set the error state to true if an exception occurs
    }
  };
  return (
    <div className="my-products">
      <h3>
        My Products{" "}
        <span className="small-text">
          (Total: {formatNumber(myProducts.length)})
        </span>
      </h3>
      {
        // This section renders different content based on the product fetching state and product availability
        // It uses conditional rendering to display one of three possible outcomes:
        failedToFetch ? (
          // 1. If fetching failed:
          // Display an error message with a "Try Again" button and a sad face icon
          <NotFoundErrorMessage
            errorMessage={"Ops! Something went wrong"}
            dynamicContent={
              <button className="try-again" onClick={() => fetchMyProducts()}>
                Try Again
              </button>
            }
          >
            <FontAwesomeIcon className="icon" icon={faFaceSadTear} />
          </NotFoundErrorMessage>
        ) : isProductsFetched ? (
          myProducts.length > 0 ? (
            // 2. If products are fetched successfully and there are products:
            // Render a table with product details
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through products and render a row for each */}
                {myProducts.map((item, index) => (
                  <ProductRecordRow
                    key={index}
                    productDetails={item}
                    setFeatures={setFeatures}
                    setProduct={setProduct}
                    setUpdateProduct={setUpdateProduct}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            // If there are no products:
            // Display a message indicating no products have been added yet
            <NotFoundErrorMessage
              errorMessage={"You have added no products yet"}
            >
              <FontAwesomeIcon className="icon" icon={faBoxOpen} />
            </NotFoundErrorMessage>
          )
        ) : (
          // 3. If products are still being fetched:
          // Display a loading indicator
          <div className="loader-container bordered-loader-container">
            <Loader />
            <p>Loading your products...</p>{" "}
          </div>
        )
      }
    </div>
  );
};

export default MyProducts;
