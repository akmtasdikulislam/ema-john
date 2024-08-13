// Import the createContext function from the react module.
// This function is used to create a new React context.
import { createContext, useEffect, useState } from "react";

// Import the Route and Routes components from the react-router-dom module.
// These components are used to define routes in the app.
import { Route, Routes } from "react-router-dom";

// Import the App.css file, which contains styles for the app.
import "./App.css";

// Import the fakeData array from the assets/fakeData module.
// This array contains sample data for the app.
import fakeData from "./assets/fakeData";

// Import the getDatabaseCart function from the assets/utilities/databaseManager module.
// This function is used to retrieve the cart data from the database.
import { getDatabaseCart } from "./assets/utilities/databaseManager";

// Import various page components from the Pages directory.
// These components are used to render different pages in the app.
import Home from "./Pages/Home/Home";
import Inventory from "./Pages/Inventory/Inventory";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import OrderReview from "./Pages/OrderReview/OrderReview";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import SignUp from "./Pages/SignUp/SignUp";

// Import the getAuth and onAuthStateChanged functions from the firebase/auth module.
// These functions are used to interact with the Firebase Authentication system.
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import the PrivateRoute component from the components/PrivateRoute/PrivateRoute module.
// This component is used to protect routes that require authentication.
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Create a new React context named AppDataContext.
// This context will be used to share user and cart data between components.
export const AppDataContext = createContext();

// Define the App component, which is the top-level component in the app.
function App() {
  // Use the useState hook to create a new state variable named cart.
  // This state variable will store the cart data.
  const [cart, setCart] = useState([]);

  // Use the useState hook to create a new state variable named user.
  // This state variable will store the user data.
  const [user, setUser] = useState(null);

  // Get the Firebase Authentication instance using the getAuth function.
  const auth = getAuth();

  // Use the useEffect hook to run a function when the component mounts.
  // This function will check if the user is authenticated and update the user state accordingly.
  useEffect(() => {
    // Use the onAuthStateChanged function to listen for changes to the user's authentication state.
    onAuthStateChanged(auth, (user) => {
      // If the user is authenticated, update the user state with the user's data.
      if (user) {
        setUser(user);
      } else {
        // If the user is not authenticated, update the user state to null.
        setUser(null);
      }
    });
  }, [auth]);

  // Use the useEffect hook to run a function when the component mounts.
  // This function will retrieve the cart data from the database and update the cart state accordingly.
  useEffect(() => {
    // Get the cart data from the database using the getDatabaseCart function.
    const savedCart = getDatabaseCart();
    // Convert the cart data to an array of product IDs.
    const productKeys = Object.keys(savedCart);
    // Map over the product IDs and retrieve the corresponding products from the fakeData array.
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      // If the product exists, return it with the quantity from the cart data.
      if (product) {
        return { ...product, quantity: savedCart[existingKey] };
      } else {
        // If the product does not exist, return null.
        return null;
      }
    });
    // Update the cart state with the retrieved cart data.
    setCart(previousCart);
  }, []);
  return (
    <AppDataContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
      }}
    >
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/order/review" element={<OrderReview />} />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          <Route
            path="/details/product/:productKey"
            element={<ProductDetails />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppDataContext.Provider>
  );
}

export default App;
