// ** React related imports **
import React, { useContext, useState } from "react"; // Import React and useState hook for component creation and state management

// ** Font Awesome related imports **
import {
  faCircleExclamation,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons"; // Import exclamation icon for error/warning display
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component for rendering icons

// ** Utility function imports **
import { AppDataContext } from "../../App";
import { handleInputChange, validateForm } from "../../functions/validateForm"; // Import form validation and input handling functions
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage";
/**
 * ShipmentForm Component
 *
 * This component renders a form for capturing shipment information.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.setShipmentInfo - A function to update the shipment information in the parent component.
 *                                           This function is called with the new shipment data when the form is submitted.
 *
 * @returns {JSX.Element} A form for entering shipment details
 */
const ShipmentForm = ({ setShipmentInfo }) => {
  const { cart } = useContext(AppDataContext);
  const [shipmentFormInfo, setShipmentFormInfo] = useState(); // Initialize state for shipment form information using useState hook. This will store and manage the form data as it's being entered by the user.
  const handleFormSubmit = () => {
    /*
     Description: This function handles the form submission process.

     Task list:
     • Validate the form data
     • If valid, update the shipment information
     */

    if (validateForm()) {
      // Check if the form data is valid
      setShipmentInfo(shipmentFormInfo); // Update the shipment information with the current form data
    }
  };
  const handleInputValueChange = (e) => {
    /*
     Description: This function handles changes in input values for the shipment form.
     
     Task list:
     • Call the handleInputChange function to perform any necessary validations
     • Extract the name and value from the event target
     • Update the shipmentFormInfo state with the new value
     */

    handleInputChange(e); // Call the imported handleInputChange function to perform any necessary validations
    const { name, value } = e.target; // Destructure the name and value from the event target
    setShipmentFormInfo({ ...shipmentFormInfo, [name]: value }); // Update the shipmentFormInfo state, spreading the existing state and updating the changed field
  };
  return (
    <div className="form_container">
      {cart.length > 0 ? (
        <>
          <h4>Shipping Information</h4>
          <form id="shipment">
            <fieldset>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter full name"
                onChange={(e) => handleInputValueChange(e)}
              />
              <label htmlFor="name">Full name</label>
            </fieldset>
            <fieldset>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter phone number"
                onChange={(e) => handleInputValueChange(e)}
              />
              <label htmlFor="phone">Phone Number</label>
            </fieldset>
            <fieldset>
              <input
                type="text"
                name="street-address"
                id="street-address"
                placeholder="e.g. A10, Mark Valley Road"
                onChange={(e) => handleInputValueChange(e)}
              />
              <label htmlFor="street-address">Street Address</label>
            </fieldset>
            <div className="row">
              <div className="col-4">
                <fieldset>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    onChange={(e) => handleInputValueChange(e)}
                  />
                  <label htmlFor="city">City</label>
                </fieldset>
              </div>
              <div className="col-4">
                <fieldset>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter state"
                    onChange={(e) => handleInputValueChange(e)}
                  />
                  <label htmlFor="state">State</label>
                </fieldset>
              </div>
              <div className="col-4">
                <fieldset>
                  <input
                    type="number"
                    name="zip"
                    id="zip"
                    placeholder="Enter ZIP code"
                    onChange={(e) => handleInputValueChange(e)}
                  />
                  <label htmlFor="zip">ZIP Code</label>
                </fieldset>
              </div>
            </div>
          </form>
          <div className="message" id="error-message">
            <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
            <p>Please fill in all required fields before submitting.</p>
          </div>
          <button
            className="continue-button"
            onClick={() => handleFormSubmit()}
          >
            Continue to payment
          </button>
        </>
      ) : (
        <NotFoundErrorMessage
          errorMessage={"Your cart is empty"} // Display main error message
          remarks={
            "Please add items to your cart before proceeding to checkout"
          } // Show encouraging message to user
        >
          {/* Add sad face icon to emphasize empty cart state */}
          <FontAwesomeIcon className="icon" icon={faFaceFrown} />
        </NotFoundErrorMessage>
      )}
    </div>
  );
};

export default ShipmentForm;
