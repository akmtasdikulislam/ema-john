import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

// Creating a context api named "UserContext" which will contain currently active user's login informations and cart history.
export const UserContext = createContext();
function App() {
  // Declaring cart (an Array) using useState.
  const [cart, setCart] = useState([]);
  return (
    <UserContext.Provider value={{ cart, setCart }}>
      <div className="App">
        <Header />
        <Home />
      </div>
    </UserContext.Provider>
  );
}

export default App;
