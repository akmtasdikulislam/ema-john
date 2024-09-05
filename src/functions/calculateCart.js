// ** Utility function imports **
import { formatNumber } from "./formatNumber"; // Import formatNumber function to format numerical values in the cart calculation

export const calculateCart = (cart) => {
  // Calculate the total number of items in the cart
  // Format the count using the formatNumber utility function for consistent display
  let totalItems = formatNumber(cart.length);

  // Shopping Cost related variables
  let merchandise = 0; // Initialize the total cost of merchandise (sum of all item prices) to zero
  let shippingAndHandling = 0; // Initialize shipping and handling charges to zero
  let subTotal = 0; // Initialize subtotal (merchandise + shipping) to zero
  let vatAndTax = 0; // Initialize VAT (Value Added Tax) and other taxes to zero
  let grandTotal = 0; // Initialize the final total (subtotal + taxes) to zero

  // Cart Total Calculation: This code block calculates the total cost of items in the shopping cart, including merchandise cost, shipping and handling, VAT and taxes.
  // eslint-disable-next-line array-callback-return
  cart.map((product) => {
    /* 
    Task list:
    • Map through each product in the cart
    • Destructure price, quantity, and shipping from each product
    • Calculate merchandise cost by adding price * quantity for each product
    • Calculate total shipping and handling cost
    • Calculate subtotal (merchandise + shipping and handling)
    • Determine VAT and tax amount based on subtotal:
      - 7.5% if subtotal > $500
      - 5% if subtotal > $1000
      - 2.5% if subtotal > $2000
      - 10% if subtotal <= $500
    • Calculate grand total (subtotal + VAT and tax)
    */

    // When a new product is inserted, then .map() is run on the cart to calculate shopping cost.

    // Destructuring product's price and shipping cost.
    const { price, quantity, shipping } = product;

    // Calculating total merchandise cost.
    merchandise = merchandise + price * quantity;

    // Calculating total shippingAndHandling cost.
    shippingAndHandling = shippingAndHandling + shipping;

    // Calculating subTotal (sum of merchandise cost & shippingAndHandling cost) to determine vatAndTax amount.
    subTotal = merchandise + shippingAndHandling;

    // Determining vatAndTax amount depending on subTotal.
    if (subTotal > 500) {
      // If the subTotal is more than $500, then 7.5% vat+tax will be applied
      vatAndTax = subTotal * 0.075;
    } else if (subTotal > 1000) {
      // If the subTotal is more than $1000, then 5% vat+tax will be applied
      vatAndTax = subTotal * 0.05;
    } else if (subTotal > 2000) {
      // If the subTotal is more than $2000, then 2.5% vat+tax will be applied
      vatAndTax = subTotal * 0.025;
    } else {
      // If the subTotal is less than $500, then 10% vat+tax will be applied
      vatAndTax = subTotal * 0.1;
    }

    // Finally calculating "Grand Total" (sum of subTotal and vatAndTax).
    grandTotal = subTotal + vatAndTax;
  });
  return {
    totalItems, // Total number of items in the cart
    merchandise, // Total cost of all products in the cart
    shippingAndHandling, // Total shipping and handling charges
    vatAndTax, // Calculated VAT and tax amount based on subtotal
    grandTotal, // Final total including all costs and taxes
  };
};
