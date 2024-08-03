import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import Cart from "../../components/Cart/Cart";
import Header from "../../components/Header/Header";
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage";
import Product from "../../components/Product/Product";

const OrderReview = () => {
  document.title = "Order Review | Ema John";
  const { cart } = useContext(UserContext);
  return (
    <main id="order-review">
      <Header />
      <div className="container">
        <h1>Review Your Cart Before Checkout</h1>
        <div className="row">
          <div className="col-9">
            {cart.length > 0 ? (
              cart.map((product) => (
                <Product
                  key={product.key}
                  productDetails={product}
                  parent={"cart"}
                />
              ))
            ) : (
              <NotFoundErrorMessage
                erroMessage={"No items in your cart yet"}
                remarks={"Browse our products and find something you love!"}
              >
                <FontAwesomeIcon className="icon" icon={faFaceFrown} />
              </NotFoundErrorMessage>
            )}
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
