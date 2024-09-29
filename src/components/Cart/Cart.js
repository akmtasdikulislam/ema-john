// ** React and React Router imports **
import React, { useContext } from "react"; // Import React and the useContext hook for state management
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom for programmatic navigation

// ** Font Awesome imports **
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart"; // Import the shopping cart icon from Font Awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component to use Font Awesome icons in React
// App-wide context and configuration
import { AppDataContext } from "../../App"; // Import the AppDataContext and BACKEND_URL from the App component

// Utility functions for data formatting and generation
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { calculateCart } from "../../functions/calculateCart";
import { showToast } from "../../functions/showToast"; // Import the showToast function to display notifications to the user

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const { cart, user, toasts, setToasts } = useContext(AppDataContext); // Destructure values from AppDataContext using useContext hook
  // cart: Current state of the shopping cart
  // setCart: Function to update the cart state
  // user: Current user information
  // toasts: Array of toast notifications
  // setToasts: Function to update toast notifications
  // setTotalCartPrice: Function to update the total cart price

  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom to enable programmatic navigation between routes

  // Destructure values from the calculateCart function, which processes the cart data
  const {
    totalItems, // Total number of items in the cart
    merchandise, // Total cost of merchandise before additional charges
    shippingAndHandling, // Cost for shipping and handling
    vatAndTax, // Value Added Tax (VAT) and other applicable taxes
    grandTotal, // Final total cost including all items and charges
  } = calculateCart(cart); // Call calculateCart function with the current cart state
  const handleProceedToCheckout = () => {
    if (totalItems < 1) {
      // Check if the cart is empty
      showToast(
        // Display a toast notification
        toasts, // Current toasts array
        setToasts, // Function to update toasts
        "error", // Type of toast (error in this case)
        "Empty Cart", // Title of the toast
        "Your cart is empty. Please add items to your cart before proceeding to checkout." // Message content of the toast
      );
    } else {
      // If the cart is not empty
      if (user) {
        // Check if the user is logged in
        navigate("/checkout"); // Redirect to the checkout page
      } else {
        // If the user is not logged in
        navigate("/login", { state: { from: "/checkout" } }); // Redirect to login page with return path
        showToast(
          // Display a toast notification
          toasts, // Current toasts array
          setToasts, // Function to update toasts
          "error", // Type of toast (error in this case)
          "Login Required", // Title of the toast
          "Please sign in to your account before proceeding to checkout." // Message content of the toast
        );
      }
    }
  };
  const handleCloseButton = () => {
    /*
    This function handles the closing of the cart modal by hiding the cart and dimmed background,
    and resetting the body overflow and max height.

    Task List:
    • Get the cart element
    • Get the dimmed background element
    • Hide the cart
    • Hide the dimmed background
    • Reset body overflow
    • Reset body max height
    */

    const cart = document.getElementsByClassName("cart")[0]; // Get the first element with class "cart"
    const dimmedBG = document.getElementById("dimmed-bg"); // Get the element with id "dimmed-bg"
    cart.style.display = "none"; // Hide the cart element
    dimmedBG.style.display = "none"; // Hide the dimmed background
    document.body.style.overflowY = "auto"; // Reset the vertical overflow of the body to auto
    document.body.style.maxHeight = ""; // Remove any max height restriction on the body
  };

  return (
    <aside className="cart">
      <h5>
        <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        Cart Summary
      </h5>
      <FontAwesomeIcon
        icon={faXmark}
        className="close-icon"
        onClick={handleCloseButton}
      />
      <table>
        <tbody>
          <tr>
            <td>
              <p>Total products</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>{totalItems} items</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Merchandise</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>
                ${" "}
                {
                  // if merchandise cost is not greater than 0, then it will show hard coded value ("00.00") otherwise it will show the merchandise cost. (Shipping & Handling, VAT+Tax and Grand Total are also showed in the same way.)
                  merchandise > 0 ? merchandise.toFixed(2) : "00.00"
                }
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Shipping & Handling</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>
                ${" "}
                {shippingAndHandling > 0
                  ? shippingAndHandling.toFixed(2)
                  : "00.00"}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>VAT & Tax</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>$ {vatAndTax > 0 ? vatAndTax.toFixed(2) : "00.00"}</p>
            </td>
          </tr>
          <tr className="grand-total">
            <td>
              <p>Grand Total</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>$ {grandTotal > 0 ? grandTotal.toFixed(2) : "00.00"}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          handleProceedToCheckout();
        }}
      >
        Proceed to Checkout
      </button>
    </aside>
  );
};

export default Cart;
