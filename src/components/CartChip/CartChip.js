// ** React related imports **
import React, { useContext } from "react"; // Import React and useContext hook for component creation and context usage

// ** Context related imports **
import { AppDataContext } from "../../App"; // Import AppDataContext to access cart data

// ** Icon related imports **
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import shopping cart icon for visual representation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component to render the icon

const CartChip = () => {
  // ** Destructure the cart data from the AppDataContext **

  // Access the cart data from the AppDataContext using the useContext hook
  const { cart } = useContext(AppDataContext);

  // ** Helper Functions **

  // Define a function to handle the click event on the cart chip
  const handleCartChipClick = () => {
    // Get the first element with the class name "cart"
    const cart = document.getElementsByClassName("cart")[0];
    // Get the element with the id "dimmed-bg"
    const dimmedBG = document.getElementById("dimmed-bg");
    // Set the display style of the cart element to "block" to make it visible
    cart.style.display = "block";
    // Set the display style of the dimmed background element to "block" to make it visible
    dimmedBG.style.display = "block";
    // Prevent scrolling on the main body when the cart is open
    // Set the maximum height of the body to 100% of the viewport height
    document.body.style.maxHeight = "100vh";
    // Hide the vertical overflow of the body to disable scrolling
    document.body.style.overflowY = "hidden";
  }
  return (
    <div className="cart-chip" onClick={handleCartChipClick}>
      <FontAwesomeIcon icon={faShoppingCart} /> Cart <span>{cart.length}</span>
    </div>
  );
};

export default CartChip;
