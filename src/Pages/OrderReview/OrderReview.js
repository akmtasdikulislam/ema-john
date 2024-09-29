/** React related imports **/
import React, { useContext } from "react"; // Import React and useContext hook for component creation and context usage

/** FontAwesome related imports **/
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"; // Import frown face icon for empty cart message
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component to use FontAwesome icons

/** Context related imports **/
import { AppDataContext } from "../../App"; // Import AppDataContext to access cart data

/** Component imports **/
import Cart from "../../components/Cart/Cart"; // Import Cart component to display cart summary
import CartChip from "../../components/CartChip/CartChip";
import Header from "../../components/Header/Header"; // Import Header component for page header
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage"; // Import NotFoundErrorMessage component for empty cart message
import Product from "../../components/Product/Product"; // Import Product component to display individual cart items

const OrderReview = () => {
  document.title = "Order Review | Ema John"; // Set the page title for the Order Review page
  const { cart } = useContext(AppDataContext); // Extract the cart data from the AppDataContext using useContext hook
  return (
    <main id="order-review">
      <Header />
      <div className="container">
        <h1>Review Your Cart Before Checkout</h1>
        <div className="row">
          <div className="col-xl-9 col-12">
            {/* Check if the cart has any items */}
            {cart.length > 0 ? (
              // If cart is not empty, map through each product
              cart.map((product) => (
                // Render a Product component for each item in the cart
                <Product
                  key={product.key} // Unique key for React list rendering
                  productDetails={product} // Pass product details as props
                  parent={"cart"} // Indicate that this product is rendered in the cart context
                />
              ))
            ) : (
              // If cart is empty, display a message using NotFoundErrorMessage component
              <NotFoundErrorMessage
                errorMessage={"No items in your cart yet"} // Main error message for empty cart
                remarks={"Browse our products and find something you love!"} // Encouraging message for the user
              >
                {/* Add a sad face icon to emphasize the empty cart state */}
                <FontAwesomeIcon className="icon" icon={faFaceFrown} />
              </NotFoundErrorMessage>
            )}
          </div>
          <div className="col-3">
            <Cart />
          </div>
        </div>
        <CartChip />
      </div>
    </main>
  );
};

export default OrderReview;
