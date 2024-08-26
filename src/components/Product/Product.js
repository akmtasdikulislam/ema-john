// ** React related imports **
import React, { useContext, useEffect, useState } from "react"; // Core React imports for component creation and hooks

// ** React Router related imports **
import { Link } from "react-router-dom"; // For creating navigation links

// ** Context imports **
import { AppDataContext } from "../../App"; // For accessing global state

// ** Fontawesome related imports **
import {
  faShoppingCart, // Shopping cart icon for add to cart button
  faStar, // Star icon for ratings
  faTrashAlt, // Trash icon for remove from cart button
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // For rendering icons

// ** Utility function imports **
import { formatNumber } from "../../functions/formatNumber"; // For formatting numbers (e.g., adding leading zeros)
import { showRatingStars } from "../../functions/showRatingStars"; // For rendering star ratings

// ** Cart operation imports **
import { addProductToCart } from "../../functions/addProductToCart"; // For adding products to the cart
import { decreaseProductQuantity } from "../../functions/decreaseProductQuantity"; // For decreasing product quantity
import { increaseProductQuantity } from "../../functions/increaseProductQuantity"; // For increasing product quantity
import { removeProductFromCart } from "../../functions/removeProductFromCart"; // For removing products from the cart
import { updateQuantityAmount } from "../../functions/updateQuantityAmount"; // For updating product quantity in the cart

const Product = ({ productDetails, parent }) => {
  // Destructuring product properties.
  const { key, name, img, price, priceFraction, star, starCount, seller } =
    productDetails;

  // Converting single digit numbers into double digit numbers (it means, from 1-9 all single digit numbers will have a zero in front of them. Like: 01, 02 ... etc.)
  let { stock } = productDetails;
  stock = formatNumber(stock);

  // Accessing cart state and its setter function from the global context
  const { cart, setCart } = useContext(AppDataContext);

  // Initializing local state for quantity with a default value of 1
  // This state will be used to manage the quantity of the product to be added to the cart
  const [quantityAmount, setQuantityAmount] = useState(1);

  // ** Effects Hooks **
  useEffect(() => {
    // Update the quantity amount when the component mounts
    updateQuantityAmount(cart, key, setQuantityAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="product row">
      <div className="col-3">
        <img src={img} alt={name} />
      </div>
      <div className="col-9">
        <Link to={`/details/product/${key}`} className="name">
          <p>{name}</p>
        </Link>
        <table className="product-info">
          <tbody>
            <tr className="row">
              <td className="col-5">
                <p>
                  Price: <span className="currency-symbol">$</span>
                  <span className="whole-part">{parseInt(price)}</span>
                  <span className="fraction-part">{priceFraction}</span>
                </p>
              </td>
              <td className="col-7">
                <p className="rating">
                  Rating:{" "}
                  {/* Now calling the "showRatingStars" function. Then running .map method on the returned array (containing how many "filled" and "empty stars are required") and conditionally rendering "filled" or "empty" stars to show rating. */}
                  <span className="rating-stars">
                    {showRatingStars(star).map(
                      (ratingStarType, index) =>
                        // eslint-disable-next-line eqeqeq
                        ratingStarType == "filled" ? (
                          // If the ratingStarType is "filled" then a "filled" star is rendered.
                          <FontAwesomeIcon
                            key={index}
                            className="filled-stars"
                            icon={faStar}
                          />
                        ) : (
                          // Else if the ratingStarType is "empty" then a "empty" star is rendered.
                          <FontAwesomeIcon
                            key={index}
                            className="empty-stars"
                            icon={faStar}
                          />
                        )
                      // NOTE: We're distinguishing between "filled" and "empty" stars by using CSS depending on their class names.
                    )}
                  </span>{" "}
                  {parseInt(star)}/5 ({starCount} reviewed)
                </p>
              </td>
            </tr>
            <tr className="row">
              <td className="col-5">
                <p>Seller: {seller}</p>
              </td>
              <td className="col-7">
                {
                  // eslint-disable-next-line eqeqeq
                  stock < 10 ? (
                    <p>
                      Stock: Only <span className="highlight">{stock}</span>{" "}
                      items are available
                    </p>
                  ) : (
                    <p>Stock: {stock} items are available</p>
                  )
                }
              </td>
            </tr>
          </tbody>
        </table>
        {
          // eslint-disable-next-line eqeqeq
          parent == "home" && (
            <button
              onClick={() => {
                addProductToCart({
                  currentCart: cart,
                  productInfo: productDetails,
                  updateCart: setCart,
                });
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to cart
            </button>
          )
        }
        {parent === "cart" && (
          <div className="d-flex flex-row align-items-center">
            <div className="quantity d-flex flex-row align-items-center">
              <button
                onClick={() => {
                  decreaseProductQuantity({
                    currentCart: cart,
                    productInfo: productDetails,
                    currentQuantity: quantityAmount,
                    updateCart: setCart,
                    updateQuantity: setQuantityAmount,
                    shouldAddToCart: true,
                  });
                }}
              >
                -
              </button>
              <input
                type="number"
                value={formatNumber(quantityAmount)}
                onChange={(e) => {
                  setQuantityAmount(e.target.value);
                }}
                name=""
                id="quantity"
              />
              <button
                onClick={() => {
                  increaseProductQuantity({
                    currentCart: cart,
                    productInfo: productDetails,
                    currentQuantity: quantityAmount,
                    updateCart: setCart,
                    updateQuantity: setQuantityAmount,
                    shouldAddToCart: true,
                  });
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                removeProductFromCart(productDetails, cart, setCart);
              }}
              className="ms-3 delete-button"
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Remove Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
