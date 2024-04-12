import { createContext, useState } from "react";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [pendingAndShipped, setPendingAndShipped] = useState([]);

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        deliveredOrder,
        setDeliveredOrder,
        pendingAndShipped,
        setPendingAndShipped,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
