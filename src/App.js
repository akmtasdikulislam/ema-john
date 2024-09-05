// ** React related imports **

// Import the createContext function from the react module.
// This function is used to create a new React context.
import { createContext, useEffect, useState } from "react";

// ** React Router related imports **

// Import the Route and Routes components from the react-router-dom module.
// These components are used to define routes in the app.
import { Route, Routes } from "react-router-dom";

// ** Firebase imports **

// Import the getAuth and onAuthStateChanged functions from the firebase/auth module.
// These functions are used to interact with the Firebase Authentication system.
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import the App.css file, which contains styles for the app.
import "./App.css";

// Import the getDatabaseCart function from the assets/utilities/databaseManager module.
// This function is used to retrieve the cart data from the database.
import { getDatabaseCart } from "./assets/utilities/databaseManager";

// ** Pages imports **

// Import various page components from the Pages directory.
// These components are used to render different pages in the app.

import Checkout from "./Pages/Checkout/Checkout"; // Import the Checkout component to handle the checkout process and display the checkout page
import Home from "./Pages/Home/Home"; // Import the Home component to render the home page of the application
import Inventory from "./Pages/Inventory/Inventory"; // Import the Inventory component to display and manage product inventory
import Login from "./Pages/Login/Login"; // Import the Login component to handle user authentication and login functionality
import NotFound from "./Pages/NotFound/NotFound"; // Import the NotFound component to display a 404 error page for invalid routes
import OrderReview from "./Pages/OrderReview/OrderReview"; // Import the OrderReview component to show and manage user's order details
import ProductDetails from "./Pages/ProductDetails/ProductDetails"; // Import the ProductDetails component to display detailed information about a specific product
import SignUp from "./Pages/SignUp/SignUp"; // Import the SignUp component to handle new user registration and account creation

// Import the PrivateRoute component from the components/PrivateRoute/PrivateRoute module.
// This component is used to protect routes that require authentication.
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Custom Components imports

// Import the ToastNotification component from the components/ToastNotification/ToastNotification module.
// This component is used to display toast notifications to the user.
import ToastNotification from "./components/ToastNotification/ToastNotification";
import { calculateCart } from "./functions/calculateCart";

// Create a new React context named AppDataContext.
// This context will be used to share user and cart data between components.
export const AppDataContext = createContext();

// Define the base URL for the backend API
// This constant is used throughout the application to make HTTP requests to the server
export const BACKEND_URL = "http://localhost:5000";

// Define the App component, which is the top-level component in the app.
function App() {
  // ** State Declarations **

  // Authentication and user-related states
  const [user, setUser] = useState(null); // This state variable will store the user data.
  const [authLoading, setAuthLoading] = useState(true); // This state variable will track authentication loading status

  // Product and inventory-related states

  const [isProductsLoaded, setIsProductsLoaded] = useState(false); // This state variable will track whether products have been loaded from the server
  const [products, setProducts] = useState([]); // This state variable will store the list of all products
  const [toBeDeletedProductId, setToBeDeletedProductId] = useState(null); // This state variable will store the ID of a product that is marked for deletion
  const [paginatedProducts, setPaginatedProducts] = useState([]); // This state variable will store the current page of products for pagination
  const [failedToFetch, setFailedToFetch] = useState(false); // This state variable will track whether fetching products failed

  // Cart-related state
  const [cart, setCart] = useState([]); // This state variable will store the cart data.
  const [totalCartPrice, setTotalCartPrice] = useState(0); // This state variable will store the total cost/price of the cart.

  // Toast notification state
  const [toasts, setToasts] = useState([]); // This state variable will manage toast visibility and content

  // Get the Firebase Authentication instance using the getAuth function.
  const auth = getAuth();

  // ** Effect Hooks **

  // This useEffect runs once when the component mounts
  useEffect(() => {
    // Fetch all products from the API or data source
    fetchAllProducts();
  }, []);

  // ● Authentication effect: This useEffect hook runs when the component mounts and sets up an authentication state listener
  useEffect(() => {
    // Use the onAuthStateChanged function to listen for changes in the user's authentication state
    onAuthStateChanged(auth, (user) => {
      // If a user object is returned, it means the user is authenticated
      if (user) {
        // Update the user state with the authenticated user's data
        setUser(user);
      } else {
        // If no user object is returned, it means the user is not authenticated
        // Set the user state to null to indicate no active user
        setUser(null);
      }
      // The authentication check is now complete
      // Set the authLoading state to false to indicate that the auth check has finished
      setAuthLoading(false);
    });
  }, [auth]); // This effect depends on the 'auth' object and will re-run if 'auth' changes

  // This useEffect runs whenever isProductsLoaded changes
  useEffect(() => {
    // Check if products have been loaded
    if (isProductsLoaded) {
      // Split products into paginated sets and update state
      setPaginatedProducts(splitProductsIntoPaginatedSets());
      // Get the cart data from the database using the getDatabaseCart function
      const savedCart = getDatabaseCart();
      // Convert the cart data to an array of product IDs
      const productKeys = Object.keys(savedCart);
      // Map over the product IDs and retrieve the corresponding products from the products array
      const previousCart = productKeys.map((existingKey) => {
        // Find the product in the products array that matches the current key
        const product = products.find((pd) => pd.key === existingKey);
        // If the product exists, return it with the quantity from the cart data
        if (product) {
          return { ...product, quantity: savedCart[existingKey] };
        } else {
          // If the product does not exist, return null
          return null;
        }
      });

      // Update the cart state with the retrieved cart data
      setCart(previousCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsLoaded, products]);

  // This useEffect runs whenever the cart changes
  useEffect(() => {
    // Check if products are loaded before calculating cart total
    if (isProductsLoaded) {
      // Calculate the grand total of the cart using the calculateCart function
      const { grandTotal } = calculateCart(cart);

      // Update the total cart price in the global state with the calculated grand total
      setTotalCartPrice(grandTotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]); // Re-run effect when cart changes

  // ** Helper functions **

  // Function to fetch all products from the backend
  const fetchAllProducts = async () => {
    // Task list:
    // • Send a GET request to the backend API to fetch products
    // • Check if the response is successful
    // • Parse the JSON response
    // • Update the products state with the fetched data
    // • Set the isProductsLoaded state to true
    // • Handle any errors that occur during the fetch process
    // • Set the failedToFetch state based on the outcome
    // • Log any errors to the console
    // • Update the isProductsLoaded state in case of failure

    // Reset the failedToFetch state to false before attempting to fetch products
    // This ensures we start with a clean slate and can accurately track fetch failures
    setFailedToFetch(false);

    try {
      // Send a GET request to the backend API to fetch products
      const response = await fetch(`${BACKEND_URL}/products`);
      // Check if the response is not successful
      if (!response.ok) {
        // Log an error message if the fetch was not successful
        console.log("Error fetching products:", response.statusText);
      }
      // Parse the JSON response
      const data = await response.json();
      // Update the products state with the fetched data
      setProducts(data);
      // Set the isProductsLoaded state to true to indicate products have been loaded
      setIsProductsLoaded(true);
      // Set the failedToFetch state to false as the fetch was successful
      setFailedToFetch(false);
    } catch (error) {
      // Log any errors that occur during the fetch process
      console.error("Error fetching products:", error);
      // Set the failedToFetch state to true as an error occurred
      setFailedToFetch(true);
      setIsProductsLoaded(false);
    }
  };
  // Function to split products into paginated sets
  const splitProductsIntoPaginatedSets = (pageSize = 10) => {
    // Task list:
    // • Initialize an array to store all product pages
    // • Initialize an array to store the current page of products
    // • Iterate through each product in the products array
    // • Add each product to the current page
    // • Check if the current page is full or if we've reached the last product
    // • If so, add the current page to the productPages array
    // • Reset the current page to an empty array for the next set of products
    // • Return the array of product pages

    // Initialize an array to store all product pages
    const productPages = [];
    // Initialize an array to store the current page of products
    let currentPage = [];

    // Iterate through each product in the products array
    products.forEach((product, index) => {
      // Add the current product to the current page
      currentPage.push(product);

      // Check if the current page is full or if we've reached the last product
      if (currentPage.length === pageSize || index === products.length - 1) {
        // Add the current page to the productPages array
        productPages.push(currentPage);
        // Reset the current page to an empty array for the next set of products
        currentPage = [];
      }
    });
    return productPages;
  };

  // Function to remove a specific toast from the list of toasts
  const removeToast = (id) => {
    // Task list:
    // • Create a new array without the toast with the given id
    // • Update the toasts state with the new array
    // • Use the setToasts function to update the state
    // • Use the filter method to create a new array
    // • Keep all toasts where the id does not match the given id

    // Use the setToasts function to update the state
    setToasts((currentToasts) =>
      // Use the filter method to create a new array without the toast with the given id
      currentToasts.filter(
        (toast) =>
          // Keep all toasts where the id does not match the given id
          toast.id !== id
      )
    );
  };

  return (
    <AppDataContext.Provider
      value={{
        authLoading, // State variable indicating whether authentication is in progress
        cart, // State variable containing the user's shopping cart
        isProductsLoaded, // Boolean state indicating if products have been loaded
        paginatedProducts, // Array of products divided into pages
        products, // Array of all products
        removeToast, // Function to remove a specific toast notification
        setCart, // Function to update the cart state
        setToBeDeletedProductId, // Function to update the toBeDeletedProductId state
        setToasts, // Function to update the toasts state
        setUser, // Function to update the user state
        toBeDeletedProductId, // ID of the product that is about to be deleted
        toasts, // Array of current toast notifications
        user, // Object containing current user information
        totalCartPrice, // Total price of items in the cart
        setTotalCartPrice, // Function to update the totalCartPrice state
      }}
    >
      <div className="App">
        {/* Define the routes for the application */}
        <Routes>
          {/* Route for the home page */}
          <Route
            exact
            path="/"
            element={
              <Home
                failedToFetch={failedToFetch}
                fetchAllProducts={fetchAllProducts}
              />
            }
          />
          {/* Route for paginated products */}
          <Route exact path="/products/page/:pageNumber" element={<Home />} />
          {/* Route for order review page */}
          <Route path="/order/review" element={<OrderReview />} />
          {/* Route for inventory page, protected by PrivateRoute */}
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          {/* Route for product details page */}
          <Route
            path="/details/product/:productKey"
            element={<ProductDetails />}
          />
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
          {/* Route for sign-up page */}
          <Route path="/sign-up" element={<SignUp />} />
          {/* Route for the checkout page */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Define a container element for toast notifications with a class name "toast-container" */}
        <div className="toast-container">
          {/* Map over an array of toasts, creating a new ToastNotification component for each one */}
          {toasts.map((toast) => (
            // Create a new ToastNotification component
            <ToastNotification
              // Unique identifier for React's reconciliation process
              key={toast.id}
              // Identifier for the specific toast notification
              id={toast.id}
              // Determines the visual style and icon of the toast (e.g., success, error, warning)
              type={toast.type}
              // Main heading of the toast notification
              title={toast.title}
              // Detailed content or description of the notification
              message={toast.message}
              // Timestamp or duration information for the toast
              time={toast.time}
              // Additional content that can be dynamically updated or interacted with
              dynamicContent={toast.dynamicContent}
            />
          ))}
        </div>
      </div>
    </AppDataContext.Provider>
  );
}

export default App;
