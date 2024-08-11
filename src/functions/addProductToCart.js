import { addToDatabaseCart } from "../assets/utilities/databaseManager";

// This function is used to add a product to the shopping cart
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
  // Find the product in the shopping cart that matches the product being added
  const existingProductInCart = currentCart.find(
    (product) => productInfo.key == product.key
  );

  // If the product is already in the cart, update its quantity
  if (existingProductInCart) {
    // If the quantity should be decreased, subtract 1 from the current quantity
    if (shouldDecreaseQuantity) {
      productInfo.quantity = productInfo.quantity - 1;
    }
    // If the quantity should be increased, add 1 to the current quantity
    else if (shouldIncreaseQuantity) {
      productInfo.quantity = productInfo.quantity + 1;
    }
    // If the quantity is not being changed, set it to the current quantity
    else {
      productInfo.quantity =
        productInfo.quantity + (currentQuantity ? currentQuantity : 1);
    }
    // Create a new array of products that includes the updated product
    const otherProductsInCart = currentCart.filter(
      (product) => product.key !== productInfo.key
    );
    // Update the shopping cart with the new product or updated quantity
    updateCart([productInfo, ...otherProductsInCart]);
    // Add the product to the database
    addToDatabaseCart(productInfo.key, productInfo.quantity);
  }
  // If the product is not in the cart, add it to the cart with the current quantity
  else {
    // Add the product to the cart with the current quantity
    productInfo.quantity = currentQuantity ? currentQuantity : 1;
    // Update the shopping cart with the new product or updated quantity
    updateCart([productInfo, ...currentCart]);
    // Add the product to the database
    addToDatabaseCart(productInfo.key, productInfo.quantity);
  }
};
