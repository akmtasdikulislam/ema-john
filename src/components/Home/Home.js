import React from "react";
import fakeData from "../../assets/fakeData";
import Product from "../Product/Product";

const Home = () => {
  const products = fakeData.slice(0, 9);
  return (
    <main id="home">
      <div className="container">
        <h1>Discover Our Best-Selling Products</h1>
        <div className="row">
          <div className="col-9">
            {products.map((product) => (
              <Product key={product.id} productDetails={product} />
            ))}
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
