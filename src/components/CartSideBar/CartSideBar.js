import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { UserContext } from "../../App";

const CartSideBar = () => {
  // eslint-disable-next-line no-unused-vars
  const { cart } = useContext(UserContext); // Accesing cart state from context-api

  // Converting totalItems number into two digit numbers
  let totalItems = cart.length.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // Shopping Cost related variables
  let marchendise = 0;
  let shippingAndHandeling = 0;
  let subTotal = 0;
  let vatAndTax = 0;
  let grandTotal = 0;

  // eslint-disable-next-line array-callback-return
  cart.map((product) => {
    // When a new product is inserted, then .map() is run on the cart to calculate shopping cost.

    // Destructuring product's price and shipping cost.
    const { price, shipping } = product;

    // Calculating total marchendise cost.
    marchendise = marchendise + price;

    // Calculating total shippingAndHandeling cost.
    shippingAndHandeling = shippingAndHandeling + shipping;

    // Calculating subTotal (sum of marchendise cost & shippingAndHandeling cost) to determine vatAndTax amount.
    subTotal = marchendise + shippingAndHandeling;

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
  return (
    <aside className="cart-side-bar">
      <h5>
        <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        Cart Summary
      </h5>
      <table>
        <tbody>
          <tr>
            <td>
              <p>Total products</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>{totalItems} items</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Marchendise</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>
                ${" "}
                {
                  // if marchendise cost is not greater than 0, then it will show hard coded value ("00.00") otherwise it will show the marchendise cost. (Shipping & Handeling, VAT+Tax and Grand Total are also showed in the same way.)
                  marchendise > 0 ? marchendise.toFixed(2) : "00.00"
                }
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Shipping & Handeling</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>
                ${" "}
                {shippingAndHandeling > 0
                  ? shippingAndHandeling.toFixed(2)
                  : "00.00"}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>VAT & Tax</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>$ {vatAndTax > 0 ? vatAndTax.toFixed(2) : "00.00"}</p>
            </td>
          </tr>
          <tr className="grand-total">
            <td>
              <p>Grand Total</p>
            </td>
            <td>
              <p>:</p>
            </td>
            <td>
              <p>$ {grandTotal > 0 ? grandTotal.toFixed(2) : "00.00"}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => console.log(cart)}>Proceed to Checkout</button>
    </aside>
  );
};

export default CartSideBar;
