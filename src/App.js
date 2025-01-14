import React from "react";
import "./App.css";
import HeroPage from "./HeroPage/Heropage/HeroPage";
import Register from "./HeroPage/RegisterPage/Register";
import History from "./HeroPage/HistoryPage/History";
import { Toaster } from "react-hot-toast";
import RecipesProvider from "./RecipesContext";
import { CartProvider } from "./CartContext";
import { OrderHistoryProvider } from "./OrderHistoryContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <OrderHistoryProvider>
        <RecipesProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </RecipesProvider>
      </OrderHistoryProvider>
    </>
  );
};

export default App;
