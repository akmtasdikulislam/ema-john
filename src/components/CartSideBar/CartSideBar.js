import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CartSideBar = () => {
  return (
    <aside className="cart">
      <h5>
        <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        Cart Summary
      </h5>
      <table>
        <tr>
          <td>
            <p>Total products</p>
          </td>
          <td>
            <p>:</p>
          </td>
          <td>
            <p>03 items</p>
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
            <p>$ 00.00</p>
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
            <p>$ 00.00</p>
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
            <p>$ 00.00</p>
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
            <p>$ 00.00</p>
          </td>
        </tr>
      </table>
      <button>Proceed to Checkout</button>
    </aside>
  );
};

export default CartSideBar;
