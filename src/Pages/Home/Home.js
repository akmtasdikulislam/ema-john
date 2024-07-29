import React from "react";
import fakeData from "../../assets/fakeData";
import CartSideBar from "../../components/CartSideBar/CartSideBar";
import Product from "../../components/Product/Product";

const Home = () => {
  const products = fakeData.slice(0, 9);
  return (
    <main id="home">
      <div className="container">
        <h1>Discover Our Best-Selling Products</h1>
        <div className="row">
          <div className="col-9">
            {products.map((product) => (
              <Product
                key={product.key}
                productDetails={product}
                parent={"home"}
              />
            ))}
          </div>
          <div className="col-3">
            <CartSideBar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
