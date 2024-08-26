// ** React related imports **
import React, { useContext } from "react"; // Import React and useContext hook for using React context

// ** Utility functions imports **
import { showToast } from "../../functions/showToast"; // Import showToast function to display notifications
import { deleteProduct } from "../ProductRecordRow/ProductRecordRow"; // Import deleteProduct function to handle product deletion

// ** Context imports **
import { AppDataContext } from "../../App"; // Import AppDataContext to access shared application data

// Function to open the modal

export function openModal() {
  /*
    Opens the modal overlay and disables scrolling on the body. This function sets the modal's display to "flex" and freezes the page scroll.
    
   Task list:
   • Get the modal overlay element by ID
   • Set the modal's display style to "flex"
   • Disable scrolling on the body by setting overflow to "hidden"
   */

  // Get the modal overlay element from the DOM using its ID
  const modalOverlay = document.getElementById("modalOverlay");

  // Set the display style of the modal overlay to "flex" to make it visible
  modalOverlay.style.display = "flex";

  // Disable scrolling on the body by setting overflow to "hidden"
  // This prevents the user from scrolling the background content while the modal is open
  document.body.style.overflow = "hidden"; // Freeze scrolling
}

// Function to close the modal
function closeModal() {
  /*
    Closes the modal overlay and enables scrolling on the body. This function sets the modal's display to "none" and restores scrolling on the body.

   Task list:
   • Get the modal overlay element by ID
   • Set the modal's display style to "none"
   • Enable scrolling on the body by setting overflow to "auto"
   */

  // Get the modal overlay element from the DOM using its ID
  const modalOverlay = document.getElementById("modalOverlay");

  // Hide the modal overlay by setting its display style to "none"
  modalOverlay.style.display = "none";

  // Re-enable vertical scrolling on the body element
  document.body.style.overflow = "auto";

  // Keep horizontal scrolling disabled to prevent unwanted side-scrolling
  document.body.style.overflowX = "hidden";
}

// Define the ModalOverlay component
const ModalOverlay = () => {
  // Destructure values from AppDataContext using useContext hook
  const { toasts, setToasts, toBeDeletedProductId } =
    useContext(AppDataContext);

  // Function to handle product deletion
  const handleDeleteProduct = async () => {
    /*
      This function handles the deletion of a product. It attempts to delete the product using the deleteProduct function,
      logs the result, shows appropriate toast messages for success or failure, and closes the modal afterwards.
  
      Task list:
      • Log the ID of the product to be deleted
      • Attempt to delete the product using the deleteProduct function
      • Log the result of the deletion
      • Show a success toast message if deletion is successful
      • Show an error toast message if deletion fails
      • Close the modal after the operation (whether successful or not)
    */

    // Log the ID of the product to be deleted
    console.log("Deleting Product- ID:", toBeDeletedProductId);
    try {
      // Attempt to delete the product using the deleteProduct function
      const result = await deleteProduct(toBeDeletedProductId);
      // Log the result of the deletion
      console.log(result);
      // Show a success toast message
      showToast(
        toasts,
        setToasts,
        "success",
        "Product deleted successfully !",
        "",
        2000
      );
      // Close the modal after successful deletion
      closeModal();
    } catch (error) {
      // If an error occurs during deletion, show an error toast message
      showToast(
        toasts,
        setToasts,
        "error",
        "Failed to delete product",
        "",
        2000
      );
      // Close the modal even if deletion fails
      closeModal();
    }
  };

  // Return the JSX for the ModalOverlay component
  return (
    // Main container for the modal overlay
    <div id="modalOverlay" className="overlay">
      {/* Container for the confirmation dialog */}
      <div className="confirm-delete-modal">
        {/* Confirmation message */}
        <p>Are you sure you want to delete this product?</p>
        {/* Container for the action buttons */}
        <div className="button-group">
          {/* Confirm delete button */}
          <button
            className="delete-button"
            onClick={() => handleDeleteProduct()}
          >
            Confirm
          </button>
          {/* Cancel button */}
          <button className="neutral-button" onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;
