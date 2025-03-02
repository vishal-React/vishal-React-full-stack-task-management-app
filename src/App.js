import React from "react";
import "./App.css";
import "./media.css";
import HeroPage from "./Component/Heropage/HeroPage";
import Register from "./Component/RegisterPage/Register";
import History from "./Component/HistoryPage/History";
import { Toaster } from "react-hot-toast";
import RecipesProvider from "./RecipesContext";
import { CartProvider } from "./CartContext";
import { OrderHistoryProvider } from "./OrderHistoryContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Component/Search/Search";

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
  {
    path: "/search",
    element: <Search />,
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
