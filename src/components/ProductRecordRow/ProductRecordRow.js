// ** React related imports **
import React, { useContext } from "react"; // Import React and useContext hook for component creation and context usage

// ** Font Awesome related imports **
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import icons for edit and delete actions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component for rendering Font Awesome icons

// ** Utility function imports **
import { scrollToTop } from "../../functions/scrollToTop"; // Import function to scroll page to top after certain actions
import { openModal } from "../ModalOverlay/ModalOverlay"; // Import function to open modal overlay for confirmations or forms

// ** Context and constant imports **
import { AppDataContext, BACKEND_URL } from "../../App"; // Import context for global state management and backend URL constant

// Function to delete a product from the server
export const deleteProduct = async (productId) => {
  /*
   Description: This function sends a DELETE request to the server to remove a product with the given ID.
  
   Task List:
   • Send a DELETE request to the server
   • Handle the server response
   • Parse and return the result
   • Handle and log any errors
   */

  try {
    // Construct the DELETE request URL using the BACKEND_URL and productId
    const response = await fetch(
      `${BACKEND_URL}/products/delete/${productId}`,
      {
        method: "DELETE", // Set the HTTP method to DELETE
        headers: {
          "Content-Type": "application/json", // Set the content type header
        },
      }
    );

    // Check if the server response is not successful (status code not in 200-299 range)
    if (!response.ok) {
      throw new Error("Failed to delete product"); // Throw an error if the response is not ok
    }

    const result = await response.json(); // Parse the JSON response from the server
    console.log(result); // Log the parsed result to the console for debugging
    return result; // Return the parsed result to the caller
  } catch (error) {
    console.error("Error deleting product:", error); // Log any errors that occur during the process
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Component for rendering a single product record row
/**
 * Component for rendering a single product record row in a table or list.
 *
 * @param {Object} productDetails - Contains all the details of a single product.
 * @param {Function} setProduct - Function to update the selected product in the parent component's state.
 * @param {Function} setFeatures - Function to update the features of the selected product in the parent component's state.
 * @param {Function} setUpdateProduct - Function to toggle the update product mode in the parent component.
 *
 * @returns {JSX.Element} A table row or list item representing a single product record.
 */
const ProductRecordRow = ({
  productDetails,
  setProduct,
  setFeatures,
  setUpdateProduct,
}) => {
  // Destructure product details from the productDetails prop
  const { _id, img, name, price, star, stock } = productDetails;

  // Access setToBeDeletedProductId function from AppDataContext using useContext hook
  // This function will be used to set the ID of the product to be deleted
  const { setToBeDeletedProductId } = useContext(AppDataContext);

  // Function to handle delete button click
  const handleDeleteButtonClick = () => {
    /*
     Description: This function is triggered when the delete button is clicked for a product.
     It sets up the deletion process by storing the product ID and opening a confirmation modal.

     Task list:
     • Store the ID of the product to be deleted
     • Open a confirmation modal to prevent accidental deletions
     */

    // Store the ID of the product to be deleted in the global state
    setToBeDeletedProductId(_id);

    // Open the confirmation modal to ask for user confirmation before deletion
    openModal();
  };

  // Render the product record row
  return (
    <tr>
      <td>
        <div className="product-name-image">
          {/* Display product image */}
          <img src={img} alt={name} />
          {/* Display product name */}
          <p>{name}</p>
        </div>
      </td>
      {/* Display product price */}
      <td className="price">$ {price}</td>
      {/* Display product rating */}
      <td>{star} / 5</td>
      {/* Display product stock */}
      <td>{stock}</td>
      <td>
        <div className="actions">
          {/* Edit Product Button */}
          <button
            className="add-button"
            onClick={() => {
              // Set the current product for editing
              setProduct(productDetails);
              // Set the features of the current product
              setFeatures(productDetails.features);
              // Enable update mode
              setUpdateProduct(true);
              // Scroll to the top of the page
              scrollToTop();
            }}
          >
            {/* Display edit icon */}
            <FontAwesomeIcon icon={faPen} />
          </button>
          {/* Delete Product Button */}
          <button
            className="delete-button"
            onClick={() => handleDeleteButtonClick()}
          >
            {/* Display delete icon */}
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Export the ProductRecordRow component as the default export
export default ProductRecordRow;
