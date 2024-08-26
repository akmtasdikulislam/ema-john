/** Cart-related imports */
import { addProductToCart } from "./addProductToCart"; // Function to add or update a product in the cart, used when increasing quantity of a product that's not yet in the cart

export const increaseProductQuantity = ({
  /*
   * This function increases the quantity of a product in the shopping cart.
   * It also adds the product to the cart if it's not already present.
   * 
   * Task list:
   * • Update the quantity of the product
   * • Check if the product should be added to the cart
   * • Add the product to the cart if necessary
   */
  currentCart, // Array of products currently in the shopping cart
  productInfo, // Object containing information about the product being added
  currentQuantity, // Current quantity of the product in the cart
  updateCart, // Function to update the shopping cart with new products
  updateQuantity, // Function to update the quantity of products in the cart
  shouldAddToCart, // Boolean indicating whether the product should be added to the cart
}) => {
  // Increment the quantity of the product by 1
  updateQuantity(currentQuantity + 1);

  // Check if the product should be added to the cart
  if (shouldAddToCart) {
    // Add the product to the cart or update its quantity if already present
    addProductToCart({
      currentCart, // Pass the current state of the shopping cart
      updateCart, // Function to update the cart state
      productInfo, // Information about the product to be added
      currentQuantity, // Current quantity of the product
      shouldIncreaseQuantity: true, // Indicate that the quantity should be increased
    });
  }
};
