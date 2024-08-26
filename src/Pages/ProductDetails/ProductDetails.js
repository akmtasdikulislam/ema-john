// This is the Product Details Page. Here detailed information about the product will be shown. It will also contain related customer reviews

// ** React and Router related imports **
import React, { useContext, useEffect, useState } from "react"; // Core React imports for component creation and state management
import { useNavigate, useParams } from "react-router-dom"; // Router hooks for navigation and accessing URL parameters

// ** Context and Constants **
import { AppDataContext, BACKEND_URL } from "../../App"; // App-wide context and backend URL constant

// ** Icon imports **
import {
  faArrowRotateLeft, // Used for return or undo actions
  faBox, // Represents a closed box, possibly for packaging status
  faBoxOpen, // Represents an open box, possibly for unpacking status
  faFaceSadTear, // Used for negative feedback or error states
  faFaceSmileBeam, // Used for positive feedback or success states
  faShoppingCart, // Represents the shopping cart
  faSquareCheck, // Used for checkboxes or completion status
  faStar, // Used for ratings
  faTruckFast, // Represents shipping or delivery
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome component for rendering icons

// ** Payment method image imports **
import amazonPay from "../../assets/images/cards/amazon-pay.svg"; // Amazon Pay logo for payment options
import masterCard from "../../assets/images/cards/master-card.svg"; // Mastercard logo for payment options
import payoneer from "../../assets/images/cards/payoneer.svg"; // Payoneer logo for payment options
import payPal from "../../assets/images/cards/paypal.svg"; // PayPal logo for payment options
import stripe from "../../assets/images/cards/stripe.svg"; // Stripe logo for payment options
import visa from "../../assets/images/cards/visa.svg"; // Visa logo for payment options

// ** Component imports **
import CustomerReview from "../../components/CustomerReview/CustomerReview"; // Component for displaying customer reviews
import Header from "../../components/Header/Header"; // Header component for the page
import Loader from "../../components/Loader/Loader"; // Loading indicator component
import NotFoundErrorMessage from "../../components/NotFoundErrorMessage/NotFoundErrorMessage"; // Component for displaying not found errors

// ** Utility function imports **
import { addProductToCart } from "../../functions/addProductToCart"; // Function to add a product to the cart
import { decreaseProductQuantity } from "../../functions/decreaseProductQuantity"; // Function to decrease product quantity in cart
import { findProductInCart } from "../../functions/findProductInCart"; // Function to check if a product is already in the cart
import { formatNumber } from "../../functions/formatNumber"; // Function to format numbers (e.g., prices)
import { increaseProductQuantity } from "../../functions/increaseProductQuantity"; // Function to increase product quantity in cart
import { showRatingStars } from "../../functions/showRatingStars"; // Function to display rating stars

const ProductDetails = () => {
  //====================//
  //  STATE AND EFFECTS //
  //====================//

  // State to manage the quantity of items to be added to cart
  const [quantityAmount, setQuantityAmount] = useState(1);
  // State to store the current product details
  const [product, setProduct] = useState({});
  // State to track if the product is already in the cart
  const [productExistsInCart, setProductExistsInCart] = useState(false);
  // State to store customer reviews for the product
  const [reviews, setReviews] = useState([]);
  // State to track if reviews have been fetched
  const [isReviewsFetched, setIsReviewsFetched] = useState(false);
  // State to handle fetch failures
  const [failedToFetch, setFailedToFetch] = useState(false);

  // Effect hook to handle product loading and navigation
  useEffect(() => {
    // Check if products have been loaded
    if (isProductsLoaded) {
      // Find the product in the products array that matches the productKey
      const foundProduct = products.find(
        (product) => product.key === productKey
      );

      // If no matching product is found, navigate to the Not Found page
      if (!foundProduct) {
        navigate("/not-found");
      } else {
        // If a matching product is found, update the product state
        setProduct(foundProduct);
      }
    }
    // Disable exhaustive-deps rule for this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsLoaded, productKey, navigate]); // Re-run effect when these dependencies change

  // Effect hook to fetch reviews when component mounts
  useEffect(() => {
    // Call the fetchReviews function to retrieve product reviews
    fetchReviews();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect hook to check if the product is in the cart and update UI accordingly
  useEffect(() => {
    // Check if the current product exists in the cart
    if (findProductInCart(cart, key)) {
      // Set state to indicate the product is in the cart
      setProductExistsInCart(true);
      // Show the success message by changing its display style
      document.getElementById("success-message").style.display = "flex";
    }
  }, [key, cart]); // Re-run effect when key or cart changes

  //====================//
  //  HELPER FUNCTIONS  //
  //====================//

  // Extract the productKey from the URL parameters
  const { productKey } = useParams();

  // Destructure properties from the product object, or use an empty object if product is undefined
  const {
    key,
    name,
    img,
    price,
    priceFraction,
    star,
    starCount,
    seller,
    stock,
    shipping,
    features,
  } = product || {};

  // Initialize the navigate function for programmatic navigation
  const navigate = useNavigate();

  // Access global state and functions from AppDataContext
  const { cart, setCart, products, isProductsLoaded } =
    useContext(AppDataContext);

  // Set the document title to include the product name for better SEO and user experience
  document.title = `${name} | Ema John`;

  //====================//
  //  API INTERACTIONS  //
  //====================//

  // Function to add a new review to the product
  const addReview = async (review) => {
    /*
     * Description: This function adds a new review for a product by sending a POST request to the backend.
     * Task List:
     * - Send a POST request to add a new review
     * - Handle successful response
     * - Handle errors and log them
     */

    try {
      // Send POST request to add a new review
      const response = await fetch(`${BACKEND_URL}/product-reviews/add`, {
        method: "POST", // Set the HTTP method to POST
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ review }), // Convert the review object to JSON string
      });

      // Check if the response is not successful
      if (!response.ok) {
        console.error("Failed to add review:"); // Log error message
      }

      // Parse the response body as JSON
      const result = await response.json();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error adding review:", error); // Log the error message and details
      console.error("Failed to add review:", error); // Log additional error message
    }
  };

  const fetchReviews = async () => {
    /*
     * Description: This function fetches product reviews from the backend, sorts them, and updates the state.
     * Task List:
     * - Fetch reviews from the backend
     * - Sort reviews by date in descending order
     * - Update state with fetched reviews
     * - Handle errors and update state accordingly
     */

    try {
      // Send GET request to fetch product reviews
      const response = await fetch(`${BACKEND_URL}/product-reviews`);

      // Check if the response is not successful
      if (!response.ok) {
        console.log("Network response was not ok");
      }

      // Parse the response body as JSON
      const result = await response.json();

      // Sort the reviews array in descending order based on the review date
      const sortedReviews = result.sort((currentReview, nextReview) => {
        // Compare the reviewDate of the next review with the current review
        // This will sort the reviews from newest to oldest
        return nextReview.reviewDate.localeCompare(currentReview.reviewDate);
      });

      // Update state with sorted reviews
      setReviews(sortedReviews);

      // Set flag to indicate reviews have been fetched
      setIsReviewsFetched(true);

      // Reset failed to fetch flag
      setFailedToFetch(false);
    } catch (error) {
      // Log error message if fetching reviews fails
      console.error("Error fetching reviews:", error);

      // Set flag to indicate fetch failure
      setFailedToFetch(true);
    }
  };

  return (
    <main id="product-details">
      <Header />
      {isProductsLoaded ? (
        <div className="container">
          <div className="product">
            <div className="col-6">
              <img src={img} alt={name} />
            </div>
            <div className="col-6">
              <p className="price">
                <span className="currency-symbol">$</span>
                <span className="whole-part">{parseInt(price)}</span>
                <span className="fraction-part">{priceFraction}</span>
              </p>
              <p className="rating">
                {/* Now calling the "showRatingStars" function. Then running .map method on the returned array (containing how many "filled" and "empty stars are required") and conditionally rendering "filled" or "empty" stars to show rating. */}
                <span className="rating-stars">
                  {showRatingStars(star).map(
                    (ratingStarType, index) =>
                      // eslint-disable-next-line eqeqeq
                      ratingStarType == "filled" ? (
                        // If the ratingStarType is "filled" then a "filled" star is rendered.
                        <FontAwesomeIcon
                          key={index}
                          className="filled-stars"
                          icon={faStar}
                        />
                      ) : (
                        // Else if the ratingStarType is "empty" then a "empty" star is rendered.
                        <FontAwesomeIcon
                          key={index}
                          className="empty-stars"
                          icon={faStar}
                        />
                      )
                    // NOTE: We're distinguishing between "filled" and "empty" stars by using CSS depending on their class names.
                  )}
                </span>{" "}
                {isNaN(parseInt(star)) ? "0" : parseInt(star)}/5 (
                {starCount || 0} reviewed)
              </p>
              <p className="name">{name}</p>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <p>Seller: {seller}</p>
                {stock < 10 ? (
                  <p>
                    Stock: Only <span className="highlight">{stock}</span> items
                    are available
                  </p>
                ) : (
                  <p className="ms-5">Stock: {stock} items are available</p>
                )}
              </div>
              <div className="d-flex flex-row align-items-center  justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <div className="quantity d-flex flex-row align-items-center">
                    <button
                      onClick={() => {
                        decreaseProductQuantity({
                          currentQuantity: quantityAmount,
                          updateQuantity: setQuantityAmount,
                          shouldAddToCart: false,
                        });
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={formatNumber(quantityAmount)}
                      onChange={(e) => setQuantityAmount(e.target.value)}
                      name=""
                      id="quantity"
                    />
                    <button
                      onClick={() => {
                        increaseProductQuantity({
                          currentQuantity: quantityAmount,
                          updateQuantity: setQuantityAmount,
                          shouldAddToCart: false,
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      addProductToCart({
                        currentQuantity: quantityAmount,
                        productInfo: product,
                        updateCart: setCart,
                        currentCart: cart,
                      });
                    }}
                    className="ms-3"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />{" "}
                    {productExistsInCart ? "Add more to cart" : "Add to cart"}
                  </button>
                </div>
                <p className="shipping">Shipping & Handling: $ {shipping}</p>
              </div>
              <div className="message" id="success-message">
                <FontAwesomeIcon className="icon" icon={faSquareCheck} />
                <p>This product is already added to cart! </p>
              </div>
              <div className="we-accept">
                We Accept
                <div className="card-group">
                  <img src={masterCard} alt="Master Card" />
                  <img src={visa} alt="Visa" />
                  <img src={payoneer} alt="Payoneer" />
                  <img src={amazonPay} alt="Amazon Pay" />
                  <img src={payPal} alt="Pay Pal" />
                  <img src={stripe} alt="Stripe" />
                </div>
              </div>
              {features && features.length > 0 && (
                <div className="features">
                  <h5>Features</h5>
                  <ul>
                    {features.map((feature, index) => (
                      <li key={index}>
                        {feature.description}: {feature.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="row mt-5 services">
            <div className="col-3">
              <FontAwesomeIcon className="icon" icon={faBox} />
              <h5>Shipping</h5>
              <p>
                Enjoy Free Shipping on Selected Orders: Your Ticket to Savings!
              </p>
            </div>
            <div className="col-3">
              <FontAwesomeIcon className="icon" icon={faTruckFast} />
              <h5>Delivery</h5>
              <p>Speedy Delivery: Get Your Goods in Record Time!</p>
            </div>
            <div className="col-3">
              <FontAwesomeIcon className="icon" icon={faArrowRotateLeft} />
              <h5>Returns</h5>
              <p> Test Drice with Confidence: Your Time to Try, Risk-Free!</p>
            </div>
            <div className="col-3">
              <FontAwesomeIcon className="icon" icon={faFaceSmileBeam} />
              <h5>Happy</h5>
              <p>
                Thriving on Satisfaction: Join Our Community of Happy Customers!
              </p>
            </div>
          </div>
          <div className="mt-5 customer-reviews">
            <h2 className="mb-5">What Our Customers Say</h2>
            {
              // This section renders different content based on the product fetching state and product availability
              // It uses conditional rendering to display one of three possible outcomes:
              failedToFetch ? (
                // 1. If fetching failed:
                // Display an error message with a "Try Again" button and a sad face icon
                <NotFoundErrorMessage
                  errorMessage={"Ops! Something went wrong"}
                  dynamicContent={
                    <button
                      className="try-again"
                      onClick={() => fetchReviews()}
                    >
                      Try Again
                    </button>
                  }
                >
                  <FontAwesomeIcon className="icon" icon={faFaceSadTear} />
                </NotFoundErrorMessage>
              ) : isReviewsFetched ? (
                reviews.length > 0 ? (
                  // 2. If products are fetched successfully and there are products:
                  // Render a table with product details
                  reviews.map((review, index) => (
                    <CustomerReview key={index} review={review} />
                  ))
                ) : (
                  // If there are no products:
                  // Display a message indicating no products have been added yet
                  <NotFoundErrorMessage
                    errorMessage={"You have added no products yet"}
                  >
                    <FontAwesomeIcon className="icon" icon={faBoxOpen} />
                  </NotFoundErrorMessage>
                )
              ) : (
                // 3. If products are still being fetched:
                // Display a loading indicator
                <div className="loader-container bordered-loader-container">
                  <Loader />
                  <p>Loading customer reviews...</p>{" "}
                </div>
              )
            }
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </main>
  );
};

export default ProductDetails;
