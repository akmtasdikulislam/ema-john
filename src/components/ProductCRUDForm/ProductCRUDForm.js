import {
  faBoxOpen,
  faCircleExclamation,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { generateProductKey } from "../../functions/generateProductKey";
import { generateStarCount } from "../../functions/generateStarCount";
import { getDecimalPart } from "../../functions/getDecimalPart";
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage";

const ProductCRUDForm = ({
  features,
  product,
  setFeatures,
  setProduct,
  setUpdateProduct,
  updateProduct,
}) => {
  const handleAddNewFeature = () => {
    setFeatures([...features, { description: "", value: "" }]);
  };

  const handleFeatureChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...features];
    onChangeValue[index][name] = value;
    setFeatures(onChangeValue);
  };

  const handleDeleteFeature = (index) => {
    const newArray = [...features];
    newArray.splice(index, 1);
    setFeatures(newArray);
  };
  // eslint-disable-next-line no-unused-vars
  const newProduct = {
    ...product,
    key: generateProductKey(),
    priceFraction: getDecimalPart(product.price),
    seller: "HP",
    starCount: generateStarCount(),
    wholePrice: product.price ? parseInt(product.price) : "",
    img: product.img,
    features,
  };
  const validateFormFields = () => {
    // Get all form fields (input and select elements) and store them in an array
    const formFields = [...document.querySelectorAll(["input", "select"])];

    // Iterate over each form field
    formFields.forEach((formField) => {
      // Check if the parent element of the form field has the "error" class
      if (formField.parentNode.classList.contains("error")) {
        // If it does, remove the "error" class from the parent element
        formField.parentNode.classList.remove("error");
      }
    });

    // Get the error message element by its id
    const errorMessage = document.getElementById("error-message");

    // Filter out form fields that have empty values
    const emptyFormFields = formFields
      .filter((formField) => formField.value === "")
      // For each empty form field, add the "error" class to its parent element
      // eslint-disable-next-line array-callback-return
      .map((formField) => {
        formField.parentNode.classList.add("error");
      });

    // Check if there are any empty form fields
    if (emptyFormFields.length > 0) {
      // If the error message is already displayed, add the "shake" class to it
      if (errorMessage.style.display === "flex") {
        errorMessage.classList.add("shake");
        // Remove the "shake" class after the animation ends
        errorMessage.addEventListener("animationend", () => {
          errorMessage.classList.remove("shake");
        });
      } else {
        // If the error message is not displayed, display it
        errorMessage.style.display = "flex";
      }
    } else {
      // If all form fields have values, hide the error message
      errorMessage.style.display = "none";
      console.log({ newProduct });
    }
  };
  // Define a function called addNewProduct
  const addNewProduct = () => {
    validateFormFields();
  };

  const handleUpdateProduct = () => {
    console.log(product);
    setUpdateProduct(false);
  };
  // Clearing all form inputs
  const resetForm = () => {
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
    // Get all form fields (input and select elements) and store them in an array
    const formFields = [...document.querySelectorAll(["input", "select"])];

    // Get the error message element by its id
    const errorMessage = document.getElementById("error-message");

    // Filter out form fields that have empty values
    formFields
      .filter((formField) => formField.value === "") // Check if the form field value is empty
      // eslint-disable-next-line array-callback-return
      .map((formField) => {
        // If the parent element of the form field has the "error" class, remove it
        if (formField.parentNode.classList.contains("error")) {
          formField.parentNode.classList.remove("error");
        }
      });

    // Check if the error message is currently displayed
    // eslint-disable-next-line eqeqeq
    if (errorMessage.style.display === "flex") {
      // Hide the error message
      errorMessage.style.display = "none";
    }
    setFeatures([]);
    setUpdateProduct(false);
  };
  const handleInputChange = (event) => {
    // Get the input element from the event
    const input = event.target; // Get the parent element of the input
    const parentElement = input.parentNode; // Check if the parent element has the "error" class

    if (parentElement.classList.contains("error")) {
      // Remove the "error" class from the parent element
      parentElement.classList.remove("error");
    } // Check if the input element's name is "star"

    if (input.name === "star") {
      // Parse the input value as an integer
      const ratingValue = parseInt(input.value); // Check if the rating value is not a number or is less than 0 or greater than 5
      if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
        // Check if the key pressed is "Backspace" or "Delete"
        if (event.key === "Backspace" || event.key === "Delete") {
          // Allow backspacing the value when the alert is shown and return from the function
          return;
        } // Show an alert message asking the user to enter a rating between 0 and 5
        alert("Please enter a rating between 0 and 5"); // Clear the input value
        input.value = ""; // Return from the function
        return;
      }
    } // Update the product state with the new value of the input element

    setProduct({ ...product, [input.name]: input.value });
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
                      onChange={(event) => handleFeatureChange(event, index)}
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
                      onChange={(event) => handleFeatureChange(event, index)}
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
                erroMessage={"No Features added Yet"}
                remarks={"Click the plus (+) button to add a new feature."}
              >
                <FontAwesomeIcon className="icon" icon={faBoxOpen} />
              </NotFoundErrorMessage>
            )}
          </div>
        </div>
      </form>
      {/* Form Submition button */}
      <div id="error-message">
        <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
        <p>Please fill in all required fields before submitting.</p>
      </div>
      <div className="button-group">
        {updateProduct ? (
          <button onClick={() => handleUpdateProduct()}>Update Product </button>
        ) : (
          <button onClick={() => addNewProduct()}>Add New Product </button>
        )}
        <button className="neutral-button" onClick={() => resetForm()}>
          Reset{" "}
        </button>
      </div>
    </>
  );
};

export default ProductCRUDForm;
