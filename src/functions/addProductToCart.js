// ** Database related imports **
import { addToDatabaseCart } from "../assets/utilities/databaseManager"; // Import function to add products to the database cart, used when updating the cart

export const addProductToCart = ({
  // 'currentCart' is an array of products that are currently in the shopping cart
  currentCart = [],
  // 'updateCart' is a function that updates the shopping cart with new products
  updateCart = () => {},
  // 'productInfo' is an object that contains information about the product being added to the cart
  productInfo = {},
  // 'currentQuantity' is the number of products being added to the cart
  currentQuantity = 1,
  // 'shouldDecreaseQuantity' is a variable that determines whether the product quantity should be decreased
  shouldDecreaseQuantity = false,
  // 'shouldIncreaseQuantity' is a variable that determines whether the product quantity should be increased
  shouldIncreaseQuantity = false,
}) => {
  /*
   * Description: This function adds a product to the shopping cart or updates its quantity if it already exists.
   * 
   * Task List:
   * - Check if the product already exists in the cart
   * - Update quantity if product exists
   * - Add new product if it doesn't exist
   * - Update the cart state
   * - Add the product to the database cart
   */

  // Find the product in the shopping cart that matches the product being added
  const existingProductInCart = currentCart.find(
    (product) => productInfo.key === product.key // Use strict equality operator
  );

  // If the product is already in the cart, update its quantity
  if (existingProductInCart) {
    // If the quantity should be decreased, subtract 1 from the current quantity
    if (shouldDecreaseQuantity) {
      productInfo.quantity = productInfo.quantity - 1; // Decrease quantity by 1
    }
    // If the quantity should be increased, add 1 to the current quantity
    else if (shouldIncreaseQuantity) {
      productInfo.quantity = productInfo.quantity + 1; // Increase quantity by 1
    }
    // If the quantity is not being changed, set it to the current quantity
    else {
      productInfo.quantity =
        productInfo.quantity + (currentQuantity ? currentQuantity : 1); // Add current quantity or 1 if not specified
    }
    // Create a new array of products that includes the updated product
    const otherProductsInCart = currentCart.filter(
      (product) => product.key !== productInfo.key // Filter out the product being updated
    );
    // Update the shopping cart with the new product or updated quantity
    updateCart([productInfo, ...otherProductsInCart]); // Add updated product to the beginning of the array
    // Add the product to the database
    addToDatabaseCart(productInfo.key, productInfo.quantity); // Update database cart
  }
  // If the product is not in the cart, add it to the cart with the current quantity
  else {
    // Add the product to the cart with the current quantity
    productInfo.quantity = currentQuantity ? currentQuantity : 1; // Set quantity to current quantity or 1 if not specified
    // Update the shopping cart with the new product or updated quantity
    updateCart([productInfo, ...currentCart]); // Add new product to the beginning of the array
    // Add the product to the database
    addToDatabaseCart(productInfo.key, productInfo.quantity); // Add new product to database cart
  }
};
