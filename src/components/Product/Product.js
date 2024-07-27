import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Product = ({ productDetails }) => {
  const { name, img, price, priceFraction, star, starCount, stock } =
    productDetails;
  return (
    <div className="product row">
      <div className="col-3">
        <img src={img} alt={name} />
      </div>
      <div className="col-9">
        <p className="name">{name}</p>
        <div className="product-info">
          <p>
            Price: <span className="currency-symbol">$</span>
            <span className="whole-part">{price}</span>
            <span className="fraction-part">{priceFraction}</span>
          </p>
          <p>
            Rating: {star} out of 5 ({starCount} reviewed)
          </p>
          <p>Stock: {stock} items are available</p>
        </div>
        <button>
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
