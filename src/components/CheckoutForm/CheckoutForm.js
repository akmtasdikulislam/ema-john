// ** Stripe related imports **
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  PaymentElement, // Used to render the Stripe Payment Element in the form
  useElements, // Hook to access Stripe Elements instance
  useStripe, // Hook to access the Stripe object
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../../App";
import { handleAddNewOrder } from "../../functions/handleAddNewOrder";
import Loader from "../Loader/Loader";
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage";

const CheckoutForm = ({ setIsPaymentSuccess, shipmentInfo }) => {
  const { cart, setCart, user } = useContext(AppDataContext); // Retrieve cart, setCart, and user from AppDataContext using useContext hook
  const [isOrderPlaced, setIsOrderPlaced] = useState(null); // State to track if the order has been placed successfully
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the form has been submitted
  const [isFailedToPlaceOrder, setIsFailedToPlaceOrder] = useState(null); // State to track if there was an error while placing the order

  const stripe = useStripe(); // Initialize the Stripe instance for payment processing
  const elements = useElements(); // Access the Stripe Elements for form inputs and validation

  const handlePaymentCheckout = async (event) => {
    /*
   Description: Handles the payment checkout process when the form is submitted.
   
   Task List:
   - Prevent default form submission behavior
   - Set submission state
   - Check for stripe and elements availability
   - Confirm payment using Stripe
   - Handle payment result (success or error)
   - Add new order if payment is successful
   */

    event.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitted(true); // Update the submission state to indicate that the form has been submitted, enabling UI updates and preventing multiple submissions
    if (!stripe || !elements) {
      return; // Exit if Stripe or Elements are not available
    }
    // Attempt to confirm the payment using Stripe's confirmPayment method
    const result = await stripe.confirmPayment({
      elements, // Pass the Elements instance to handle form inputs
      redirect: "if_required", // Only redirect if necessary, allowing for custom error handling
    });

    if (result.error) {
      // If there's an error in the payment process, log the error message
      console.log(result.error.message); // Helps with debugging and potentially displaying to the user
    } else {
      // If payment is successful, log the result for confirmation
      console.log("Payment successful:", result); // Useful for debugging and tracking successful payments
      // Process the order by adding it to the system and updating relevant states
      handleAddNewOrder(cart, setCart, user, shipmentInfo, setIsOrderPlaced); // Finalizes the transaction in the application
    }
  };

  useEffect(() => {
    // Check if the order has been successfully placed
    if (isOrderPlaced === true) {
      // Set payment success state to true, indicating successful transaction
      setIsPaymentSuccess(true);
      // Reset submission state to allow for potential future submissions
      setIsSubmitted(false);
    } else if (isOrderPlaced === false) {
      // Set failed order state to true if order placement was unsuccessful
      setIsFailedToPlaceOrder(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrderPlaced]); // Effect runs when isOrderPlaced state changes
  return (
    <>
      {isOrderPlaced === null && (
        // Render the form only if the order hasn't been placed yet
        <form onSubmit={handlePaymentCheckout}>
          {/* Form component that handles the payment checkout process */}
          <PaymentElement />
          {/* Stripe's PaymentElement component for secure payment information collection */}

          {isSubmitted ? (
            // Conditional rendering: show a disabled button when payment is being processed
            <button className="disabled-button">
              {/* Disabled button to prevent multiple submissions during processing */}
              <Loader /> Processing Payment
              {/* Display a loading indicator and "Processing Payment" text to inform the user */}
            </button>
          ) : (
            // Conditional rendering: show the payment confirmation button when not submitted
            <button
              disabled={!stripe}
              // Disable the button if Stripe is not initialized to prevent premature submissions
              className={stripe ? "" : "disabled-button"}
              // Apply appropriate styling based on Stripe's initialization status
            >
              Confirm Payment
            </button>
            // Button text prompting the user to confirm and complete the payment
          )}
        </form>
      )}
      {isFailedToPlaceOrder && (
        // Render error message component when order placement fails
        <NotFoundErrorMessage
          // Pass error message to be displayed
          errorMessage={"Ops! Something went wrong"}
          // Provide dynamic content for the error message, in this case a retry button
          dynamicContent={
            <button
              // Apply 'try-again' CSS class for styling
              className="try-again"
              // Attach click event handler to retry order placement
              onClick={() =>
                handleAddNewOrder(cart, setCart, user, setIsOrderPlaced)
              }
            >
              Try Again
            </button>
          }
        >
          {/* Include a sad face icon to visually represent the error state */}
          <FontAwesomeIcon className="icon" icon={faFaceSadTear} />
        </NotFoundErrorMessage>
      )}
    </>
  );
};

export default CheckoutForm;
