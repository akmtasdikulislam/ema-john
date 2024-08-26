/** React related imports */
import React, { useContext, useEffect, useState } from "react"; // Core React imports for component creation and state management

/** FontAwesome related imports */
import {
  faBoxOpen, // Icon for representing a product
  faCircleExclamation, // Icon for displaying warnings or errors
  faPlus, // Icon for adding new items
  faTrashAlt, // Icon for delete functionality
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Component to render FontAwesome icons

/** Context and configuration imports */
import { AppDataContext, BACKEND_URL } from "../../App"; // Global context and backend URL for API calls

/** Utility function imports */
import { generateProductKey } from "../../functions/generateProductKey"; // Function to create unique product keys
import { generateStarCount } from "../../functions/generateStarCount"; // Function to generate random star ratings
import { getDecimalPart } from "../../functions/getDecimalPart"; // Function to extract decimal part from price
import { showToast } from "../../functions/showToast"; // Function to display toast notifications

/** Component imports */
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage"; // Component to display when a product is not found

/**
 * ProductCRUDForm Component
 *
 * This component handles the creation, reading, updating, and deletion (CRUD) operations for products.
 *
 * @param {Object[]} features - An array of product features to be displayed and managed.
 * @param {Object} product - The current product being edited or created.
 * @param {Function} setFeatures - Function to update the features state.
 * @param {Function} setProduct - Function to update the product state.
 * @param {Function} setUpdateProduct - Function to toggle the update product mode.
 * @param {boolean} updateProduct - Flag indicating whether the form is in update mode.
 */
const ProductCRUDForm = ({
  features,
  product,
  setFeatures,
  setProduct,
  setUpdateProduct,
  updateProduct,
}) => {
  // Destructure values from AppDataContext using useContext hook
  // toasts: Array of current toast notifications
  // setToasts: Function to update toast notifications
  // user: Current user object containing user information
  const { toasts, setToasts, user } = useContext(AppDataContext);

  //====================//
  //  STATE AND EFFECTS //
  //====================//

  // State to store updated product data
  // updatedProductData: Object containing modified product information
  // setUpdatedProductData: Function to update the updatedProductData state
  const [updatedProductData, setUpdatedProductData] = useState({});

  // Effect hook to update the product data when features change
  useEffect(() => {
    // Check if we're in update mode
    if (updateProduct) {
      // Update the product data with the new features
      // This ensures that any changes to features are reflected in the product data
      setUpdatedProductData({ ...updatedProductData, features: features });
    }
    // Disable exhaustive-deps rule to prevent unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features]); // This effect runs whenever the features array changes

  //====================//
  //  HELPER FUNCTIONS  //
  //====================//

  const newProduct = {
    ...product, // Spread the existing product properties
    key: generateProductKey(), // Generate a unique key for the product
    priceFraction: Number(getDecimalPart(product.price)), // Extract and convert the decimal part of the price to a number
    seller: user.displayName, // Set the seller name from the current user's display name
    sellerID: user.uid, // Set the seller ID from the current user's unique identifier
    starCount: generateStarCount(), // Generate a random star count for the product
    wholePrice: product.price ? parseInt(product.price) : "", // Extract the whole number part of the price, or set to empty string if no price
    img: product.img, // Set the product image URL
    features, // Include the product features array
  };

  const resetForm = () => {
    /*
     * Description: This function resets the form by clearing all input fields,
     * removing error states, and resetting related state variables.
     *
     * Task list:
     * - Reset product state to empty values
     * - Clear form fields and remove error states
     * - Hide error message if displayed
     * - Reset features state
     * - Set update product mode to false
     */

    // Reset all product properties to empty strings
    setProduct({
      category: "",
      features: "",
      img: "",
      key: "",
      name: "",
      price: "",
      priceFraction: "",
      seller: "",
      shipping: "",
      star: "",
      starCount: "",
      stock: "",
      wholePrice: "",
    });

    // Select all input and select elements in the form
    const formFields = [...document.querySelectorAll(["input", "select"])];

    // Get the error message element by its ID
    const errorMessage = document.getElementById("error-message");

    // Remove error class from parent elements of empty form fields
    formFields
      .filter((formField) => formField.value === "") // Filter out fields with empty values
      // eslint-disable-next-line array-callback-return
      .map((formField) => {
        // Remove 'error' class from parent element if present
        if (formField.parentNode.classList.contains("error")) {
          formField.parentNode.classList.remove("error");
        }
      });

    // Hide error message if it's currently displayed
    // eslint-disable-next-line eqeqeq
    if (errorMessage.style.display === "flex") {
      errorMessage.style.display = "none";
    }

    // Reset features state to an empty array
    setFeatures([]);

    // Set update product mode to false
    setUpdateProduct(false);
  };

  //====================//
  //  FORM VALIDATION   //
  //====================//

  const validateFormFields = () => {
    /*
     * Description: This function validates form fields, displays error messages, and handles UI updates.
     *
     * Task List:
     * - Collect all form fields (input and select elements)
     * - Remove existing error classes from form fields
     * - Identify empty form fields
     * - Add error classes to empty form fields
     * - Display or update error message based on validation results
     * - Return validation status (true if all fields are filled, false otherwise)
     */

    // Collect all form fields (input and select elements) into an array
    const formFields = [...document.querySelectorAll(["input", "select"])];

    // Remove existing error classes from all form fields
    formFields.forEach((formField) => {
      // Check if the parent element has the "error" class
      if (formField.parentNode.classList.contains("error")) {
        // Remove the "error" class from the parent element
        formField.parentNode.classList.remove("error");
      }
    });

    // Get the error message element by its id
    const errorMessage = document.getElementById("error-message");

    // Identify empty form fields and add error classes
    const emptyFormFields = formFields
      .filter((formField) => formField.value === "") // Filter out fields with empty values
      // Add "error" class to parent elements of empty fields
      // eslint-disable-next-line array-callback-return
      .map((formField) => {
        formField.parentNode.classList.add("error");
      });

    // Check if there are any empty form fields
    if (emptyFormFields.length > 0) {
      // Handle error message display and animation
      if (errorMessage.style.display === "flex") {
        // Add "shake" animation if error message is already displayed
        errorMessage.classList.add("shake");
        // Remove "shake" class after animation ends
        errorMessage.addEventListener("animationend", () => {
          errorMessage.classList.remove("shake");
        });
      } else {
        // Display error message if not already visible
        errorMessage.style.display = "flex";
      }
      return false; // Validation failed
    } else {
      // Hide error message if all fields are filled
      errorMessage.style.display = "none";
      console.log({ newProduct }); // Log the new product data
      return true; // Validation passed
    }
  };

  //====================//
  //  API INTERACTIONS  //
  //====================//

  const addNewProduct = async (productData) => {
    /*
     * Description: This function adds a new product to the backend database.
     *
     * Task List:
     * • Validate form fields
     * • Send POST request to add product
     * • Handle response and show appropriate toast messages
     * • Reset form on successful addition
     * • Handle and log errors
     */

    if (validateFormFields) {
      // Check if all form fields are valid
      try {
        const response = await fetch(`${BACKEND_URL}/products/add`, {
          // Send POST request to add product
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData), // Convert product data to JSON string
        });

        if (!response.ok) {
          // Check if the response is not successful
          showToast(
            toasts,
            setToasts,
            "error",
            "Failed to add product",
            "",
            2000
          ); // Show error toast if product addition fails
        }

        const result = await response.json(); // Parse the response JSON
        console.log("Product added successfully:", result); // Log success message with result
        showToast(
          toasts,
          setToasts,
          "success",
          "Product added successfully !",
          "",
          2000
        ); // Show success toast message
        resetForm(); // Reset the form after successful addition
        return result; // Return the result of the operation
      } catch (error) {
        console.error("Error adding product:", error); // Log any errors that occur
        showToast(toasts, setToasts, "error", "Error adding product", error); // Show error toast with the caught error
      }
    }
  };

  const updateThisProduct = async (productId, updatedProductData) => {
    /**
     * Description: This function updates an existing product in the backend database.
     *
     * Task List:
     * • Send PUT request to update product
     * • Handle response and check for errors
     * • Parse and return the updated product data
     * • Handle and log any errors that occur
     */
    try {
      const response = await fetch(
        `${BACKEND_URL}/products/update/${productId}`, // Construct the URL for updating the product
        {
          method: "PUT", // Use PUT method for updating
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(updatedProductData), // Convert updated product data to JSON string
        }
      );

      if (!response.ok) {
        // Check if the response is not successful
        throw new Error("Failed to update product"); // Throw an error if update fails
      }

      const result = await response.json(); // Parse the response JSON
      console.log("Product updated successfully:", result); // Log success message with result
      return result; // Return the updated product data
    } catch (error) {
      console.error("Error updating product:", error); // Log any errors that occur
      throw error; // Re-throw the error for handling in the calling function
    }
  };

  //====================//
  //   EVENT HANDLERS   //
  //====================//

  const handleInputChange = (event) => {
    /**
     * Description: This function handles changes in input fields, updates the product state,
     * validates the star rating, and manages error classes.
     *
     * Task List:
     * • Remove error class if present
     * • Validate star rating input
     * • Update product state with new input values
     * • Update updatedProductData if in edit mode
     */

    // Get the input element from the event
    const input = event.target;
    // Get the parent element of the input
    const parentElement = input.parentNode;

    // Check if the parent element has the "error" class
    if (parentElement.classList.contains("error")) {
      // Remove the "error" class from the parent element
      parentElement.classList.remove("error");
    }

    // Check if the input element's name is "star"
    if (input.name === "star") {
      // Parse the input value as an integer
      const ratingValue = parseInt(input.value);
      // Check if the rating value is not a number or is less than 0 or greater than 5
      if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
        // Check if the key pressed is "Backspace" or "Delete"
        if (event.key === "Backspace" || event.key === "Delete") {
          // Allow backspacing the value when the alert is shown and return from the function
          return;
        }
        // Show an alert message asking the user to enter a rating between 0 and 5
        alert("Please enter a rating between 0 and 5");
        // Clear the input value
        input.value = "";
        // Return from the function
        return;
      }
    }

    // Update the product state with the new value of the input element
    if (input.type === "number" || input.name === "star") {
      // Convert input value to number for numeric fields
      setProduct({ ...product, [input.name]: Number(input.value) });
    } else {
      // Keep input value as string for non-numeric fields
      setProduct({ ...product, [input.name]: input.value });
    }

    // Check if we're in update mode
    if (updateProduct) {
      if (input.type === "number" || input.name === "star") {
        // Update updatedProductData with numeric value
        setUpdatedProductData({
          ...updatedProductData,
          [input.name]: Number(input.value),
        });
      } else {
        // Update updatedProductData with string value
        setUpdatedProductData({
          ...updatedProductData,
          [input.name]: input.value,
        });
      }
    }
  };

  const handleAddNewFeature = () => {
    /*
     * Description: This function adds a new feature to the features array.
     * Task list:
     * • Create a new feature object with empty description and value
     * • Add the new feature object to the existing features array
     * • Update the state with the new features array
     */

    // Create a new feature object and add it to the existing features array
    setFeatures([...features, { description: "", value: "" }]);
  };

  const updateFeatureField = (event, featureIndex) => {
    /*
     * Description: This function updates a specific field of a feature in the features array.
     * Task list:
     * • Extract the field name and new value from the event
     * • Create a copy of the current features array
     * • Update the specific field of the feature at the given index
     * • Update the state with the new features array
     */

    // Extract the field name and new value from the input that triggered the event
    const { name: fieldName, value: newValue } = event.target;

    // Create a copy of the current features array to avoid direct state mutation
    const updatedFeatures = [...features];

    // Update the specific field of the feature at the given index
    updatedFeatures[featureIndex][fieldName] = newValue;

    // Update the state with the new features array, triggering a re-render
    setFeatures(updatedFeatures);
  };

  const handleDeleteFeature = (index) => {
    /*
     * Description: This function removes a feature from the features array at the specified index.
     * Task list:
     * • Create a copy of the current features array
     * • Remove the feature at the specified index
     * • Update the state with the new features array
     */

    // Create a copy of the current features array to avoid direct state mutation
    const newArray = [...features];

    // Remove the feature at the specified index using splice
    newArray.splice(index, 1);

    // Update the state with the new features array, triggering a re-render
    setFeatures(newArray);
  };

  const handleUpdateProduct = () => {
    /*
     * Description: This function handles the process of updating a product.
     * Task list:
     * • Call the updateThisProduct function with product ID and updated data
     * • Handle successful update
     * • Handle update error
     * • Reset the update product state
     */

    // Call the updateThisProduct function with the product ID and updated data
    updateThisProduct(product._id, updatedProductData)
      .then((result) => {
        // Handle successful update by logging the result
        console.log("Update successful:", result);
      })
      .catch((error) => {
        // Handle error by logging the error message
        console.error("Update failed:", error);
      });

    // Reset the update product state to false after the update process
    setUpdateProduct(false);
  };

  return (
    <>
      {/* Add/Update Product Form */}
      <form className="row">
        {/* Other Product Input Field Column */}
        <div className="col-6 pe-4">
          {/* Product Name */}
          <fieldset>
            <input
              type="text"
              name="name"
              id="product-name"
              placeholder="Enter product name"
              value={product.name && product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="product-name">Product Name</label>
          </fieldset>
          {/* Product Category */}
          <fieldset>
            <select
              name="category"
              id="product-category"
              value={product.category && product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">- Select Product Category -</option>
              <option value="android">Android</option>
              <option value="camera">Camera</option>
              <option value="laptop">Laptop</option>
            </select>
            <label htmlFor="product-category">Category</label>
          </fieldset>
          {/* Product Photo Url */}
          <fieldset>
            <input
              type="text"
              name="img"
              id="product-photo-url"
              placeholder="Enter product photo url"
              value={product.img && product.img}
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="product-photo-url">Product Photo Url</label>
          </fieldset>
          {/* New Row for showing Product Price and Product Shipping Cost together */}
          <div className="row">
            <div className="col-6">
              {/* Product Price */}
              <fieldset>
                <input
                  type="number"
                  name="price"
                  id="product-price"
                  placeholder="Enter product price"
                  value={product.price && product.price}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="price">
                  Price <span className="small-text">(in USD)</span>
                </label>
              </fieldset>
            </div>
            <div className="col-6">
              {/* Product Shipping Cost */}
              <fieldset>
                <input
                  type="number"
                  name="shipping"
                  id="shipping-cost"
                  placeholder="Enter product shipping cost"
                  value={product.shipping && product.shipping}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="shipping-cost">
                  Shipping Costs <span className="small-text">(in USD)</span>
                </label>
              </fieldset>
            </div>
          </div>
          {/* New Row for showing Product Stock and Product Rating together */}
          <div className="row">
            <div className="col-6">
              {/* Product Stock */}
              <fieldset>
                <input
                  type="number"
                  name="stock"
                  id="product-stock"
                  placeholder="Enter product stock amount"
                  value={product.stock && product.stock}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="product-stock">Product Stock</label>
              </fieldset>
            </div>
            <div className="col-6">
              {/* Product Rating */}
              <fieldset>
                <input
                  type="number"
                  name="star"
                  id="product-rating"
                  placeholder="Enter product rating"
                  max={5}
                  maxLength={1}
                  value={product.star && product.star}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="product-rating">
                  Product Rating{" "}
                  {/* Additional Indications for rating input field */}
                  <span className="small-text">(Between 0 to 5)</span>
                </label>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Product Feature Input Field Column */}
        <div className="col-6 ps-4">
          <div className="d-flex flex-row align-items-center justify-content-between w-100 product-feature">
            <h5>Product Features</h5>
            {/* Add New Feature Button (on click add a new input field to add a new feature) */}
            <button
              className="add-button"
              onClick={(e) => {
                handleAddNewFeature();
                e.preventDefault();
                console.log({ features });
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {/* Features Input Fields */}
          <div id="feature-container">
            {features.length > 0 ? (
              features.map((feature, index) => (
                <div className="feature" key={index}>
                  <fieldset>
                    <input
                      type="text"
                      name="description"
                      id="feature-name"
                      placeholder="Enter product feature name"
                      value={
                        feature.description.length > 0
                          ? feature.description
                          : ""
                      }
                      onChange={(event) => updateFeatureField(event, index)}
                    />
                    <label htmlFor="feature-name">Feature Name</label>
                  </fieldset>
                  <fieldset>
                    <input
                      type="text"
                      name="value"
                      id="feature-description"
                      placeholder="Enter product feature description"
                      value={feature.value.length > 0 ? feature.value : ""}
                      onChange={(event) => updateFeatureField(event, index)}
                    />
                    <label htmlFor="feature-description">
                      Feature Description
                    </label>
                  </fieldset>
                  {/* Delete Button (on click delete feature) */}
                  {features.length > 0 && (
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteFeature(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <NotFoundErrorMessage
                errorMessage={"No Features added Yet"}
                remarks={"Click the plus (+) button to add a new feature."}
              >
                <FontAwesomeIcon className="icon" icon={faBoxOpen} />
              </NotFoundErrorMessage>
            )}
          </div>
        </div>
      </form>
      {/* Form Submission button */}
      <div className="message" id="error-message">
        <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
        <p>Please fill in all required fields before submitting.</p>
      </div>
      <div className="button-group">
        {/* Conditional rendering based on whether we're updating an existing product or adding a new one */}
        {updateProduct ? (
          // Button for updating an existing product
          <button onClick={() => handleUpdateProduct()}>Update Product</button>
        ) : (
          // Button for adding a new product
          <button onClick={() => addNewProduct(newProduct)}>
            Add New Product{" "}
            {/* Space character added for formatting purposes */}
          </button>
        )}
        <button className="neutral-button" onClick={() => resetForm()}>
          Reset{" "}
        </button>
      </div>
    </>
  );
};

export default ProductCRUDForm;
