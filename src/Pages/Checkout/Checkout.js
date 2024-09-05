/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React related imports **
import React, { useContext, useState } from "react"; // Core React and hooks for component creation and state management

// ** Component imports **
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDataContext } from "../../App";
import CheckoutFormContainer from "../../components/CheckoutFormContainer/CheckoutFormContainer"; // Container component for checkout form
import Header from "../../components/Header/Header"; // Header component for consistent page layout
import Loader from "../../components/Loader/Loader"; // Loader component for displaying loading states
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage"; // NotFoundErrorMessage component for displaying error messages when content is not found
import PaymentSuccess from "../../components/PaymentSuccess/PaymentSuccess"; // Component to display successful payment message
import ShipmentForm from "../../components/ShipmentForm/ShipmentForm"; // Form component for shipment details

// ** Utility function imports **
import { calculateCart } from "../../functions/calculateCart"; // Function to calculate total cart value and apply discounts

const Checkout = () => {
  // State management
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // State to track if payment was successful, initially set to false
  const [shipmentInfo, setShipmentInfo] = useState(null); // State to store shipment information, initially set to null

  // Context and cart calculation
  const { cart, isProductsLoaded } = useContext(AppDataContext);
  // Destructure values from the calculateCart function, which processes the cart data
  const {
    totalItems, // Total number of items in the cart
    grandTotal, // Final total cost including all items and charges
  } = calculateCart(cart); // Call calculateCart function with the current cart state

  return (
    <main id="checkout">
      {/* Render the Header component for consistent page layout */}
      <Header />
      <div className="container">
        {/* Display checkout heading if payment is not successful */}
        {!isPaymentSuccess && <h1>Your Cart is Waiting: Let's Checkout!</h1>}
        {/* Conditional rendering based on product loading status and cart contents */}
        {isProductsLoaded ? ( // Check if products are loaded
          cart.length > 0 ? ( // Check if cart has items
            !shipmentInfo ? ( // Check if shipment info is not available
              // Render ShipmentForm to collect shipping details
              <ShipmentForm setShipmentInfo={setShipmentInfo} />
            ) : !isPaymentSuccess ? ( // Check if payment is not yet successful
              // Render CheckoutFormContainer for payment processing
              <CheckoutFormContainer
                setIsPaymentSuccess={setIsPaymentSuccess} // Prop to update payment status
                shipmentInfo={shipmentInfo} // Pass shipping details to form
              />
            ) : (
              // Render PaymentSuccess component after successful payment
              <PaymentSuccess
                totalItems={totalItems} // Pass total number of items purchased
                grandTotal={grandTotal} // Pass total cost of the order
              />
            )
          ) : (
            // Render NotFoundErrorMessage if cart is empty
            <NotFoundErrorMessage
              errorMessage={"Your cart is empty"} // Display main error message
              remarks={
                "Please add items to your cart before proceeding to checkout"
              } // Show encouraging message to user
            >
              {/* Add sad face icon to emphasize empty cart state */}
              <FontAwesomeIcon className="icon" icon={faFaceFrown} />
            </NotFoundErrorMessage>
          )
        ) : (
          // Show loader while products are being loaded
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
    </main>
  );
};

export default Checkout;
