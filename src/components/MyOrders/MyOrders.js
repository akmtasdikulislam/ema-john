// ** React related imports **
import React, { useContext, useEffect, useState } from "react"; // Import React and hooks for component creation, context usage, side effects, and state management

// ** Fontawesome related imports **
import { faBoxOpen, faFaceSadTear } from "@fortawesome/free-solid-svg-icons"; // Import icons for empty box and sad face, likely used to represent empty orders or error states
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component to render the icons in the React application

// ** Utility functions imports **
import { formatNumber } from "../../functions/formatNumber"; // Import utility function to format numbers for displaying order totals and prices

// ** Context imports **
import { AppDataContext, BACKEND_URL } from "../../App"; // Import AppDataContext for accessing global state and BACKEND_URL for API requests

// ** Components imports **
import Loader from "../Loader/Loader"; // Import Loader component to display loading state while fetching orders
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage"; // Import NotFoundErrorMessage component to display when no orders are found or an error occurs
import OrderRecordRow from "../OrderRecordRow/OrderRecordRow"; // Import OrderRecordRow component to render individual order records in the list

const MyOrders = () => {
  // ** State variables **
  const [failedToFetch, setFailedToFetch] = useState(false); // State to track if there was an error fetching orders. Initially set to false, updated if fetch fails
  const [isOrdersFetched, setIsOrdersFetched] = useState(false); // State to track if orders have been successfully fetched. Used to control loading state and render logic
  const [myOrders, setMyOrders] = useState([]); // State to store the list of user's orders. Initialized as an empty array, populated with fetched orders

  // ** Context variables **
  const { user } = useContext(AppDataContext); // Extract 'user' object from AppDataContext using useContext hook, providing access to global user data throughout the component

  // ** Effects Hooks **

  // This useEffect hook is responsible for fetching orders when the component mounts or when the user changes
  useEffect(() => {
    fetchMyOrders(); // Call the function to fetch user's orders
  }, []); // Add fetchMyOrders to the dependency array to avoid the React Hook warning and ensure it's called when the function changes

  // ** Helper function **

  // Fetches user's orders from the backend API and updates component state
  const fetchMyOrders = async () => {
    /* This function is an asynchronous function responsible for fetching the user's orders from the backend API. It handles the entire process of making an authenticated request, processing the response, and updating the component's state accordingly. The function includes error handling for network issues or invalid responses, and it updates several state variables to reflect the current status of the fetch operation.

    Task list:
    • Reset error and fetch completion states
    • Retrieve user's access token
    • Send GET request to backend API with authentication
    • Check for successful response
    • Parse response data as JSON
    • Update component state with fetched orders
    • Set fetch completion state to true
    • Handle and log any errors
    • Update error state if fetch fails

     */

    setFailedToFetch(false); // Reset the error state before attempting to fetch
    setIsOrdersFetched(false); // Reset the fetch completion state before starting

    try {
      const idToken = await user.accessToken; // Get the user's access token for authentication
      const response = await fetch(`${BACKEND_URL}/orders`, {
        // Send a GET request to the backend API to fetch orders
        headers: {
          Authorization: `Bearer ${idToken}`, // Set the Authorization header with the user's token
        },
      });

      if (!response.ok) {
        // Check if the response status is not in the 200-299 range
        console.log("Error fetching orders"); // Log the error for debugging
        setFailedToFetch(true); // Set the error state to true
        return; // Exit the function early if there's an error
      }

      const data = await response.json(); // Parse the response body as JSON
      setMyOrders(data.orders); // Update the state with the fetched orders
      setIsOrdersFetched(true); // Set the fetch completion state to true
    } catch (error) {
      console.error("Error fetching orders:", error); // Log any caught errors for debugging
      setFailedToFetch(true); // Set the error state to true if an exception occurs
    }
  };
  return (
    <div className="orders">
      <h3>
        Orders{" "}
        <span className="small-text">
          (Total: {formatNumber(myOrders.length)})
        </span>
      </h3>
      {
        // This section uses conditional rendering to display different content based on the order fetching state and order availability
        failedToFetch ? (
          // If fetching failed, display an error message with a "Try Again" button and a sad face icon
          <NotFoundErrorMessage
            errorMessage={"Ops! Something went wrong"}
            dynamicContent={
              <button className="try-again" onClick={() => fetchMyOrders()}>
                Try Again
              </button>
            }
          >
            <FontAwesomeIcon className="icon" icon={faFaceSadTear} />
          </NotFoundErrorMessage>
        ) : isOrdersFetched ? (
          // If orders are fetched successfully, check if there are any orders
          myOrders.length > 0 ? (
            // If there are orders, render a table with order details
            <table>
              <thead>
                <tr>
                  {/* Table headers for different order attributes */}
                  <th>Product</th>
                  <th>Order No</th>
                  <th>Quantity</th>
                  <th>Order Placed on</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the orders array and render each order as a row */}
                {myOrders.map((order, index) => (
                  <OrderRecordRow
                    key={index}
                    product={order}
                    myOrders={myOrders}
                    setMyOrders={setMyOrders}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            // If there are no orders, display a message indicating no orders have been placed yet
            <NotFoundErrorMessage
              errorMessage={"You have added no products yet"}
            >
              <FontAwesomeIcon className="icon" icon={faBoxOpen} />
            </NotFoundErrorMessage>
          )
        ) : (
          // If orders are still being fetched, display a loading indicator
          <div className="loader-container bordered-loader-container">
            <Loader />
            <p>Loading your orders...</p>{" "}
          </div>
        )
      }
    </div>
  );
};
export default MyOrders;
