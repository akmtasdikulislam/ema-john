export //Finds a product in the cart based on the given key.
const findProductInCart = (cart, key) => {
  // Find the product in the cart based on the key
  // eslint-disable-next-line eqeqeq
  return cart.find((product) => product.key == key);
};
