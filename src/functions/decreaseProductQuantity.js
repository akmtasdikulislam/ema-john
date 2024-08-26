// ** Cart-related function imports **
import { addProductToCart } from "./addProductToCart"; // Import function to add or update product in cart, used when decreasing quantity

// This function decreases the quantity of a product in the shopping cart
export const decreaseProductQuantity = ({
  /*
   * Description:
   * This function handles the process of decreasing the quantity of a product in the shopping cart.
   * It updates the quantity and, if necessary, modifies the cart contents.
   *
   * Task List:
   * • Check if the current quantity is greater than 1
   * • Decrease the quantity by 1
   * • Update the cart if required
   * • Call addProductToCart function with updated information if necessary
   */
  currentCart, // Array of products currently in the shopping cart
  productInfo, // Object containing information about the product being modified
  currentQuantity, // Current quantity of the product in the cart
  updateCart, // Function to update the shopping cart with new products
  updateQuantity, // Function to update the quantity of products in the cart
  shouldAddToCart, // Boolean flag indicating whether the product should be added to the cart
}) => {
  if (currentQuantity > 1) {
    // Check if the quantity is greater than 1 to allow decrease
    updateQuantity(currentQuantity - 1); // Decrease the quantity by 1 and update

    if (shouldAddToCart) {
      // Check if the product should be added/updated in the cart
      addProductToCart({
        // Call addProductToCart function to update the cart
        currentCart, // Pass the current cart state
        updateCart, // Pass the function to update the cart
        productInfo, // Pass the product information
        currentQuantity, // Pass the current quantity (before decrease)
        shouldDecreaseQuantity: true, // Indicate that quantity should be decreased
      });
    }
  }
};
