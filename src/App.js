import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import Inventory from "./Pages/Inventory/Inventory";
import NotFound from "./Pages/NotFound/NotFound";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

// Creating a context api named "UserContext" which will contain currently active user's login informations and cart history.
export const UserContext = createContext();
function App() {
  // Declaring cart (an Array) using useState.
  const [cart, setCart] = useState([]);
  return (
    <UserContext.Provider value={{ cart, setCart }}>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
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
