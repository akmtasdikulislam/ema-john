import React from "react";
import fakeData from "../../assets/fakeData";
import Cart from "../../components/Cart/Cart";
import Header from "../../components/Header/Header";
import Product from "../../components/Product/Product";

const Home = () => {
  const products = fakeData.slice(0, 9);
  return (
    <main id="home">
      <Header />
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
            <Cart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
