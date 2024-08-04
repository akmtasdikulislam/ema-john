import { addToCart } from "./addToCart";

export // Decrease the quantity amount by 1 and add the product to the cart
const decreaseQuantity = (
  { toBeAddedToCart },
  cart,
  productDetails,
  quantityAmount,
  setCart,
  setQuantityAmount
) => {
  // Check if the quantity amount is greater than 1
  if (quantityAmount > 1) {
    // Decrease the quantity amount by 1
    setQuantityAmount(quantityAmount - 1);
    if (toBeAddedToCart) {
      // Add the product to the cart with the updated quantity amount
      addToCart(cart, setCart, productDetails, quantityAmount, {
        decrease: true,
      });
    }
  }
};
