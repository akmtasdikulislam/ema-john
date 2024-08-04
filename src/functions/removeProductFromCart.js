import { removeFromDatabaseCart } from "../assets/utilities/databaseManager";

export const removeProductFromCart = (productToRemove, cart, setCart) => {
  // Extract the key of the product to remove
  const { key } = productToRemove;
  // Filter out the product with the matching key from the cart
  const updatedCart = cart.filter((product) => product.key !== key);

  // Update the cart state with the updated cart
  setCart(updatedCart);

  // Remove the product from the database
  removeFromDatabaseCart(key);
};
