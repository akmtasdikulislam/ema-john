import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import fakeData from "./assets/fakeData";
import { getDatabaseCart } from "./assets/utilities/databaseManager";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Inventory from "./Pages/Inventory/Inventory";
import NotFound from "./Pages/NotFound/NotFound";
import OrderReview from "./Pages/OrderReview/OrderReview";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

// Creating a context api named "UserContext" which will contain currently active user's login informations and cart history.
export const UserContext = createContext();
function App() {
  // Declaring cart (an Array) using useState.
  const [cart, setCart] = useState([]);

  // While website is being loded, it will get previously added products from browser's localStorage and store them in cart array (state).
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    setCart(previousCart);
  }, []);
  return (
    <UserContext.Provider value={{ cart, setCart }}>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/order/review" element={<OrderReview />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route
            path="/details/product/:productKey"
            element={<ProductDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
