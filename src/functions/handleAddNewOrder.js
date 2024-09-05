// ** URL Configuration **
import { BACKEND_URL } from "../App"; // Import the backend URL for API requests

// ** Utility Functions **
import { formatDate } from "./formatDate"; // Import function to format dates for order processing
import { generateOrderID } from "./generateOrderID"; // Import function to generate unique order IDs

const addNewOrder = async (orderedProducts, setIsOrderPlaced) => {
  /*
  This function handles the process of adding a new order to the backend.
  It sends the order data to the server, processes the response, and updates the order placement status.

  Task List:
  • Prepare and send a POST request to the backend with order data
  • Handle the server response
  • Update the order placement status
  • Handle any errors that occur during the process
  */

  try {
    // Prepare and send a POST request to create a new order in the backend
    const response = await fetch(`${BACKEND_URL}/orders/add`, {
      method: "POST", // Set the HTTP method to POST for creating a new resource
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON for proper data formatting
      },
      body: JSON.stringify(orderedProducts), // Convert the order data to a JSON string for transmission
    });

    // Parse the JSON response received from the server
    const result = await response.json();

    // Log a success message along with the server's response
    console.log("Order added successfully:", result);

    // Update the order placement status to indicate success
    setIsOrderPlaced(true);
  } catch (error) {
    // Handle any errors that occur during the order creation process
    console.error("Error adding order:", error); // Log the error details for debugging

    // Update the order placement status to indicate failure
    setIsOrderPlaced(false);
  }
};

export const handleAddNewOrder = (
  cart,
  setCart,
  user,
  shipmentInfo,
  setIsOrderPlaced
) => {
  /*
  This function processes the cart items to create new orders. It prepares the order data for each product in the cart, generates unique order IDs, and sends the orders to the backend for processing. After successful order placement, it clears the cart.

  Task List:
  • Create an array to store the processed order products
  • Iterate through each product in the cart
  • Prepare order details for each product
  • Generate unique order IDs for each product
  • Add processed products to the order array
  • Send the orders to the backend for processing
  • Clear the cart after successful order placement
  • Update the order placement status
  */

  const toBeOrderedProducts = []; // Initialize an array to store processed order products

  // eslint-disable-next-line array-callback-return
  cart.map((product) => {
    // Iterate through each product in the cart and prepare order details
    let orderedProduct = {
      _id: product._id, // Assign the unique identifier for the product
      key: product.key, // Include additional identifier (possibly for React rendering)
      name: product.name, // Set the name of the product
      img: product.img, // Include the image URL of the product
      quantity: product.quantity, // Set the quantity of the product ordered
      orderID: generateOrderID(), // Generate a unique order ID for this product
      customerID: user.uid, // Assign the user ID of the customer
      sellerID: product.sellerID, // Include the ID of the seller for this product
      orderDate: formatDate(new Date()), // Set the current date formatted for the order
      shipmentInfo, // Include shipment information for the order
    };
    toBeOrderedProducts.push(orderedProduct); // Add the processed product to the order array
  });

  if (cart.length === toBeOrderedProducts.length) {
    // Verify if all cart items have been processed
    addNewOrder(toBeOrderedProducts, setIsOrderPlaced); // Send the orders to the backend for processing
  }

  setCart([]); // Clear the cart after placing orders
};
