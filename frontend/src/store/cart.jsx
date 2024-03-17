import React, { useState } from "react";

export const CartContext = React.createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [navBarCart, setNavBarCart] = useState({
    bill: 0,
    quantity: 0,
  });
  return (
    <CartContext.Provider value={{ cart, setCart, navBarCart, setNavBarCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
