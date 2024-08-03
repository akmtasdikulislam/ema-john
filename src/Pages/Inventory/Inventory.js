import {
  faBoxOpen,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import fakeData from "../../assets/fakeData";
import Header from "../../components/Header/Header";
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage";
import OrderRecordRow from "../../components/OrderRecordRow/OrderRecordRow";
import ProductRecordRow from "../../components/ProductRecordRow/ProductRecordRow";
import { formatNumber } from "../../functions/formatNumber";
import { generateProductKey } from "../../functions/generateProductKey";
import { generateStarCount } from "../../functions/generateStarCount";
import { getDecimalPart } from "../../functions/getDecimalPart";

export function generateOrderID() {
  // Define the characters to be used in the order ID
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // Initialize an empty string to store the order ID
  let orderID = "";
  // Loop 20 times to generate a 20-character ID
  for (let i = 0; i < 20; i++) {
    // Select a random character from the characters string
    const randomIndex = Math.floor(Math.random() * characters.length);
    // Append the selected character to the order ID
    orderID += characters.charAt(randomIndex);
  }
  // Return the generated order ID
  return orderID;
}
// Get elements

// Function to open the modal
export function openModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden"; // Freeze scrolling
}

// Function to close the modal
function closeModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "none";
  // Restore scrolling
  document.body.style.overflow = "auto";
  document.body.style.overflowX = "hidden";
}

const Inventory = () => {
  document.title = "Manage Inventory | Ema John";

  // Product State
  const [product, setProduct] = useState({
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

  // Features State
  const [features, setFeatures] = useState([]);

  // Update Product State
  const [updateProduct, setUpdateProduct] = useState(false);

  const products = fakeData.slice(0, 5);
  const orders = fakeData.slice(9, 13);

  const handleAddNewFeature = () => {
    setFeatures([...features, { description: "", value: "" }]);
  };

  const handleChange = (event, index) => {
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

  // Add New Product Button
  const addNewProduct = () => {
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
    console.log(newProduct);
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
    setFeatures([]);
    setUpdateProduct(false);
  };

  return (
    <main id="inventory">
      {/* Modal Overlay (by default Hidden.)*/}
      <div id="modalOverlay" className="overlay">
        <div className="confirm-delete-modal">
          <p>Are you sure you want to delete this product?</p>
          <div className="button-group">
            <button className="delete-button" onClick={() => closeModal()}>
              Confirm
            </button>
            <button className="neutral-button" onClick={() => closeModal()}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <Header />

      <div className="container">
        {/* Page Title */}
        <h1>Manage Inventory: Add and Organize Your Products</h1>

        {/* Add/Update Product Form */}
        <form className="row">
          {/* Other Product Input Field Column */}
          <div className="col-6 pe-4">
            {/* Product Name */}
            <fieldset>
              <input
                type="text"
                name="product-name"
                id="product-name"
                placeholder="Enter product name"
                value={product.name && product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <label htmlFor="product-name">Product Name</label>
            </fieldset>
            {/* Product Category */}
            <fieldset>
              <select
                name="product-category"
                id="product-category"
                value={product.category && product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option value="">- Select Product Category -</option>
                <option value="android">Android</option>
                <option value="camera">Camera</option>
                <option value="laptop">Laptop</option>
              </select>
              <label htmlFor="">Category</label>
            </fieldset>
            {/* Product Photo Url */}
            <fieldset>
              <input
                type="text"
                name="product-photo-url"
                id="product-photo-url"
                placeholder="Enter product photo url"
                value={product.img && product.img}
                onChange={(e) =>
                  setProduct({ ...product, img: e.target.value })
                }
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
                    name="product-price"
                    id="product-price"
                    placeholder="Enter product price"
                    value={product.price && product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                  <label htmlFor="product-price">Price</label>
                </fieldset>
              </div>
              <div className="col-6">
                {/* Product Shipping Cost */}
                <fieldset>
                  <input
                    type="number"
                    name="shipping-cost"
                    id="shipping-cost"
                    placeholder="Enter product shipping cost"
                    value={product.shipping && product.shipping}
                    onChange={(e) =>
                      setProduct({ ...product, shipping: e.target.value })
                    }
                  />
                  <label htmlFor="shipping-cost">Shipping Costs</label>
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
                    name="product-stock"
                    id="product-stock"
                    placeholder="Enter product stock amount"
                    value={product.stock && product.stock}
                    onChange={(e) =>
                      setProduct({ ...product, stock: e.target.value })
                    }
                  />
                  <label htmlFor="product-stock">Product Stock</label>
                </fieldset>
              </div>
              <div className="col-6">
                {/* Product Rating */}
                <fieldset>
                  <input
                    type="number"
                    name="product-rating"
                    id="product-rating"
                    placeholder="Enter product rating"
                    max={5}
                    maxLength={1}
                    value={product.star && product.star}
                    onChange={(e) =>
                      setProduct({ ...product, star: e.target.value })
                    }
                  />
                  <label htmlFor="product-rating">
                    Product Rating{" "}
                    {/* Additional Indications for rating input field */}
                    <span className="hint">(Between 0 to 5)</span>
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
        <div className="button-group">
          {updateProduct ? (
            <button onClick={() => handleUpdateProduct()}>
              Update Product{" "}
            </button>
          ) : (
            <button onClick={() => addNewProduct()}>Add New Product </button>
          )}
          <button className="neutral-button" onClick={() => resetForm()}>
            Reset{" "}
          </button>
        </div>

        {/* My Products */}
        <div className="my-products">
          <h3>My Products (Total: {formatNumber(products.length)})</h3>

          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <ProductRecordRow
                    key={index}
                    productDetails={item}
                    features={features}
                    setFeatures={setFeatures}
                    setProduct={setProduct}
                    setUpdateProduct={setUpdateProduct}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <NotFoundErrorMessage
              erroMessage={"You have added no products yet"}
            >
              <FontAwesomeIcon className="icon" icon={faBoxOpen} />
            </NotFoundErrorMessage>
          )}
        </div>

        {/* Orders */}
        <div className="orders">
          <h3>Orders (Total: {formatNumber(orders.length)})</h3>
          {orders.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Order No</th>
                  <th>Quantity</th>
                  <th>Order Placed on</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <OrderRecordRow key={index} product={order} />
                ))}
              </tbody>
            </table>
          ) : (
            <NotFoundErrorMessage erroMessage={"You have currently no orders"}>
              <FontAwesomeIcon className="icon" icon={faBoxOpen} />
            </NotFoundErrorMessage>
          )}
        </div>
      </div>
    </main>
  );
};

export default Inventory;
