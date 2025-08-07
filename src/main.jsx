import { StrictMode } from "react";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./components/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
