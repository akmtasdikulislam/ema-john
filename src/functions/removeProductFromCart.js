// ** Database related imports **
import { removeFromDatabaseCart } from "../assets/utilities/databaseManager"; // Import function to remove items from the database cart, used in removeProductFromCart function

export const removeProductFromCart = (productToRemove, cart, setCart) => {
  /*
   * Description: This function removes a product from the cart and updates the database.
   * 
   * Task List:
   * • Extract the key of the product to be removed
   * • Filter out the product from the cart
   * • Update the cart state
   * • Remove the product from the database
   */

  // Extract the key of the product to remove from the productToRemove object
  const { key } = productToRemove;

  // Create a new cart array by filtering out the product with the matching key
  const updatedCart = cart.filter((product) => product.key !== key);

  // Update the cart state with the new filtered cart array
  setCart(updatedCart);

  // Remove the product from the database using the extracted key
  removeFromDatabaseCart(key);
};
