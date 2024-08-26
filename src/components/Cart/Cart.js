// ** React and React Router imports **
import React, { useContext } from "react"; // Import React and the useContext hook for state management
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom for programmatic navigation

// ** Font Awesome imports **
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart"; // Import the shopping cart icon from Font Awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component to use Font Awesome icons in React
// App-wide context and configuration
import { AppDataContext, BACKEND_URL } from "../../App"; // Import the AppDataContext and BACKEND_URL from the App component

// Utility functions for data formatting and generation
import { formatDate } from "../../functions/formatDate"; // Import the formatDate function to format dates consistently
import { formatNumber } from "../../functions/formatNumber"; // Import the formatNumber function to format numbers (e.g., for currency display)
import { generateOrderID } from "../../functions/generateOrderID"; // Import the generateOrderID function to create unique order identifiers
import { showToast } from "../../functions/showToast"; // Import the showToast function to display notifications to the user

const Cart = () => {
  // eslint-disable-next-line no-unused-vars
  const { cart, setCart, user, toasts, setToasts } = useContext(AppDataContext); // Destructure values from AppDataContext using useContext hook
  // cart: Current state of the shopping cart
  // setCart: Function to update the cart state
  // user: Current user information
  // toasts: Array of toast notifications
  // setToasts: Function to update toast notifications

  // Converting totalItems number into two digit numbers
  let totalItems = formatNumber(cart.length);
  const navigate = useNavigate();

  // Shopping Cost related variables
  let merchandise = 0; // Initialize the total cost of merchandise (sum of all item prices) to zero
  let shippingAndHandling = 0; // Initialize shipping and handling charges to zero
  let subTotal = 0; // Initialize subtotal (merchandise + shipping) to zero
  let vatAndTax = 0; // Initialize VAT (Value Added Tax) and other taxes to zero
  let grandTotal = 0; // Initialize the final total (subtotal + taxes) to zero

  // Cart Total Calculation: This code block calculates the total cost of items in the shopping cart, including merchandise cost, shipping and handling, VAT and taxes.
  // eslint-disable-next-line array-callback-return
  cart.map((product) => {
    /* 
    Task list:
    • Map through each product in the cart
    • Destructure price, quantity, and shipping from each product
    • Calculate merchandise cost by adding price * quantity for each product
    • Calculate total shipping and handling cost
    • Calculate subtotal (merchandise + shipping and handling)
    • Determine VAT and tax amount based on subtotal:
      - 7.5% if subtotal > $500
      - 5% if subtotal > $1000
      - 2.5% if subtotal > $2000
      - 10% if subtotal <= $500
    • Calculate grand total (subtotal + VAT and tax)
    */

    // When a new product is inserted, then .map() is run on the cart to calculate shopping cost.

    // Destructuring product's price and shipping cost.
    const { price, quantity, shipping } = product;

    // Calculating total merchandise cost.
    merchandise = merchandise + price * quantity;

    // Calculating total shippingAndHandling cost.
    shippingAndHandling = shippingAndHandling + shipping;

    // Calculating subTotal (sum of merchandise cost & shippingAndHandling cost) to determine vatAndTax amount.
    subTotal = merchandise + shippingAndHandling;

    // Determining vatAndTax amount depending on subTotal.
    if (subTotal > 500) {
      // If the subTotal is more than $500, then 7.5% vat+tax will be applied
      vatAndTax = subTotal * 0.075;
    } else if (subTotal > 1000) {
      // If the subTotal is more than $1000, then 5% vat+tax will be applied
      vatAndTax = subTotal * 0.05;
    } else if (subTotal > 2000) {
      // If the subTotal is more than $2000, then 2.5% vat+tax will be applied
      vatAndTax = subTotal * 0.025;
    } else {
      // If the subTotal is less than $500, then 10% vat+tax will be applied
      vatAndTax = subTotal * 0.1;
    }

    // Finally calculating "Grand Total" (sum of subTotal and vatAndTax).
    grandTotal = subTotal + vatAndTax;
  });

  const addNewOrder = async (orderedProduct) => {
    /* The addNewOrder function sends a POST request to the backend API to add a new order. It takes an orderedProduct object as a parameter, converts it to JSON, and sends it in the request body. The function handles the response, logging success or error messages accordingly. 

    Task list:
    • Receive orderedProduct as a parameter
    • Send a POST request to the backend API to add a new order
    • Use fetch API to make the request
    • Set appropriate headers for the request
    • Convert orderedProduct to JSON string for the request body
    • Handle the response from the server
    • Check if the response is successful
    • Parse the JSON response
    • Log success message if order is added successfully
    • Catch and log any errors that occur during the process
    */
    try {
      // Send a POST request to create a new order in the backend
      const response = await fetch(`${BACKEND_URL}/orders/add`, {
        method: "POST", // Specify POST method for creating a new resource
        headers: {
          "Content-Type": "application/json", // Set content type to JSON for proper data formatting
        },
        body: JSON.stringify(orderedProduct), // Convert order data to JSON string for transmission
      });

      // Check if the response is not successful (status code not in 200-299 range)
      if (!response.ok) {
        throw new Error("Failed to add order"); // Throw error if request failed, triggering catch block
      }

      // Parse the JSON response from the server
      const result = await response.json();
      console.log("Order added successfully:", result); // Log success message with server response
    } catch (error) {
      // Log any errors that occur during the order creation process
      console.error("Error adding order:", error); // Log detailed error information
      console.error("Failed to add order:", error); // Additional error logging for clarity
    }
  };

  const handleAddNewOrder = () => {
    /* The handleAddNewOrder function is responsible for processing the checkout of items in the cart. It first checks if the user is logged in. If logged in, it iterates through each product in the cart, creates an order object for each product, calls the addNewOrder function to send the order to the backend, clears the cart, and displays a success message. If the user is not logged in, it redirects to the login page and shows an error message prompting the user to sign in before checkout.
  
    Task list:
    • Check if the user is logged in
    • If user is logged in:
     - Iterate through each product in the cart
     - Create an object with order details for each product
     - Call addNewOrder function for each product
     - Clear the cart after placing orders
     - Show success message using showToast
    • If user is not logged in:
     - Redirect to login page
       - Show error message for login requirement using showToast
   */

    if (user) {
      // Check if user is logged in
      // Iterate through each product in the cart
      // eslint-disable-next-line array-callback-return
      cart.map((product) => {
        // Create an object with order details for each product
        let orderedProduct = {
          _id: product._id, // Unique identifier for the product
          key: product.key, // Additional identifier (possibly for React rendering)
          name: product.name, // Name of the product
          img: product.img, // Image URL of the product
          quantity: product.quantity, // Quantity of the product ordered
          orderID: generateOrderID(), // Generate a unique order ID
          customerID: user.uid, // User ID of the customer
          sellerID: product.sellerID, // ID of the seller for this product
          orderDate: formatDate(new Date()), // Current date formatted for order
        };
        addNewOrder(orderedProduct); // Call function to add this order to the backend
      });
      setCart([]); // Clear the cart after placing orders
      showToast(toasts, setToasts, "success", "Orders placed successfully"); // Show success message
    } else {
      navigate("/login"); // Redirect to login page if user is not logged in
      showToast(
        toasts,
        setToasts,
        "error",
        "Login Required",
        "Please sign in to your account before proceeding to checkout." // Show error message for login requirement
      );
    }
  };

  return (
    <aside className="cart">
      <h5>
        <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        Cart Summary
      </h5>
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
          console.log(cart);
          handleAddNewOrder();
        }}
      >
        Proceed to Checkout
      </button>
    </aside>
  );
};

export default Cart;
