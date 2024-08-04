import React from "react";
import Header from "../../components/Header/Header";
import AddProductForm from "../Inventory/AddProductForm";

const AddNewProduct = () => {
  return (
    <main className="inventory">
      <Header />
      <div className="contianer">
        <h1>Add New Product Form</h1>
        <AddProductForm />
      </div>
    </main>
  );
};

export default AddNewProduct;
