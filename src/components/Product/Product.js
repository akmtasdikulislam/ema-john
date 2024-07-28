import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Product = ({ productDetails }) => {
  // Destructuring product properties.
  const { name, img, price, priceFraction, star, starCount, seller } =
    productDetails;

  // Converting single digit numbers into double digit numbers (it means, from 1-9 all single digit numbers will have a zero in front of them. Like: 01, 02 ... etc.)
  let { stock } = productDetails;
  stock = stock.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // A function to show rating stars depending on their rating numbers.
  const showRatingStars = () => {
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

  return (
    <div className="product row">
      <div className="col-3">
        <img src={img} alt={name} />
      </div>
      <div className="col-9">
        <p className="name">{name}</p>
        <table className="product-info">
          <tbody>
            <tr className="row">
              <td className="col-5">
                <p>
                  Price: <span className="currency-symbol">$</span>
                  <span className="whole-part">{price}</span>
                  <span className="fraction-part">{priceFraction}</span>
                </p>
              </td>
              <td className="col-7">
                <p className="rating">
                  Rating:{" "}
                  {/* Now calling the "showRatingStars" function. Then running .map method on the returned array (containing how many "filled" and "empty stars are required") and conditionally rendering "filled" or "empty" stars to show rating. */}
                  <span className="rating-stars">
                    {showRatingStars().map(
                      (ratingStarType) =>
                        // eslint-disable-next-line eqeqeq
                        ratingStarType == "filled" ? (
                          // If the ratingStarType is "filled" then a "filled" star is rendered.
                          <FontAwesomeIcon
                            className="filled-stars"
                            icon={faStar}
                          />
                        ) : (
                          // Else if the ratingStarType is "empty" then a "empty" star is rendered.
                          <FontAwesomeIcon
                            className="empty-stars"
                            icon={faStar}
                          />
                        )
                      // NOTE: We're distinguishing between "filled" and "empty" stars by using CSS depending on their class names.
                    )}
                  </span>{" "}
                  {star}/5 ({starCount} reviewed)
                </p>
              </td>
            </tr>
            <tr className="row">
              <td className="col-5">
                <p>Seller: {seller}</p>
              </td>
              <td className="col-7">
                {stock < 10 ? (
                  <p>
                    Stock: Only <span className="highlight">{stock}</span> items
                    are available
                  </p>
                ) : (
                  <p>Stock: {stock} items are available</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button>
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
