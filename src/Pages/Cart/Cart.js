import React, { useContext } from "react";
import { UserContext } from "../../App";
import CartSideBar from "../../components/CartSideBar/CartSideBar";
import Product from "../../components/Product/Product";

const Cart = () => {
  document.title = "Cart Review | Ema John";
  const { cart } = useContext(UserContext);
  return (
    <main id="cart">
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
            <CartSideBar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
