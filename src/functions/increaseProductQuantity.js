// This function is used to add products to the shopping cart

// Import the function 'addToCart' from another file called 'addToCart.js'
import { addProductToCart } from "./addProductToCart";

// Export a new function called 'increaseProductQuantity' that can be used by other parts of the program
export const increaseProductQuantity = ({
  // 'currentCart' is an array of products that are currently in the shopping cart
  currentCart,
  // 'productInfo' is an object that contains information about the product being added to the cart
  productInfo,
  // 'currentQuantity' is the number of products being added to the cart
  currentQuantity,
  // 'updateCart' is a function that updates the shopping cart with new products
  updateCart,
  // 'updateQuantity' is a function that updates the quantity of products being added to the cart
  updateQuantity,
  // 'shouldAddToCart' is a variable that determines whether the product should be added to the cart
  shouldAddToCart,
}) => {
  // Increase the quantity of products being added to the cart by 1
  updateQuantity(currentQuantity + 1);

  // If the product should be added to the cart, call the 'addProductToCart' function
  if (shouldAddToCart) {
    // Call the 'addProductToCart' function with the necessary parameters
    // This function will add the product to the shopping cart and update the cart with the new product
    addProductToCart({
      // Pass the current shopping cart to the 'addProductToCart' function
      currentCart,
      // Pass the function that updates the shopping cart to the 'addProductToCart' function
      updateCart,
      // Pass the product information to the 'addProductToCart' function
      productInfo,
      // Pass the quantity of products being added to the cart to the 'addProductToCart' function
      currentQuantity,
      // Tell the 'addProductToCart' function to increase the quantity of products
      shouldIncreaseQuantity: true,
    });
  }
};
