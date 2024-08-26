/**
 * OrderRecordRow Component
 *
 * This component renders a single row in an order record table, displaying
 * information about a specific product order.
 *
 * Purpose:
 * - To display individual order details in a tabular format
 * - To provide a consistent and reusable structure for each order entry
 *
 * Usage:
 * <OrderRecordRow product={productObject} />
 *
 * Props:
 * @param {Object} product - An object containing the following properties:
 *   @property {string} img - URL of the product image
 *   @property {string} name - Name of the product
 *   @property {string} orderDate - Date when the order was placed
 *   @property {string|number} orderID - Unique identifier for the order
 *   @property {number} quantity - Quantity of the product ordered
 *
 * Features:
 * - Displays product image and name
 * - Shows order ID, quantity, and order date
 * - Includes a "done" button with a check icon for order deletion
 *
 * Styling:
 * - Uses custom CSS classes for layout and appearance
 * - Incorporates FontAwesome icons for enhanced visual appeal
 *
 * Dependencies:
 * - React
 * - @fortawesome/react-fontawesome for icons
 * - formatNumber function from "../../functions/formatNumber"
 * - deleteOrder function for handling order deletion
 *
 * Note:
 * This component is typically used within a parent component that manages
 * a list or table of orders, such as an OrderHistory or OrderManagement component.
 * The deleteOrder function is called when the "done" button is clicked, which
 * sends a DELETE request to the server to remove the order.
 */

/** React related imports **/
import React, { useContext } from "react"; // Core React library and useContext hook for accessing context

/** FontAwesome related imports **/
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Check icon for the "done" button
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome component for rendering icons

/** Context and constants **/
import { AppDataContext, BACKEND_URL } from "../../App"; // App-wide context and backend URL constant

/** Utility functions **/
import { formatNumber } from "../../functions/formatNumber"; // Function to format numbers (e.g., for quantity display)
import { showToast } from "../../functions/showToast"; // Function to display toast notifications (e.g., after deleting an order)
const OrderRecordRow = ({ product, myOrders, setMyOrders }) => {
  // Destructure toasts and setToasts from AppDataContext to manage toast notifications
  const { toasts, setToasts } = useContext(AppDataContext);
  
  // Extract product details from the product prop for easy access in the component
  const { img, name, orderDate, orderID, quantity } = product;


  const deleteOrder = async (orderID) => {
    /*
     Description: This function handles the deletion of an order by sending a DELETE request to the server
     and updating the local state accordingly.
     
     Task list:
     • Send a DELETE request to the server
     • Handle the server response (success or error)
     • Update the local state by removing the deleted order
     • Display appropriate toast notifications
     */
    try {
      // Send a DELETE request to the server to remove the order
      const response = await fetch(`${BACKEND_URL}/orders/${orderID}`, {
        method: "DELETE", // Specify the HTTP method as DELETE
        headers: {
          "Content-Type": "application/json", // Set the content type of the request
        },
      });

      // Check if the response is not successful
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.error || "Failed to delete order"); // Throw an error with the received message or a default one
      }

      // Parse the successful response
      const result = await response.json(); // Convert the response to JSON
      // Log the success message
      console.log(result.message); // Output the success message to the console
      // Show a success toast notification
      showToast(toasts, setToasts, "success", "Order completed successfully"); // Display a success message to the user
      // Update the local state by removing the deleted order
      const updatedMyOrders = myOrders.filter(
        (order) => order.orderID !== orderID // Keep all orders except the one that was deleted
      );
      // Set the updated orders in the state
      setMyOrders(updatedMyOrders); // Update the state with the new list of orders
    } catch (error) {
      // Log the error to the console
      console.error("Failed to delete order:", error); // Output the error details for debugging
      // Show an error toast notification
      showToast(
        toasts,
        setToasts,
        "error",
        "Failed to complete the order. Try again" // Display an error message to the user
      );
    }
  };

  return (
    <tr>
      <td>
        <div className="product-name-image">
          <img src={img} alt={name} />
          <p>{name}</p>
        </div>
      </td>
      <td className="order-id">#{orderID}</td>
      <td>{formatNumber(quantity)}</td>
      <td className="order-date">{orderDate}</td>
      <td>
        <div className="actions">
          {/* Button to mark the order as completed */}
          <button className="done-button" onClick={() => deleteOrder(orderID)}>
            {/* FontAwesome check icon to visually indicate completion action */}
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRecordRow;
