import { addToCart } from "./addToCart";

export // Increase the quantity amount by 1 and add the product to the cart
const increaseQuantity = (
  { toBeAddedToCart },
  cart,
  productDetails,
  quantityAmount,
  setCart,
  setQuantityAmount
) => {
  // Increase the quantity amount by 1
  setQuantityAmount(quantityAmount + 1);
  console.log("increased quantity amount by 1");
  if (toBeAddedToCart) {
    addToCart(cart, setCart, productDetails, quantityAmount);
    console.log("added new product to cart");
  }
};
