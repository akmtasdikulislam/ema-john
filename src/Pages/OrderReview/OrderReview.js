import React, { useContext } from "react";
import { UserContext } from "../../App";
import Cart from "../../components/Cart/Cart";
import Product from "../../components/Product/Product";
import Header from "../../components/Header/Header";

const OrderReview = () => {
  document.title = "Cart Review | Ema John";
  const { cart } = useContext(UserContext);
  return (
    <main id="cart">
      <Header />
      <div className="container">
        <h1>Review Your Cart Before Checkout</h1>
        <div className="row">
          <div className="col-9">
            {cart.map((product) => (
              <Product
                key={product.key}
                productDetails={product}
                parent={"cart"}
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

export default OrderReview;
