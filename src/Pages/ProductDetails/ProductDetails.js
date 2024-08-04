// This is the Product Details Page. Here detailed information about the product will be shown. It will also contain related customer reviews

import {
  faArrowRotateLeft,
  faBox,
  faFaceSmileBeam,
  faShoppingCart,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import fakeData from "../../assets/fakeData";
import amazonPay from "../../assets/images/cards/amazon-pay.svg";
import masterCard from "../../assets/images/cards/master-card.svg";
import payoneer from "../../assets/images/cards/payoneer.svg";
import payPal from "../../assets/images/cards/paypal.svg";
import stripe from "../../assets/images/cards/stripe.svg";
import visa from "../../assets/images/cards/visa.svg";
import CustomerReview from "../../components/CustomerReview/CustomerReview";
import Header from "../../components/Header/Header";
import { addToCart, showRatingStars } from "../../components/Product/Product";

const ProductDetails = () => {
  const { productKey } = useParams();
  const navigate = useNavigate(); // Add this line to access the navigate function
  // quantityAmount state - it will indicate how many items to be added to cart
  const [quantityAmount, setQuantityAmount] = useState(1);
  // eslint-disable-next-line eqeqeq
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useContext(UserContext);
  useEffect(() => {
    // Find the product by the product key
    const foundProduct = fakeData.find((product) => product.key === productKey);

    // If no product is found, navigate to the Not Found page
    if (!foundProduct) {
      navigate("/not-found");
    } else {
      setProduct(foundProduct); // Set the product state
    }
  }, [productKey, navigate]);
  // Destructuring product properties.
  const {
    name,
    img,
    price,
    priceFraction,
    star,
    starCount,
    seller,
    stock,
    shipping,
    features,
  } = product || {};
  console.log({ product });

  document.title = `${name} | Ema John`;

  // Quantity increment
  const quantityIncrement = () => {
    setQuantityAmount(quantityAmount + 1);
  };
  // Quantity reduction
  const quantityReduction = () => {
    if (quantityAmount > 1) {
      setQuantityAmount(quantityAmount - 1);
    }
  };

  return (
    <main id="product-details">
      <Header />
      <div className="container">
        <div className="product">
          <div className="col-6">
            <img src={img} alt={name} />
          </div>
          <div className="col-6">
            <p className="price">
              <span className="currency-symbol">$</span>
              <span className="whole-part">{parseInt(price)}</span>
              <span className="fraction-part">{priceFraction}</span>
            </p>
            <p className="rating">
              {/* Now calling the "showRatingStars" function. Then running .map method on the returned array (containing how many "filled" and "empty stars are required") and conditionally rendering "filled" or "empty" stars to show rating. */}
              <span className="rating-stars">
                {showRatingStars(star).map(
                  (ratingStarType) =>
                    // eslint-disable-next-line eqeqeq
                    ratingStarType == "filled" ? (
                      // If the ratingStarType is "filled" then a "filled" star is rendered.
                      <FontAwesomeIcon
                        key={ratingStarType + Math.random() * 99}
                        className="filled-stars"
                        icon={faStar}
                      />
                    ) : (
                      // Else if the ratingStarType is "empty" then a "empty" star is rendered.
                      <FontAwesomeIcon
                        key={ratingStarType + Math.random() * 99}
                        className="empty-stars"
                        icon={faStar}
                      />
                    )
                  // NOTE: We're distinguishing between "filled" and "empty" stars by using CSS depending on their class names.
                )}
              </span>{" "}
              {parseInt(star)}/5 ({starCount} reviewed)
            </p>
            <p className="name">{name}</p>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <p>Seller: {seller}</p>
              {stock < 10 ? (
                <p>
                  Stock: Only <span className="highlight">{stock}</span> items
                  are available
                </p>
              ) : (
                <p className="ms-5">Stock: {stock} items are available</p>
              )}
            </div>
            <div className="d-flex flex-row align-items-center  justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div className="quantity d-flex flex-row align-items-center">
                  <button
                    onClick={() => {
                      quantityReduction();
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantityAmount.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                    onChange={(e) => setQuantityAmount(e.target.value)}
                    name=""
                    id="quantity"
                  />
                  <button
                    onClick={() => {
                      quantityIncrement();
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    addToCart(cart, setCart, product, quantityAmount);
                    console.log("added to cart", { cart });
                  }}
                  className="ms-3"
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>
              </div>
              <p className="shipping">Shipping & Handeling: $ {shipping}</p>
            </div>
            <div className="we-accept">
              We Accept
              <div className="card-group">
                <img src={masterCard} alt="Master Card" />
                <img src={visa} alt="Visa" />
                <img src={payoneer} alt="Payoneer" />
                <img src={amazonPay} alt="Amazon Pay" />
                <img src={payPal} alt="Pay Pal" />
                <img src={stripe} alt="Stripe" />
              </div>
            </div>
            {features && features.length > 0 && (
              <div className="features">
                <h5>Features</h5>
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>
                      {feature.description}: {feature.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-5 services">
          <div className="col-3">
            <FontAwesomeIcon className="icon" icon={faBox} />
            <h5>Shipping</h5>
            <p>
              Enjoy Free Shipping on Selected Orders: Your Ticket to Savings!
            </p>
          </div>
          <div className="col-3">
            <FontAwesomeIcon className="icon" icon={faTruckFast} />
            <h5>Delivery</h5>
            <p>Speedy Delivery: Get Your Goods in Record Time!</p>
          </div>
          <div className="col-3">
            <FontAwesomeIcon className="icon" icon={faArrowRotateLeft} />
            <h5>Returns</h5>
            <p> Test Drice with Confidence: Your Time to Try, Risk-Free!</p>
          </div>
          <div className="col-3">
            <FontAwesomeIcon className="icon" icon={faFaceSmileBeam} />
            <h5>Happy</h5>
            <p>
              Thiving on Satisfaction: Join Our Community of Happy Customers!
            </p>
          </div>
        </div>
        <div className="mt-5 customer-reviews">
          <h2 className="mb-5">What Our Customers Say</h2>
          <CustomerReview />
          <CustomerReview />
          <CustomerReview />
          <CustomerReview />
          <CustomerReview />
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
