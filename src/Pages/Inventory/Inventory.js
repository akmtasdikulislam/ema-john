import {
  faBoxOpen,
  faPlus,
  faSadTear,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../components/Header/Header";

const Inventory = () => {
  document.title = "Manage Inventory | Ema John";

  const [features, setFeatures] = useState([]);

  const handleAddInput = () => {
    setFeatures([...features, { description: "", value: "" }]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...features];
    onChangeValue[index][name] = value;
    setFeatures(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...features];
    newArray.splice(index, 1);
    setFeatures(newArray);
  };

  return (
    <main id="inventory">
      <Header />
      <div className="container">
        <h1>Manage Inventory: Add and Organize Your Products</h1>
        <form className="row">
          {/* Other Product Input Field Column */}
          <div className="col-6 pe-4">
            <fieldset>
              <input
                type="text"
                name="product-name"
                id="product-name"
                placeholder="Enter product name"
              />
              <label htmlFor="product-name">Product Name</label>
            </fieldset>
            <fieldset>
              <select name="product-category" id="product-category">
                <option value="">- Select Product Category -</option>
                <option value="android">Android</option>
                <option value="camera">Camera</option>
                <option value="laptop">Laptop</option>
              </select>
              <label htmlFor="">Category</label>
            </fieldset>
            <fieldset>
              <input
                type="text"
                name="product-photo-url"
                id="product-photo-url"
                placeholder="Enter product photo url"
              />
              <label htmlFor="product-photo-url">Product Photo Url</label>
            </fieldset>
            <fieldset>
              <input
                type="number"
                name="product-price"
                id="product-price"
                placeholder="Enter product price"
              />
              <label htmlFor="product-price">Price</label>
            </fieldset>
            <fieldset>
              <input
                type="number"
                name="shipping-cost"
                id="shipping-cost"
                placeholder="Enter product shipping cost"
              />
              <label htmlFor="shipping-cost">Shipping Costs</label>
            </fieldset>
          </div>
          <div className="col-6 ps-4">
            {/* Product Feature Input Field Column */}
            <div className="d-flex flex-row align-items-center justify-content-between w-100 product-feature">
              <h5>Product Features</h5>
              {/* Add New Feature Button (on click add a new input field to add a new feature) */}
              <button
                className="add-button"
                onClick={(e) => {
                  handleAddInput();
                  e.preventDefault();
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
                        onChange={(event) => handleChange(event, index)}
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
                        onChange={(event) => handleChange(event, index)}
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
                          handleDeleteInput(index);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div id="no-features-message">
                  <FontAwesomeIcon className="icon" icon={faBoxOpen} />
                  <p>
                    No Features added Yet <FontAwesomeIcon icon={faSadTear} />
                  </p>
                  <p>Click the plus (+) button to add a new feature.</p>
                </div>
              )}
            </div>
          </div>
        </form>
        {/* Form Submition button */}
        <button onClick={() => console.log(features)}>Add New Product</button>
      </div>
    </main>
  );
};

export default Inventory;
