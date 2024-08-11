import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import fakeData from "./assets/fakeData";
import { getDatabaseCart } from "./assets/utilities/databaseManager";
import Home from "./Pages/Home/Home";
import Inventory from "./Pages/Inventory/Inventory";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import OrderReview from "./Pages/OrderReview/OrderReview";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import SignUp from "./Pages/SignUp/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Creating a context api named "UserContext" which will contain currently active user's login informations and cart history.
export const UserContext = createContext();
function App() {
  // Declaring cart (an Array) using useState.
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setUser(user);
      const expirationTime = user.stsTokenManager.expirationTime; // example Unix timestamp
      const expirationDate = new Date(expirationTime * 1000); // convert to Date object

      console.log(expirationDate.toLocaleString("en-US")); // output: "2022-02-01T12:30:00.000Z"
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // While website is being loded, it will get previously added products from browser's localStorage and store them in cart array (state).
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      if (product) {
        // Add this null check
        product.quantity = savedCart[existingKey];
      }
      return product;
    });
    setCart(previousCart);
  }, []);
  return (
    <UserContext.Provider value={{ user, cart, setCart }}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/order/review" element={<OrderReview />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route
            path="/details/product/:productKey"
            element={<ProductDetails />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
