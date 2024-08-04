import { findProductInCart } from "./findProductInCart";

// Define a function called updateQuantityAmount
export const updateQuantityAmount = (cart, key, setQuantityAmount) => {
  // Check if the product with the given key already exists in the cart
  if (findProductInCart(cart, key)) {
    // If it exists, find the product and get its quantity
    const existingProduct = cart.find((product) => product.key == key);

    // Update the quantity amount to match the existing product's quantity
    setQuantityAmount(existingProduct.quantity);
  }
};
