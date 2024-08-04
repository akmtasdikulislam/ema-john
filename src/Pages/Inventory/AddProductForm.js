import React, { useState } from "react";

const AddProductForm = () => {
  // State to store error messages
  const [errorMessages, setErrorMessages] = useState([]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.target; // Get the form element
    const fields = [
      {
        name: "Product Name",
        id: "product-name",
        value: form["product-name"].value,
      },
      {
        name: "Category",
        id: "product-category",
        value: form["product-category"].value,
      },
      {
        name: "Product Photo Url",
        id: "product-photo-url",
        value: form["product-photo-url"].value,
      },
      {
        name: "Price",
        id: "product-price",
        value: form["product-price"].value,
      },
      {
        name: "Shipping Costs",
        id: "shipping-cost",
        value: form["shipping-cost"].value,
      },
      {
        name: "Product Stock",
        id: "product-stock",
        value: form["product-stock"].value,
      },
      {
        name: "Product Rating",
        id: "product-rating",
        value: form["product-rating"].value,
      },
    ];

    // Check for empty fields
    const emptyFields = fields.filter((field) => !field.value);
    if (emptyFields.length > 0) {
      // Create error messages
      const messages = emptyFields.map((field) => `**${field.name}**`);
      setErrorMessages(messages);

      // Add shake effect to error message
      const errorElement = document.getElementById("error-message");
      if (errorElement) {
        errorElement.classList.remove("shake");
        void errorElement.offsetWidth; // Trigger reflow
        errorElement.classList.add("shake");
      }

      // Add error class to empty fields
      emptyFields.forEach((field) => {
        const inputElement = form.querySelector(`#${field.id}`);
        if (inputElement) {
          const fieldset = inputElement.closest("fieldset");
          if (fieldset) {
            fieldset.classList.add("error");
          }
        }
      });
    } else {
      // Clear error messages if all fields are filled
      setErrorMessages([]);
      // Proceed with form submission logic
      console.log("Form submitted successfully");
    }
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <fieldset>
        <input type="text" name="product-name" id="product-name" />
        <label htmlFor="product-name">Product Name</label>
      </fieldset>
      <fieldset>
        <select name="product-category" id="product-category">
          <option value="">- Select Product Category -</option>
          <option value="android">Android</option>
          <option value="camera">Camera</option>
          <option value="laptop">Laptop</option>
        </select>
        <label htmlFor="product-category">Category</label>
      </fieldset>
      <fieldset>
        <input type="text" name="product-photo-url" id="product-photo-url" />
        <label htmlFor="product-photo-url">Product Photo Url</label>
      </fieldset>
      <fieldset>
        <input type="number" name="product-price" id="product-price" />
        <label htmlFor="product-price">Price</label>
      </fieldset>
      <fieldset>
        <input type="number" name="shipping-cost" id="shipping-cost" />
        <label htmlFor="shipping-cost">Shipping Costs</label>
      </fieldset>
      <fieldset>
        <input type="number" name="product-stock" id="product-stock" />
        <label htmlFor="product-stock">Product Stock</label>
      </fieldset>
      <fieldset>
        <input type="number" name="product-rating" id="product-rating" />
        <label htmlFor="product-rating">
          Product Rating
          <span className="hint">(Between 0 to 5)</span>
        </label>
      </fieldset>
      <button type="submit">Add New Product</button>
      {errorMessages.length > 0 && (
        <div id="error-message" className="error">
          Please fill up {errorMessages.join(", ")}.
        </div>
      )}
    </form>
  );
};

export default AddProductForm;
