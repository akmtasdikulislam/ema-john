// ** Utility function imports **
import { findProductInCart } from "./findProductInCart"; // Import the findProductInCart function to check if a product exists in the cart and locate it

// Define a function called updateQuantityAmount
export const updateQuantityAmount = (cart, key, setQuantityAmount) => {
  /*
   * Description: This function updates the quantity amount for a product in the cart.
   *
   * Task List:
   * • Check if the product exists in the cart
   * • Find the existing product in the cart
   * • Update the quantity amount for the product
   */

  // Check if the product with the given key already exists in the cart
  if (findProductInCart(cart, key)) {
    // If it exists, find the product in the cart array using its key
    const existingProduct = cart.find((product) => product.key === key);

    // Update the quantity amount state to match the existing product's quantity
    setQuantityAmount(existingProduct.quantity);
  }
};
