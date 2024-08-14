import React, { useState } from "react";
import fakeData from "../../assets/fakeData";
import Header from "../../components/Header/Header";
import MyOrders from "../../components/MyOrders/MyOrders";
import MyProducts from "../../components/MyProducts/MyProducts";
import ProductCRUDForm from "../../components/ProductCRUDForm/ProductCRUDForm";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";

const Inventory = () => {
  document.title = "Manage Inventory | Ema John";

  const myProducts = fakeData.slice(0, 5);
  const orders = fakeData.slice(9, 13);

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

  return (
    <main id="inventory">
      {/* Modal Overlay (by default Hidden.)*/}
      <ModalOverlay />
      {/* Header */}
      <Header />

      <div className="container">
        {/* Page Title */}
        <h1>Manage Inventory: Add and Organize Your Products</h1>
        <ProductCRUDForm
          features={features}
          product={product}
          setFeatures={setFeatures}
          setProduct={setProduct}
          setUpdateProduct={setUpdateProduct}
          updateProduct={updateProduct}
        />
        {/* My Products */}
        <MyProducts
          myProducts={myProducts}
          setFeatures={setFeatures}
          setProduct={setProduct}
          setUpdateProduct={setUpdateProduct}
        />
        {/* My Orders */}
        <MyOrders orders={orders} />
      </div>
    </main>
  );
};

export default Inventory;
