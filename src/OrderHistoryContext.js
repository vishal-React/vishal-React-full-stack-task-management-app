import React, { createContext, useState, useContext } from "react";

const OrderHistoryContext = createContext();

export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  const addOrder = (orderData) => {
    setOrderHistory((prevOrders) => [...prevOrders, orderData]);
  };

  return (
    <OrderHistoryContext.Provider value={{ orderHistory, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
