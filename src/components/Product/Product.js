import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

// A function to show rating stars depending on their rating numbers.
export const showRatingStars = (star) => {
  // At first, declaring an empty array called "stars", where different types of stars like "filled" or "empty" type will be stored to determine rating from  rating number.
  let stars = [];
  // Determining how many "filled" stars are required. As rating number indicates the rating, that's why the star number (which is destructured from productDetails) is directly assigned to it.
  let filledStarNumber = star;
  // Then determinig how many "empty" or "blank" stars are required. To determine this, subtracting 'star number' from 5 as it will show rating between 0 to 5.
  let emptyStarNumber = 5 - star;

  // Running a for loop to indicate how many "filled" stars are required by storing "filled" category everytime in "stars" variable.
  for (let index = 0; index < filledStarNumber; index++) {
    stars.push("filled");
  }
  // Running a for loop to indicate how many "empty" stars are required by storing "empty" category everytime in "stars" variable.
  for (let index = 0; index < emptyStarNumber; index++) {
    stars.push("empty");
  }
  // Finally, returning the stars array.(It means if we run this function, we will get an array).
  return stars;
};

export // Add product to cart
const addToCart = (cart, setCart, productDetails, quantityAmount) => {
  // Finding whether cart already has same product or not
  // eslint-disable-next-line eqeqeq
  const sameProduct = cart.find((product) => productDetails.key == product.key);

  if (sameProduct) {
    // If a product which is already in the cart is added again, then it won't add the same product as a new item in cart rather it will increase its quantity by 1.
    productDetails.quantity =
      productDetails.quantity + (quantityAmount ? quantityAmount : 1);
    // Then it will update that same product.

    // To do so, at first seperating all other products except the same product from cart by using filter() method on cart, which will check if the product keys of the products in the cart does match with the same product or not. Then it will return the products in the cart which's key does not match with the same product's key.
    const otherProductsInCart = cart.filter(
      (product) => product.key !== productDetails.key
    );
    // Then overriding the cart by adding other products and quantity updated same product. Here using spead operator (...) to copy all items from otherProductsInCart array to a new Array which will also have the quantity updated same product.
    setCart([...otherProductsInCart, productDetails]);
  } else {
    // And if the product is added for the first time, then add a new "quantity" key to it with the value set to 1.
    productDetails.quantity = quantityAmount ? quantityAmount : 1;
    // Then make a new cart array containing old cart items by copying them using spread operator and newly added prodcut.
    setCart([...cart, productDetails]);
  }
};

const Product = ({ productDetails, parent }) => {
  // Destructuring product properties.
  const {
    key,
    name,
    img,
    price,
    priceFraction,
    star,
    starCount,
    seller,
    quantity,
  } = productDetails;

  // Converting single digit numbers into double digit numbers (it means, from 1-9 all single digit numbers will have a zero in front of them. Like: 01, 02 ... etc.)
  let { stock } = productDetails;
  stock = stock.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // Accessing {cart and setCart} using context api
  const { cart, setCart } = useContext(UserContext);

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
              </td>
            </tr>
            <tr className="row">
              <td className="col-5">
                <p>Seller: {seller}</p>
              </td>
              <td className="col-7">
                {
                  // eslint-disable-next-line eqeqeq
                  parent == "cart" ? (
                    <p>
                      Quantity:{" "}
                      {quantity.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}
                    </p>
                  ) : stock < 10 ? (
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
              onClick={
                () => {
                  addToCart(cart, setCart, productDetails);
                }
                // when "Add to cart" button is clicked, it inserts the product object into cart (array). By using spread operator (...cart), inserting new item without removing other products in cart.
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add to cart
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Product;
