import { addToDatabaseCart } from "../assets/utilities/databaseManager";

export // Add product to cart
const addToCart = (cart, setCart, productDetails, quantityAmount, decrease) => {
  // Find the product in the cart that has the same key as the productDetails
  // eslint-disable-next-line eqeqeq
  const sameProduct = cart.find((product) => productDetails.key == product.key);

  if (sameProduct) {
    // If the same product is found in the cart

    // Increment the quantity of the same product by the quantityAmount
    if (decrease) {
      productDetails.quantity = productDetails.quantity - 1;
    } else {
      productDetails.quantity =
        productDetails.quantity + (quantityAmount ? quantityAmount : 1);
    }

    // Filter out the same product from the cart
    const otherProductsInCart = cart.filter(
      (product) => product.key !== productDetails.key
    );

    // Update the cart by adding the updated product and the other products
    setCart([...otherProductsInCart, productDetails]);

    // Save the updated product to the database
    addToDatabaseCart(productDetails.key, productDetails.quantity);
  } else {
    // If the same product is not found in the cart

    // Set the quantity of the product to the quantityAmount
    productDetails.quantity = quantityAmount ? quantityAmount : 1;

    // Add the product to the cart
    setCart([...cart, productDetails]);

    // Save the new product to the database
    addToDatabaseCart(productDetails.key, productDetails.quantity);
  }
};
