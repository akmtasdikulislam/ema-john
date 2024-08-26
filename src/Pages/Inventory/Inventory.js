// ** React related imports **
import React, { useState } from "react"; // Import React and useState hook for component creation and state management

// ** Component imports **
import Header from "../../components/Header/Header"; // Import Header component for the page header
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay"; // Import ModalOverlay component for displaying modal dialogs
import MyOrders from "../../components/MyOrders/MyOrders"; // Import MyOrders component to display user's orders (not used in the visible code)
import MyProducts from "../../components/MyProducts/MyProducts"; // Import MyProducts component to display and manage user's products
import ProductCRUDForm from "../../components/ProductCRUDForm/ProductCRUDForm"; // Import ProductCRUDForm component for adding and updating products

const Inventory = () => {
  document.title = "Manage Inventory | Ema John"; // Set the page title for the inventory management page

  // Product State: Initialize state for a single product with empty values
  const [product, setProduct] = useState({
    category: "", // Store the product category
    features: "", // Store product features as a string (might be changed to array later)
    img: "", // Store the URL or path to the product image
    key: "", // Unique identifier for the product
    name: "", // Name of the product
    price: "", // Price of the product (as a string, might be converted to number when used)
    priceFraction: "", // Fractional part of the price (e.g., cents)
    seller: "", // Name or ID of the seller
    shipping: "", // Shipping information or cost
    star: "", // Rating of the product (as a string, might be converted to number)
    starCount: "", // Number of ratings received
    stock: "", // Available stock of the product
    wholePrice: "", // Whole number part of the price
  });

  // Features State: Initialize state for product features as an array
  const [features, setFeatures] = useState([]); // Store an array of product features

  // Update Product State: Flag to indicate if we're updating an existing product
  const [updateProduct, setUpdateProduct] = useState(false); // Boolean to toggle between add and update modes

  return (
    <main id="inventory">
      {/* Modal Overlay (by default Hidden.)*/}
      <ModalOverlay />
      {/* Header */}
      <Header />

      <div className="container">
        {/* Page Title */}
        <h1>Manage Inventory: Add and Organize Your Products</h1>
        {/* ProductCRUDForm component for adding/editing products */}
        <ProductCRUDForm
          features={features} // Pass features state to the form
          product={product} // Pass product state to the form
          setFeatures={setFeatures} // Function to update features state
          setProduct={setProduct} // Function to update product state
          setUpdateProduct={setUpdateProduct} // Function to toggle update mode
          updateProduct={updateProduct} // Boolean flag for update mode
        />
        {/* MyProducts component to display and manage user's products */}
        <MyProducts
          setFeatures={setFeatures} // Function to update features when selecting a product
          setProduct={setProduct} // Function to update product when selecting for edit
          setUpdateProduct={setUpdateProduct} // Function to enable update mode
        />
        {/* MyOrders component to display user's orders */}
        <MyOrders />
      </div>
    </main>
  );
};

export default Inventory;
