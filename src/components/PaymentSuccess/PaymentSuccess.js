// ** React related imports **
import React from "react"; // Core React library for creating components

// ** React Router related imports **
import { Link } from "react-router-dom"; // Used for navigation to homepage

// ** Icon related imports **
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"; // Circle check icon for success message
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome component for rendering icons

// ** Utility function imports **

const PaymentSuccess = () => {
  return (
    <div id="payment-success-container">
      <div id="payment-success">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <h2>Payment Successful!</h2>
        <p className="secondary-text">
          Thank you for your payment. Your order is being processed and you will
          receive a confirmation email shortly
        </p>
        <Link to="/">
          <button>Go to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
