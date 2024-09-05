// ** React related imports **
import React, { useContext, useEffect, useState } from "react"; // Core React library for building UI components

// ** Stripe related imports **
import { Elements } from "@stripe/react-stripe-js"; // Stripe Elements component for wrapping payment form
import { loadStripe } from "@stripe/stripe-js"; // Function to load Stripe.js and create a Stripe instance

// ** Custom components and constants **
import { AppDataContext, BACKEND_URL } from "../../App"; // Backend URL constant for API calls
import CheckoutForm from "../CheckoutForm/CheckoutForm"; // Custom checkout form component
import Loader from "../Loader/Loader"; // Loading indicator component

const CheckoutFormContainer = ({ setIsPaymentSuccess, shipmentInfo }) => {
  const { totalCartPrice } = useContext(AppDataContext); // Extract totalCartPrice from AppDataContext to use in checkout calculations

  // Initialize Stripe with the public key
  const stripePromise = loadStripe(
    "pk_test_51Pt7CtDEjgP3TYz3Uz8PrmThv3EDf5mT0w6hZOtF38nBKm8N1ENDUgARGHoavdDuCwHftFaowc5XMrYKEmqDoW0700rYCppdnt"
  );

  // State to store the client secret for Stripe payment
  const [clientSecret, setClientSecret] = useState("");

  // Define the appearance options for the Stripe Elements
  const appearance = {
    theme: "stripe", // Use Stripe's default theme

    // Customize the appearance with specific variables
    variables: {
      colorPrimary: "#ff8500", // Set primary color to orange
      colorBackground: "#ffffff", // Set background color to white
      colorText: "#141b25", // Set text color to dark blue
      colorDanger: "#E13939", // Set danger color to red
      fontFamily: "Athiti, sans-serif", // Set custom font family
      spacingUnit: "4px", // Set spacing unit
      borderRadius: "4px", // Set border radius
      colorSuccess: "#2F9E44", // Set success color to green
      fontWeightMedium: "700", // Set medium font weight to bold
      // Additional variables can be added here
    },
  };

  // Effect hook to fetch the client secret when the component mounts
  useEffect(() => {
    // Make a POST request to create a payment intent
    fetch(`${BACKEND_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseInt(totalCartPrice) * 100, // Convert totalCartPrice to cents for Stripe (Stripe expects amount in smallest currency unit)
      }),
    })
      .then((res) => res.json()) // Parse the JSON response
      .then((data) => setClientSecret(data.clientSecret)); // Set the client secret in state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount
  return (
    <div className="form_container">
      {/* Heading for the payment information section */}
      <h5>Payment Information</h5>
      {/* Conditional rendering based on the availability of clientSecret */}
      {clientSecret ? (
        // Render Stripe Elements when clientSecret is available
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          {/* Render the CheckoutForm component with necessary props */}
          <CheckoutForm
            setIsPaymentSuccess={setIsPaymentSuccess}
            shipmentInfo={shipmentInfo}
          />
        </Elements>
      ) : (
        // Display a loading indicator when clientSecret is not yet available
        <div className="loader-container bordered-loader-container">
          {/* Render the Loader component to indicate loading state */}
          <Loader />
          {/* Display a message to inform the user to wait */}
          <p>Please wait a while...</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutFormContainer;
