export const findProductInCart = (cart, key) => {
  /*
   * Description: This function finds a product in the cart based on the given key.
   * Task List:
   * - Iterate through the cart array
   * - Compare each product's key with the provided key
   * - Return the matching product or undefined if not found
   */

  // Use the find method to search for a product with a matching key
  // eslint-disable-next-line eqeqeq
  return cart.find((product) => product.key == key); // Compare product key with the provided key using loose equality
};
